const validation = require('./../../references/validationFunctions/specimen/tumourGrade.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const specimen = require('../constructDummyData').getSchemaDummy('specimen');

// the name of the field being validateds
const name = 'tumour_grade';

const unitTests = [
  [
    'Grading system set to "default", tumour grade is: "Gx - cannot be assessed"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'default',
      tumour_grade: 'Gx - cannot be assessed',
    }),
  ],
  [
    'Grading system set to "default", tumour grade is: "G1 well differentiated/low grade"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'default',
      tumour_grade: 'G1 well differentiated/low grade',
    }),
  ],
  [
    'Grading system set to "default", tumour grade is: "G2 moderately differentiated/intermediated grade"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'default',
      tumour_grade: 'G2 moderately differentiated/intermediated grade',
    }),
  ],
  [
    'Grading system set to "default", tumour grade is: "G3 poorly differentiated/high grade"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'Default ',
      tumour_grade: 'G3 poorly differentiated/high grade',
    }),
  ],
  [
    'Grading system set to "default", tumour grade is: "G4 undifferentiated/high grade"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: ' DefaulT ',
      tumour_grade: ' G4 undifferentiated/high grade ',
    }),
  ],
  [
    'Grading system set to "default", tumour grade is an impermissable value',
    false,
    loadObjects(specimen, {
      tumour_grading_system: ' DefaulT ',
      tumour_grade: ' an impermissable VALUE!!! ',
    }),
  ],
  [
    'Grading system set to "Gleason", tumour grade is "Gleason X: Gleason score cannot be determined"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'gleason',
      tumour_grade: 'Gleason X: Gleason score cannot be determined',
    }),
  ],
  [
    'Grading system set to "Gleason", tumour grade is "Gleason 2–6: The tumor tissue is well differentiated"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: ' gleason ',
      tumour_grade: 'Gleason 2–6: The tumor tissue is well differentiated',
    }),
  ],
  [
    'Grading system set to "Gleason", tumour grade is "Gleason 7: The tumor tissue is moderately differentiated"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'gleason',
      tumour_grade: 'Gleason 7: The tumor tissue is moderately differentiated',
    }),
  ],
  [
    'Grading system set to "Gleason", tumour grade is "Gleason 8–10: The tumor tissue is poorly differentiated or undifferentiated"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'gleason',
      tumour_grade: 'Gleason 8–10: The tumor tissue is poorly differentiated or undifferentiated',
    }),
  ],
  [
    'Grading system set to "Gleason", tumour grade is a value from another codelist',
    false,
    loadObjects(specimen, {
      tumour_grading_system: 'gleason',
      tumour_grade: 'Grade IV',
    }),
  ],
  [
    'Grading system set to "Nottingham", tumour grade is "G1 (Low grade or well differentiated)"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'nottingham ',
      tumour_grade: 'G1 (Low grade or well differentiated)',
    }),
  ],
  [
    'Grading system set to "Nottingham", tumour grade is "G2 (Intermediate grade or moderately differentiated)"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'nottingham ',
      tumour_grade: 'G2 (Intermediate grade or moderately differentiated)',
    }),
  ],
  [
    'Grading system set to "Nottingham", tumour grade is "G3 (High grade or poorly differentiated)"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'nottingham ',
      tumour_grade: 'G3 (High grade or poorly differentiated)',
    }),
  ],
  [
    'Grading system set to "Nottingham", tumour grade is just whitespace',
    false,
    loadObjects(specimen, {
      tumour_grading_system: 'nottingham ',
      tumour_grade: '          ',
    }),
  ],
  [
    'Grading system set to "Brain cancer", tumour grade is "Grade I"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'brain Cancer ',
      tumour_grade: 'Grade I',
    }),
  ],
  [
    'Grading system set to "Brain cancer", tumour grade is "Grade II"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'brain Cancer ',
      tumour_grade: 'Grade II',
    }),
  ],
  [
    'Grading system set to "Brain cancer", tumour grade is "Grade III"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'brain Cancer ',
      tumour_grade: 'Grade III',
    }),
  ],
  [
    'Grading system set to "Brain cancer", tumour grade is "Grade IV"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'brain Cancer ',
      tumour_grade: 'Grade IV',
    }),
  ],
  [
    'Grading system set to "Brain cancer", tumour grade is "Grade V"',
    false,
    loadObjects(specimen, {
      tumour_grading_system: 'brain Cancer ',
      tumour_grade: 'Grade V',
    }),
  ],
  [
    'Grading system set to "ISUP for renal cell carcinoma", tumour grade is "Grade 1: Tumor cell nucleoli invisible or small and basophilic at 400 x magnification"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'ISUP for renal cell carcinoma ',
      tumour_grade:
        'Grade 1: Tumor cell nucleoli invisible or small and basophilic at 400 x magnification',
    }),
  ],
  [
    'Grading system set to "ISUP for renal cell carcinoma", tumour grade is "Grade 2: Tumor cell nucleoli conspicuous at 400 x magnification but inconspicuous at 100 x magnification"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'ISUP for renal cell carcinoma ',
      tumour_grade:
        'Grade 2: Tumor cell nucleoli conspicuous at 400 x magnification but inconspicuous at 100 x magnification',
    }),
  ],
  [
    'Grading system set to "ISUP for renal cell carcinoma", tumour grade is "Grade 3: Tumor cell nucleoli eosinophilic and clearly visible at 100 x magnification"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'ISUP for renal cell carcinoma ',
      tumour_grade:
        ' Grade 3: Tumor cell nucleoli eosinophilic and clearly visible at 100 x magnificatioN ',
    }),
  ],
  [
    'Grading system set to "ISUP for renal cell carcinoma", tumour grade is "Grade 4: Tumors showing extreme nuclear pleomorphism and/or containing tumor giant cells and/or the presence of any proportion of tumor showing sarcomatoid and/or rhabdoid dedifferentiation"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'ISUP for renal cell carcinoma ',
      tumour_grade:
        'Grade 4: Tumors showing extreme nuclear pleomorphism and/or containing tumor giant cells and/or the presence of any proportion of tumor showing sarcomatoid and/or rhabdoid dedifferentiation',
    }),
  ],
  [
    'Grading system set to "ISUP for renal cell carcinoma", tumour grade is grade 1 but with spelling mistakes',
    false,
    loadObjects(specimen, {
      tumour_grading_system: 'ISUP for renal cell carcinoma ',
      tumour_grade:
        'Grade 1: Tumor cell nucleoolli invisible or small and basophililiic at 400 x magnification',
    }),
  ],
  [
    'Grading system set to "Lymphoid neoplasms", tumour grade is "Low grade or indolent NHL"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'Lymphoid neoplasms ',
      tumour_grade: 'Low grade or indolent NHL',
    }),
  ],
  [
    'Grading system set to "Lymphoid neoplasms", tumour grade is "High grade or aggressive NHL"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'Lymphoid neoplasms ',
      tumour_grade: 'High gRade or aggressive NHL',
    }),
  ],
  [
    'Grading system set to "Lymphoid neoplasms", tumour grade is "High grade or aggressive NHL"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'Lymphoid neoplasms ',
      tumour_grade: 'High gRade or aggressive NHL',
    }),
  ],
  [
    'Grading system set to "Lymphoid neoplasms", tumour grade is "High grade or aggressive NHL"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'Lymphoid neoplasms ',
      tumour_grade: 'High gRade or aggressive NHL',
    }),
  ],
  [
    'Grading system set to "Lymphoid neoplasms", tumour grade is gibberish',
    false,
    loadObjects(specimen, {
      tumour_grading_system: 'Lymphoid neoplasms ',
      tumour_grade: 'gibberish!',
    }),
  ],
  [
    'Grading system set to an unexpected value, tumour grade is any text',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'A possible new entry to the codelist for tumour grading system.',
      tumour_grade: 'any text here',
    }),
  ],
  [
    'Grading system undefined',
    true,
    loadObjects(specimen, {
      tumour_grade: 'any text here',
    }),
  ],
  [
    'grade system undefined',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'default',
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

describe('Unit Tests for Tumour Grade', () => {
  test.each(unitTests)(
    '\n Test %# : %s \nExpecting result.valid to be: %s',
    (description, target, inputs) => {
      const scriptOutput = validation(inputs, inputs[name]);
      expect(scriptOutput.valid).toBe(target);
    },
  );
});
