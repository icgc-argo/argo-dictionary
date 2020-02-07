/**
 * Relapse Interval may be a required field 
 */
const validation = ($row, $field) => 
    (function validate() {
        let result = {valid: true, message: "Ok"};
        const isStatusRelapse = $row.disease_status_at_followup.trim().toLowerCase() === "relapse";
        // checks for a string just consisting of whitespace
        const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
        if (isStatusRelapse && (!$field || checkforEmpty($field))){
            result = {valid: false, message: "'relapse_interval' is a required field if 'disease_status_at_followup' set to 'relapse'" }
        }
 
        return result;
    })();


module.exports = validation;