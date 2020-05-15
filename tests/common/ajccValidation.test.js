const validation = require('./../../references/validationFunctions/common/ajccValidation.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// Load in template files which already have all the field names
// Field values are null by default
const dummy = require('../constructDummyData');
const specimen = dummy.getSchemaDummy('specimen');
const followUp = dummy.getSchemaDummy('follow_up');
const primaryDiag = dummy.getSchemaDummy('primary_diagnosis');

//use spread operator to grab copies of template files
const unitTests = {
  Specimen: [
    [
      'AJCC Value with <t,n,m>_category values not set.',
      false,
      {
        row: loadObjects(specimen, {
          pathological_tumour_staging_system: 'AJCC 8th Edition',
        }),
        name: 'pathological_tumour_staging_system',
      },
    ],
    [
      'AJCC Value with one category value not set.',
      false,
      {
        row: loadObjects(specimen, {
          pathological_tumour_staging_system: 'AJCC 6th Edition',
          pathological_m_category: 'Some M Value',
          pathological_n_category: 'Some N Value',
        }),
        name: 'pathological_tumour_staging_system',
      },
    ],
    [
      'AJCC Value with two categories value not set.',
      false,
      {
        row: loadObjects(specimen, {
          pathological_tumour_staging_system: 'AJCC 6th Edition',
          pathological_t_category: ' ',
          pathological_m_category: '',
          pathological_n_category: 'Some N Value',
        }),
        name: 'pathological_tumour_staging_system',
      },
    ],
    [
      'Non AJCC Value with no categories set.',
      true,
      {
        row: loadObjects(specimen, {
          pathological_tumour_staging_system: 'Aajccc fake edition',
        }),
        name: 'pathological_tumour_staging_system',
      },
    ],
    [
      'Non AJCC Value with all categories set.',
      false,
      {
        row: loadObjects(specimen, {
          pathological_tumour_staging_system: 'binet',
          pathological_t_category: 'some val',
          pathological_m_category: 'some val',
          pathological_n_category: 'some val',
        }),
        name: 'pathological_tumour_staging_system',
      },
    ],
  ],
  FollowUp: [
    [
      'Post-Therapy: AJCC Value with <t,n,m>_category values not set.',
      false,
      {
        row: loadObjects(followUp, {
          posttherapy_tumour_staging_system: 'AJCC 4th Edition',
        }),
        name: 'posttherapy_tumour_staging_system',
      },
    ],
    [
      'Post-Therapy: AJCC Value with t category value not set.',
      false,
      {
        row: loadObjects(followUp, {
          posttherapy_tumour_staging_system: 'AJCC 5th Edition',
          posttherapy_n_category: 'Some Value',
          posttherapy_m_category: 'some Value',
        }),
        name: 'posttherapy_tumour_staging_system',
      },
    ],
    [
      'Post-Therapy: Non AJCC Value with <t,n,m>_category values not set',
      true,
      {
        row: loadObjects(followUp, {
          posttherapy_tumour_staging_system: 'Lugano',
        }),
        name: 'posttherapy_tumour_staging_system',
      },
    ],
    [
      'Post-Therapy: Non AJCC Value with <t,n,m>_category values set',
      false,
      {
        row: loadObjects(followUp, {
          posttherapy_tumour_staging_system: 'Lugano',
          posttherapy_t_category: 'Some Value',
          posttherapy_n_category: 'some Value',
          posttherapy_m_category: 'some Value',
        }),
        name: 'posttherapy_tumour_staging_system',
      },
    ],
    [
      'Recurrence: AJCC Value with <t,n,m>_category values not set.',
      false,
      {
        row: loadObjects(followUp, {
          recurrence_tumour_staging_system: 'AJCC 1st Edition',
        }),
        name: 'recurrence_tumour_staging_system',
      },
    ],
    [
      'Recurrence: AJCC Value with m value not set.',
      false,
      {
        row: loadObjects(followUp, {
          recurrence_tumour_staging_system: 'AJCC 7th Edition',
          recurrence_m_category: ' ',
        }),
        name: 'recurrence_tumour_staging_system',
      },
    ],
    [
      'Recurrence: Non AJCC Value with <t,n,m>_category values not set.',
      true,
      {
        row: loadObjects(followUp, {
          recurrence_tumour_staging_system: 'FIGO',
        }),
        name: 'recurrence_tumour_staging_system',
      },
    ],
    [
      'Recurrence: Non AJCC Value with <n,m>_category values  set.',
      false,
      {
        row: loadObjects(followUp, {
          recurrence_tumour_staging_system: 'FIGO',
          recurrence_t_category: ' ',
          recurrence_m_category: 'some value',
          recurrence_n_category: 'some value',
        }),
        name: 'recurrence_tumour_staging_system',
      },
    ],
  ],
  'Primary Diagnosis': [
    [
      'AJCC Value with <t,n,m>_category values not set.',
      false,
      {
        row: loadObjects(primaryDiag, {
          clinical_tumour_staging_system: 'AJCC 9th Edition',
        }),
        name: 'clinical_tumour_staging_system',
      },
    ],
    [
      'AJCC Value with m and n values not set.',
      false,
      {
        row: loadObjects(primaryDiag, {
          clinical_tumour_staging_system: 'AJCC 2nd Edition',
          clinical_t_category: 'some val',
        }),
        name: 'clinical_tumour_staging_system',
      },
    ],
    [
      'Non AJCC Value with <t,n,m>_category values not set.',
      true,
      {
        row: loadObjects(primaryDiag, {
          clinical_tumour_staging_system: 'Ann Arbor',
        }),
        name: 'clinical_tumour_staging_system',
      },
    ],
    [
      'Non AJCC Value with <t>_category values  set.',
      false,
      {
        row: loadObjects(primaryDiag, {
          clinical_tumour_staging_system: 'Ann Arbor',
          clinical_t_category: 'some val',
        }),
        name: 'clinical_tumour_staging_system',
      },
    ],
    [
      'Null Value for field.',
      true,
      {
        row: loadObjects(primaryDiag, {
          clinical_tumour_staging_system: null,
        }),
        name: 'clinical_tumour_staging_system',
      },
    ],
    [
      'AJCC Value with T, N, M values all set',
      true,
      {
        row: loadObjects(primaryDiag, {
          clinical_tumour_staging_system: 'AJCC 5th Edition',
          clinical_t_category: 'some val',
          clinical_m_category: 'some val',
          clinical_n_category: 'some val',
        }),
        name: 'clinical_tumour_staging_system',
      },
    ],
    // Load objects will prepopulate the input data with the same keys as the schema
    // Not using it in these cases to simulate somebody not providing headers
    [
      'Non AJCC Value with <t,n,m>_category header not provided.',
      true,
      {
        row: {
          clinical_tumour_staging_system: 'Murphy',
        },
        name: 'clinical_tumour_staging_system',
      },
    ],
    [
      'Non AJCC Value with <m,n>_category header not provided, <t>_category field left empty.',
      true,
      {
        row: {
          clinical_tumour_staging_system: 'Murphy',
          clinical_t_category: '',
        },
        name: 'clinical_tumour_staging_system',
      },
    ],
    [
      'Non AJCC Value with <m,n>_category header not provided, <t>_category field provided.',
      false,
      {
        row: {
          clinical_tumour_staging_system: 'Murphy',
          clinical_t_category: 'Forbidden Provided Value!',
        },
        name: 'clinical_tumour_staging_system',
      },
    ],
    [
      'AJCC Value with <t,n,m>_category fields not provided.',
      false,
      {
        row: {
          clinical_tumour_staging_system: 'AJCC 8th Edition',
        },
        name: 'clinical_tumour_staging_system',
      },
    ],
  ],
};

describe('Common Tests', () => {
  Object.entries(unitTests).forEach(schema => {
    schema[1].forEach(testSuite => {
      const testIndex = 2;
      const testInputs = testSuite[testIndex];
      universalTest(validation(testInputs.row, testInputs.name, testInputs.row[testInputs.name]));
    });
  });
});

describe('Unit Tests for AJCC validation script', () => {
  // Using .each to reduce repetition. Each array entry is its own test.
  // Entry 0: Used as test description
  // Entry 1: The target result.
  // Entry 2: The object containing the inputs to the validate function.

  // the index for accessing the name of the type of unit tests what will run
  const nameIndex = 0;
  // the index for accessing the array of arrays that hold the test information
  const testsIndex = 1;

  Object.entries(unitTests).forEach(schema => {
    describe(`${schema[nameIndex]} Tests`, () => {
      test.each(schema[testsIndex])(
        '\n Test %# : %s \nExpecting result.valid to be: %s',
        (description, target, inputs) => {
          const scriptOutput = validation(inputs.row, inputs.name, inputs.row[inputs.name]);
          expect(scriptOutput.valid).toBe(target);
        },
      );
    });
  });
});
