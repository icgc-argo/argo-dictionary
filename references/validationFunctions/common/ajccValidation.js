const validation = () => {
    function validate() {

        let result = {valid: true, message: "Ok"};
        
        /* This is not a required field, so first ensure that it exists */
        if ($field){
            /* Contingent on the naming system for tumour staging systems to remain consistent */
            const stagingName = $name.trim().toLowerCase().split('_tumour_staging_system')[0];
            /* Perform validation only if an AJCC value was selected */
            if (/^(AJCC)\b/i.test($field)){
                const requiredFields = [
                    `${stagingName}_m_category`,
                    `${stagingName}_n_category`,
                    `${stagingName}_t_category`
                ];
                const convertedRow = Object.fromEntries(Object.entries($row).map(([fieldName,fieldVal]) => [fieldName.toLowerCase(), fieldVal]));
                /* Check for contigous spaces wrapped with quotes (empty strings) */
                const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
                /* search for fields with falsy values, given the field exists */
                const emptyFields = requiredFields.filter(field => Object.keys(convertedRow).includes(field) && (!convertedRow[field] || checkforEmpty(convertedRow[field])))
                if (emptyFields.length){
                    result = {valid: false, "message": `The following fields are required when ${$name} is set to an AJCC option: ${emptyFields}`};
                }
            }
        }
        return result;
    }
    validate();
}

module.exports = validation;
