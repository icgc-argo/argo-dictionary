const validation = require('./../../references/validationFunctions/follow_up/recurrence_stageGroup.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const specimen = require('../constructDummyData').getSchemaDummy('specimen');

// the name of the field being validateds
const name = 'posttherapy_stage_group';

const unitTests = [
  [
    'Staging system set to "revised international staging system (riss)", stage group is: "stage ii"',
    true,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'revised international staging system (riss)',
      posttherapy_stage_group: 'stage ii',
    }),
  ],
  [
    'Staging system set to "lugano staging system", stage group is: "stage iva"',
    true,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'lugano staging system',
      posttherapy_stage_group: 'stage iva',
    }),
  ],
  [
    'Staging system set to "St Jude staging System", stage group is: "Stage III"',
    true,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'St Jude staging System',
      posttherapy_stage_group: 'Stage III',
    }),
  ],
  [
    'Staging system set to "Ann Arbor Staging System", stage group is: "stage IiIA"',
    true,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'Ann Arbor Staging System',
      posttherapy_stage_group: 'stage IiIA',
    }),
  ],
  [
    'Staging system set to " rai Staging syStem ", stage group is: " stage 0 "',
    true,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: ' rai Staging syStem ',
      posttherapy_stage_group: ' stage 0 ',
    }),
  ],
  [
    'Staging system set to " Durie-salmon Staging syStem ", stage group is: " stage iiB"',
    true,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: ' Durie-salmon Staging syStem ',
      posttherapy_stage_group: ' stage iiB',
    }),
  ],
  [
    'Staging system set to "FIGO Staging syStem ", stage group is: "stage iAB "',
    true,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'FIGO Staging syStem ',
      posttherapy_stage_group: 'stage iAB ',
    }),
  ],
  [
    'Staging system set to " binEt stAging SYSTEM", stage group is: "stAge C "',
    true,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: ' binEt stAging SYSTEM',
      posttherapy_stage_group: 'stAge C ',
    }),
  ],
  [
    'Staging system set to "AJCC 8th Edition", stage group is: "STAGE IB1"',
    true,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'AJCC 8th Edition',
      posttherapy_stage_group: 'STAGE IB1',
    }),
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is: "occult Carcinoma"',
    true,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'AJCC 7th edition',
      posttherapy_stage_group: 'occult Carcinoma',
    }),
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is: "occult Carcinoma"',
    true,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'AJCC 7th edition',
      posttherapy_stage_group: 'occult Carcinoma',
    }),
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is an impermissable value',
    false,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'AJCC 7th edition',
      posttherapy_stage_group: ' an impermissable VALUE!!! ',
    }),
  ],
  [
    'Staging system set to "Binet staging system", stage group is: "Stage I"',
    false,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'Binet staging system',
      posttherapy_stage_group: 'Stage I',
    }),
  ],
  [
    'Staging system set to "Binet staging system", stage group is value from another codelist: "Stage I"',
    false,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'Binet staging system',
      posttherapy_stage_group: 'Stage I',
    }),
  ],
  [
    'Staging system set to "Rai staging system", stage group is "iii"',
    false,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'Rai staging system',
      posttherapy_stage_group: 'iii',
    }),
  ],
  [
    'Staging system set to "ajcc 8th edition", stage group is just whitespace"',
    false,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'ajcc 8th edition',
      posttherapy_stage_group: '         ',
    }),
  ],
  [
    'Staging system set to "ajcc 7th edition", stage group is gibberish"',
    false,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'ajcc 8th edition',
      posttherapy_stage_group: 'gibberish!',
    }),
  ],
  [
    'Staging system set to "ann arbor staging system", stage group is any text"',
    false,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'ann arbor staging system',
      posttherapy_stage_group: 'any text',
    }),
  ],
  [
    'Staging system set to an unexpected value, stage group is any text"',
    true,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'my staging system',
      posttherapy_stage_group: 'any text here',
    }),
  ],
  [
    'Staging system undefined',
    true,
    loadObjects(specimen, {
      posttherapy_stage_group: 'any text here',
    }),
  ],
  [
    'staging system undefined',
    true,
    loadObjects(specimen, {
      posttherapy_tumour_staging_system: 'default',
    }),
  ],
  ['both undefined', true, specimen],
];

describe('Common Tests', () => {
  unitTests.forEach(test => {
    const testIndex = 2;
    const testInputs = test[testIndex];
    universalTest(validation(testInputs, name, testInputs[name]));
  });
});

describe('Unit Tests for Pathological Staging System', () => {
  test.each(unitTests)(
    '\n Test %# : %s \nExpecting result.valid to be: %s',
    (description, target, inputs) => {
      const scriptOutput = validation(inputs, inputs[name]);
      expect(scriptOutput.valid).toBe(target);
    },
  );
});
