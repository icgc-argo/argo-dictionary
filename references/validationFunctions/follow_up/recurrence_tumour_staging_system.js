const ajccValidation = require('../common/ajccValidation');
const requiredWhenProgression = require('./baseScripts/requiredWhenProgression');
const requiredWhenRelapse = require('./baseScripts/requiredWhenRelapse');

module.exports = [
    ajccValidation,
    requiredWhenProgression,
    requiredWhenRelapse
];