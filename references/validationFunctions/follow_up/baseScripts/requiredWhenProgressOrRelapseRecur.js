/**
 * Enforces a required field if disease status at followup is progression or relapse or recurrence
 * @param {object} $row 
 * @param {string} $field 
 * @param {string} $name 
 */

const validation = ($row, $field, $name) => 
    (function validate() {
        let result = {valid: true, message: "Ok"};
        
        /* required field, cannot be null */
        const diseaseStatus = $row.disease_status_at_followup.trim().toLowerCase();
    
        const stateOfProgression = (entry) => {return /(progression)$/.test(decodeURI(entry))}; 
        const relapseOrRecurrence = diseaseStatus === "relapse or recurrence";
   
        // checks for a string just consisting of whitespace
        const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};


        if ((!$field || checkforEmpty($field)) && (stateOfProgression(diseaseStatus) || relapseOrRecurrence)) {
            result = {valid: false, message: `'${$name}' is a required field if 'disease_status_at_followup' is set a state of progression, relapse, or recurrence.` }
        }
        else if (!(!$field || checkforEmpty($field)) && !stateOfProgression(diseaseStatus) && !relapseOrRecurrence) {
            result = {valid: false, message: `'${$name}' cannot be provided if 'disease_status_at_followup' is not a state of progression, relapse, or recurrence.` }
        }
        return  result;
    })();

module.exports = validation;
