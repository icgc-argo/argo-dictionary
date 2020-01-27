const validation = () => {
    function validate() {
        var result = {valid: true, message: "Ok"};
        var causeOfDeath = typeof($field) === 'string' ? $field.trim().toLowerCase() : $field;
        var vitalStatus = typeof($row.vital_status) === 'string' ? $row.vital_status.trim().toLowerCase(): $row.vital_status;
    
        if (!causeOfDeath && vitalStatus === "deceased"){
            result = {valid: false, message: "Cause of death must be provided when the donor's vital_status is deceased."}
        }
        else if (causeOfDeath && vitalStatus != "deceased"){
            result = {valid: false, message: "A cause of death cannot be provided if the donor's vital_status is not deceased."}
        }
        return result;
    }
    validate();
}

module.exports = validation;