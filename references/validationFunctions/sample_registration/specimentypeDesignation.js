/**
 * Checks that tumour desigation can only be normal iFF the specimen types are consered normal
 */
const validation = ($row, $field) => 
    (function validate() {

        const row = $row;
        let result = {valid: true, message: "Ok"};
        
        const designation = row.tumour_normal_designation.trim().toLowerCase();
        const specimen_type = $field.trim().toLowerCase();
        
        if (designation === "normal"){
            const validTypes = ["normal", "normal - tissue adjacent to primary tumour", "cell line - derived from normal"];
            if (!validTypes.includes(specimen_type)){
                result = {valid: false, message: "Invalid specimen_type. Specimen_type can only be set to a normal type value (Normal, Normal - tissue adjacent to primary tumour, or Cell line - derived from normal) when tumour_normal_designation is set to Normal."};
            }
        }
        else if (designation === "tumour") {
            const invalidTypes = ["normal", "cell line - derived from normal"];
            if (invalidTypes.includes(specimen_type)){
                result = {valid: false, message: "Invalid specimen_type. Specimen_type cannot be set to normal type value (Normal or Cell line - derived from normal) when tumour_normal_designation is set to Tumour."};
            }
        }
        return result;
    })();

module.exports = validation;