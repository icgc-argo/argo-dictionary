
const autoload = require('auto-load');
const files = autoload(__dirname +'/validationFunctions');

const escaper = (funcs) => {
    return String(funcs).replace(/.*=>(\s)*/,'');
    // return String(funcs).replace(/^\(\)[\s]*=>[\s]*{[\s]*/, '').replace(/[\s]*}[\s]*$/,'');
}

const escapeFunctions = (scripts) => {
    return Object.fromEntries(
        Object.entries(scripts).map(
            ([scriptName,scriptString]) => [scriptName, escaper(scriptString)]
        )
    );
}


const buildScriptObject = (files) => {
   return Object.fromEntries(
        Object.entries(files).map(
            ([fileName, scriptCollection]) => [fileName, escapeFunctions(scriptCollection)]
        )
    );
}

const escapedScripts = buildScriptObject(files);

module.exports = escapedScripts ;

