// This file builds dummy data objects for each schema, based on the fields.
// This allows for the field names to populate automatically. Field data is empty.

const fs = require('fs');
const path = require('path');

const schemasFolder = path.join(__dirname,'../schemas');

const whitespace = 4;

// read in all files from the schemas folder
fs.readdir(schemasFolder, (err, schemaFiles)=>{
    if (err) throw err
    // only read in files with the .json extension
    const regex = /(.*\.json)$/g;
    const jsonFiles = schemaFiles.filter(file => file.match(regex));
    // load in each file
    jsonFiles.forEach(file => {
        fs.readFile(path.join(schemasFolder,file), 'utf-8', (err, data) => {
            if (err) throw err
            // create the dummy data
            const dummy = buildDummyData(JSON.parse(data));
            // write the dummy data to a file
            try {
                fs.writeFileSync(path.join(__dirname,'dummyData',file), JSON.stringify(dummy,null,whitespace))
              } catch (err) {
                console.error(err)
              }
        })
    })
})


const buildDummyData = (schemaJson) => {
    const dummyData = {};
    schemaJson.fields.forEach(field =>{dummyData[field.name] = null;})
    return dummyData;
};
