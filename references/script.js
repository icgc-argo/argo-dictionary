const autoload =require('auto-load');
const scripts = autoload(__dirname +'/validationFunctions');

const escaper = (funcs) => {
    return String(funcs).replace(/^\(\)[\s]*=>[\s]*{[\s]*/, '').replace(/[\s]*}[\s]*$/,'');
}

const escapedScripts = Object.fromEntries(
    Object.entries(scripts).map(
        ([scriptName,scriptString]) => [scriptName, escaper(scriptString)]
    )
);

module.exports = escapedScripts ;

