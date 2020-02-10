
const autoload = require('auto-load');
const files = autoload(__dirname +'/validationFunctions');

const escaper = (funcs) => {
    const removeOuterLayer = (functionString) => String(functionString).replace(/.*=>(\s)*/,'');
    if (Array.isArray(funcs)){
        return funcs.map(func => removeOuterLayer(func))
    }
    else if (typeof funcs === "function"){
        return [removeOuterLayer(funcs)]
    }
    else {
        throw 'The exported module must be a function or an array of functions.'
    }
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

