/**
 * Enforces a required field if disease status at followup is progression or relapse
 * @param {object} $row 
 * @param {string} $field 
 * @param {string} $name 
 */
const validation = ($row, $field, $name) => 
    (function validate() {
        let result = {valid: true, message: "Ok"};
        // checks for a string just consisting of whitespace
        const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
        
        //regex check for clinical trial number
        const NCTCheck = (entry) => {return /(^([Nn][Cc][Tt])[0-9]{8})/.test(decodeURI(entry))};
        const EudraCTCheck = (entry) => {return /(^[2][0-9]{3}-[0-9]{6}-[0-9]{2})/.test(decodeURI(entry))};

        // list of valid clinical trial databases
        const clinical_dbs = ["nci clinical trials", "eu clinical trials register"];
        
        if ($row.clinical_trials_database && $field) {
           const trialNumber = $field.trim();
           const clinicalTrialsDB = $row.clinical_trials_database.trim().toLowerCase();
           if ((clinicalTrialsDB === "nci clinical trials") && (!NCTCheck(trialNumber))) {
              result = {valid: false, message: 'The submitted NCI clinical trial number is in incorrect format.'};
           }
           else if ((clinicalTrialsDB === "eu clinical trials register") && (!EudraCTCheck(trialNumber))) {
             result = {valid: false, message: "The submitted EudraCT clinical trial number is in incorrect format."};
           }
           else if (!clinical_dbs.includes(clinicalTrialsDB)) {
              result = {valid: false, message: "The submitted clinical trials database '${$row.clinical_trials_database}' is not included in the list of clinical trial database."};
           }
        }
        else if ((!$row.clinical_trials_database || checkforEmpty($row.clnical_trials_database)) && (!$field || checkforEmpty($field))) {
           result = {valid: true, message: "Ok"};
        }
        else if ($row.clinical_trials_database && !$field) {
           if (clinical_dbs.includes($row.clinical_trials_database.trim().toLowerCase())) {
              result = {valid: false, message: "'${$name}' must be provided if 'clinical_trial_database' is set to '${$row.clinical_trials_database}'."};
           } 
        }
        return result;
    })();

module.exports = validation;
