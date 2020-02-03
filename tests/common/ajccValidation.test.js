const validation = require('./../../references/validationFunctions/common/ajccValidation.js');
const universalTest = require('../universal');


// Load in template files which already have all the field names
// Field values are null by default
const specimen = require('../dummyData/specimen.json');
const followUp = require('../dummyData/follow_up.json');
const primaryDiag = require('../dummyData/primary_diagnosis.json')


const unitTests = {
    'specimen' : [
        [
            'AJCC Value with <t,n,m>_category values not set.',
            false,
            {
                'row' : {...specimen,
                    "pathological_tumour_staging_system" : "AJCC 8th Edition"
                },
                'name' : 'pathological_tumour_staging_system',
                'field': 'AJCC 8th Edition'
            }
        ],
        [
            'AJCC Value with one category value not set.',
            false,
            {
                'row' : {...specimen,
                    "pathological_tumour_staging_system" : "AJCC 6th Edition",
                    "pathological_m_category": "Some M Value",
                    "pathological_n_category": "Some N Value",
                },
                'name' : 'pathological_tumour_staging_system',
                'field': 'AJCC 6th Edition'
            }
        ],
        [
            'AJCC Value with two categories value not set.',
            false,
            {
                'row' : {...specimen,
                    "pathological_tumour_staging_system" : "AJCC 6th Edition",
                    "pathological_t_category": " ",
                    "pathological_m_category": "",
                    "pathological_n_category": "Some N Value"
                },
                'name' : 'pathological_tumour_staging_system',
                'field': 'AJCC 6th Edition'
            }
        ],
        [
            'Non AJCC Value with no categories set.',
            true,
            {
                'row' : {...specimen,
                    "pathological_tumour_staging_system" : "Aajccc fake edition",
                },
                'name' : 'pathological_tumour_staging_system',
                'field': 'Aajccc fake edition'
            }
        ],
        [
            'Non AJCC Value with all categories set.',
            true,
            {
                'row' : {...specimen,
                    "pathological_tumour_staging_system" : "binet",
                    "pathological_t_category": "some val",
                    "pathological_m_category": "some val",
                    "pathological_n_category": "some val"
                },
                'name' : 'pathological_tumour_staging_system',
                'field': 'binet'
            }
        ],
    ]
}

describe("Common Tests",()=>{

    Object.entries(unitTests).forEach(schema =>{
        schema[1].forEach(testSuite => {
            const testIndex = 2;
            const testInputs = testSuite[testIndex];
            universalTest(validation(testInputs.row,testInputs.name,testInputs.field));
        })
    })
})

describe("Unit Tests for AJCC validation script",()=>{
    // Using .each to reduce repetition. Each array entry is its own test.
    // Entry 0: Used as test description
    // Entry 1: The target result.
    // Entry 2: The object containing the arguments to the validate function.

    describe("Specimen Tests with Invalid Inputs",()=>{
        test.each(unitTests.specimen)('\nSpecimen Test %# : %s \nExpecting result.valid to be: %s',(description,target,inputs) =>{
            const scriptOutput = validation(inputs.row,inputs.name,inputs.field)
            expect(scriptOutput.valid).toBe(target)
        })
    })

    
})


