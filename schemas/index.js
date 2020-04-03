const sample_registration = require('./sample_registration.json');
const donor = require('./donor.json');
const specimen = require('./specimen.json');
const c19_condition = require('./c19_condition.json');
const treatment = require('./treatment.json');
const chemotherapy = require('./chemotherapy.json');
const hormone_therapy = require('./hormone_therapy.json');
const radiation = require('./radiation.json');
const follow_up = require('./follow_up.json');

module.exports = [
  sample_registration,
  donor,
  specimen,
  c19_condition,
  treatment,
  chemotherapy,
  hormone_therapy,
  radiation,
  follow_up,
];
