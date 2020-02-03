// This file builds dummy data objects for each schema, based on the fields that are defined inside the json files.
// This allows for the field names to populate automatically. Field data is empty.
// Use the objects as templates and copy it over in your unit tests, changing whichever fields are relevant for the test.
const fs = require('fs');
const path = require('path');

const schemasFolder = path.join(__dirname,'../schemas');

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
                fs.writeFileSync(path.join(__dirname,'dummyData',file), JSON.stringify(dummy))
              } catch (err) {
                console.error(err)
              }
        })
    })
})


const buildDummyData = (schemaJson) => {
    const dummyData = {};
    schemaJson.fields.forEach(field =>{
        let val = null;
        // if (field.restrictions.hasOwnProperty('required') && field.restrictions.required){
        if (field.hasOwnProperty('restrictions') && get(field.restrictions, 'required')){

            console.log(field.name)
            // if it has codelist
                // turn the following into a function
                    // check whether codelist is internal or external reference
                        //if external, grab the external codelist
                    // esnure non empty array
                    // return a random value from the codelist
            // else
                // call external function to set a dummy value from switch statement

        }
        dummyData[field.name] = val;
    })
    return dummyData;

};


                // switch (currField.valueType)
                    //case 'integer' : 
                        //val = 10
                    //case 'number' : 
                        //val = 99.99
                    //case 'string':
                        //val = 'dummy'


// Imitation of Python's .get() method (script won't break if key doesn't exist)
const get = (object, key, default_value) => {
    const result = object[key];
    return (typeof result !== "undefined") ? result : default_value;
}

