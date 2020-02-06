// This script builds dummy data objects for each schema, based on the fields.
// This allows for the field names to populate automatically. Field data is empty.

const fs = require('fs');
const path = require('path');
const schemasFolder = path.join(__dirname,'../schemas');

/**
 * This returns a dummy object of a schema with all fields prepopulated to null
 * @param {Object} schemaName The exact name of the schema as it is in the /schemas folder
 */
const getSchemaDummy = (schemaName) =>{
    try {
        fs.readFileSync(path.join(schemasFolder,`${schemaName}.json`), 'utf-8');
    }
    catch(err){
        throw (`Something went wrong when trying to load in ${schemaName}.json from ${schemasFolder}. Please ensure the file exists and is spelled correctly.`)
    }
    const rawFileContents = fs.readFileSync(path.join(schemasFolder,`${schemaName}.json`), 'utf-8');
    const fileContents = JSON.parse(rawFileContents);
    const dummyData = {};
    fileContents.fields.forEach(field =>{dummyData[field.name] = null;})
    return dummyData;
}

module.exports = {getSchemaDummy};