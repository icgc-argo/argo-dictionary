/**
 * Enforces a required field if disease status at followup is progression or relapse
 * @param {object} $row 
 * @param {string} $field 
 * @param {string} $name 
 */
const validation = ($row, $field, $name) => 
    (function validate() {
        let result = {valid: true, message: "Ok"};
        /* required field, cannot be null */
        const clinicalTrialsDB = $row.clinical_trials_database.trim().toLowerCase();
        const clinical_dbs = ["nci clinical trials", "eu clinical trials register"];

        // checks for a string just consisting of whitespace
        const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
        
        if (checkforEmpty(clinicalTrialsDB) && !$field) {
           result = {valid: true};
        }
        else if (clinical_dbs.includes(clinicalTrialsDB) && !$field) {
           result = {valid: false, message: "'${$name}' must be provided if 'clinicals_trial_database' is set to '${$clinicalTrialsDB}'."};
        }
        else if ((clinicalTrialsDB === "nci clinical trials") && (!$field.trim().match(/(^([Nn][Cc][Tt])[0-9]{8})/))) {
              result = {valid: false, message: 'NCI clinical number is in incorrect format.'};
        }
        else if ((clinicalTrialsDB === "eu clinical trials register") && (!$field.trim().match(/(^[2][0-9]{3}-[0-9]{6}-[0-9]{2})/))) {
             result = {valid: false, message: "EudraCT clinical number is in incorrect format."};
        } 
        return result;
    })();

module.exports = validation;
