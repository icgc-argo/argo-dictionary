// Tool to aid in testing only
// populates the references from dictionary.json with the actual references, generates populated_dictionary.json
// allows for easy overwrite into clinical's sample-schema.json
const fs = require('fs');
const dict = require('./dictionary.json');

const old = JSON.stringify(dict);

// References look like this : /#/scripts/donor/ensuredeceased
// This regex finds them
const regex = /"#\/.+?(?=\")"/g;


const replacer = (match) => {
    const strip = /#\//;
    const stripped = match.replace(strip,'').replace(/"/g,'');
    const refs = stripped.split('\/')
    let replacement = dict.references;
    refs.forEach(element => {
        replacement = replacement[element]
    });
    return JSON.stringify(replacement);
  }

const newString = old.replace(regex, replacer);

fs.writeFileSync('./populated_dictionary.json', newString);

