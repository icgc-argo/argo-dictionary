const ajccValidation = require('../common/ajccValidation');
const requiredWhenProgressOrRelapseRecur = require('./baseScripts/requiredWhenProgressOrRelapseRecur');

module.exports = [
    ajccValidation,
    requiredWhenProgressOrRelapseRecur
];
