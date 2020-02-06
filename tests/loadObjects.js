/**
 * Combines the dummy data object with the test input data object, taking preference to the inputs fields.
 * Makes sure that the fields being passed to the test function actually exist.
 * @param {Object} dummy The object whose keys contain all the fields of the schema
 * @param {Object} inputs the object containing the fields and custom values for test input
 */
const loadObjects = (dummy, inputs) =>{
    const doesfieldExist = (field) => {
        const doesExist = Object.keys(dummy).includes(field);
        if (!doesExist){
            throw `the field name : '${field}' did not match the fields from the dummy file: ${JSON.stringify(dummy,null,4)}. 
            \nPlease ensure that the '${field}' field exists in the schema, and is spelled correctly.
        }
        return doesExist;
    }
    if (Object.keys(inputs).every(doesfieldExist)){
        return {
            ...dummy,
            ...inputs
        }
    } else return dummy;
}

module.exports = loadObjects