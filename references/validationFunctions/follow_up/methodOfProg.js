/**
 * Method of Progression Status may be a required field 
 */
const validation = ($row, $field) => 
    (function validate() {
        let result = {valid: true, message: "Ok"};

        const diseaseStatus = $row.disease_status_at_followup.trim().toLowerCase();
        const isRequired =  diseaseStatus === "relapse" || diseaseStatus === "progression";

        // checks for a string just consisting of whitespace
        const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
        if ((isRequired) && (!$field || checkforEmpty($field))){
            result = {valid: false, message: "'method_of_progression_status' is a required field if 'disease_status_at_followup' set to 'relapse' or 'progression'." }
        }

        return result;
    })();

module.exports = validation;