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
        const diseaseStatus = $row.disease_status_at_followup.trim().toLowerCase();

        let isRequired = diseaseStatus === "relapse";

        /* intended for distant / loco-regional progression, but would apply to any future progression types*/
        const secondCondition = diseaseStatus.match(/(progression)$/);

        const soloConditionFields = [
            'relapse_interval'
        ];

        let additionalMsg = '';

        if(!soloConditionFields.includes($name)){
            isRequired = isRequired || secondCondition;
            additionalMsg = " or is of type 'progression'";
        }

        // checks for a string just consisting of whitespace
        const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};

        if (isRequired && (!$field || checkforEmpty($field))){
            result = {valid: false, message: `'${$name}' is a required field if 'disease_status_at_followup' set to 'relapse'${additionalMsg}.` }
        }

        return result;
    })();

module.exports = validation;