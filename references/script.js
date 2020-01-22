const scripts = {
    "specimentype_designation": () => {
        function validate() {

            var row = $row;
            var result = {valid: true, message: "Ok"};
            
            var designation = row.tumour_normal_designation.trim().toLowerCase();
            var specimen_type = $field.trim().toLowerCase();
            
            if (designation === "normal"){
                var validTypes = ["normal", "normal - tissue adjacent to primary tumour", "cell line - derived from normal"];
                if (!validTypes.includes(specimen_type)){
                    result = {valid: false, message: "Invalid specimen_type. Specimen_type can only be set to a normal type value (Normal, Normal - tissue adjacent to primary tumour, or Cell line - derived from normal) when tumour_normal_designation is set to Normal."};
                }
            }
            else if (designation === "tumour") {
                var invalidTypes = ["normal", "cell line - derived from normal"];
                if (invalidTypes.includes(specimen_type)){
                    result = {valid: false, message: "Invalid specimen_type. Specimen_type cannot be set to normal type value (Normal or Cell line - derived from normal) when tumour_normal_designation is set to Tumour."};
                }
            }
            return result;
        }
        validate();
    },
    "ensureDeceased": () => {
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
}


const escaper = (funcs) => {
    return String(funcs).replace(/^\(\)[\s]*=>[\s]*{[\s]*/, '').replace(/[\s]*}[\s]*$/,'');
}

const escapedScripts = Object.fromEntries(
    Object.entries(scripts).map(
        ([scriptName,scriptString]) => [scriptName, escaper(scriptString)]
    )
);

module.exports = escapedScripts ;

