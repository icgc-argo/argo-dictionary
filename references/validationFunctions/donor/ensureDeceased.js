/**
 * If and only if a donor is deceased, then the cause of death must be provided.
 */
const validation = ($row, $field) => 
    (function validate() {
        let result = {valid: true, message: "Ok"};
        const causeOfDeath = typeof($field) === 'string' ? $field.trim().toLowerCase() : $field;
        const vitalStatus = $row.vital_status.trim().toLowerCase();
    
        if (!causeOfDeath && vitalStatus === "deceased"){
            result = {valid: false, message: "Cause of death must be provided when the donor's vital_status is deceased."}
        }
        else if (causeOfDeath && vitalStatus != "deceased"){
            result = {valid: false, message: "A cause of death cannot be provided if the donor's vital_status is not deceased."}
        }
        return result;
    })();


module.exports = validation;