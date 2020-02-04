const validation = require('./../../references/validationFunctions/common/ajccValidation.js');
const universalTest = require('../universal');


// Load in template files which already have all the field names
// Field values are null by default
const specimen = require('../dummyData/specimen.json');
const followUp = require('../dummyData/follow_up.json');
const primaryDiag = require('../dummyData/primary_diagnosis.json');

//use spread operator to grab copies of template files
const unitTests = {
    'Specimen' : [
        [
            'AJCC Value with <t,n,m>_category values not set.',
            false,
            {
                'row' : {...specimen,
                    "pathological_tumour_staging_system" : "AJCC 8th Edition"
                },
                'name' : 'pathological_tumour_staging_system'
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
                'name' : 'pathological_tumour_staging_system'
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
                'name' : 'pathological_tumour_staging_system'
            }
        ],
        [
            'Non AJCC Value with no categories set.',
            true,
            {
                'row' : {...specimen,
                    "pathological_tumour_staging_system" : "Aajccc fake edition",
                },
                'name' : 'pathological_tumour_staging_system'
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
                'name' : 'pathological_tumour_staging_system'
            }
        ],
    ],
    'FollowUp' : [
        [
            'Post-Therapy: AJCC Value with <t,n,m>_category values not set.',
            false,
            {
                'row' : {...followUp,
                    "posttherapy_tumour_staging_system" : "AJCC 4th Edition"
                },
                'name' : 'posttherapy_tumour_staging_system'
            }
        ],
        [
            'Post-Therapy: AJCC Value with t category value not set.',
            false,
            {
                'row' : {...followUp,
                    "posttherapy_tumour_staging_system" : "AJCC 5th Edition",
                    "posttherapy_n_category": "Some Value",
                    "posttherapy_m_category": "some Value",
                },
                'name' : 'posttherapy_tumour_staging_system'
            }
        ],
        [
            'Post-Therapy: Non AJCC Value with <t,n,m>_category values not set',
            true,
            {
                'row' : {...followUp,
                    "posttherapy_tumour_staging_system" : "Lugano",
                },
                'name' : 'posttherapy_tumour_staging_system'
            }
        ],
        [
            'Recurrence: AJCC Value with <t,n,m>_category values not set.',
            false,
            {
                'row' : {...followUp,
                    "recurrence_tumour_staging_system" : "AJCC 1st Edition"
                },
                'name' : 'recurrence_tumour_staging_system'
            }
        ],
        [
            'Recurrence: AJCC Value with m value not set.',
            false,
            {
                'row' : {...followUp,
                    "recurrence_tumour_staging_system" : "AJCC 7th Edition",
                    "recurrence_m_category": " ",
                },
                'name' : 'recurrence_tumour_staging_system'
            }
        ],
        [
            'Recurrence: Non AJCC Value with <t,n,m>_category values not set.',
            true,
            {
                'row' : {...followUp,
                    "recurrence_tumour_staging_system" : "FIGO",
                },
                'name' : 'recurrence_tumour_staging_system'
            }
        ]
    ],
    'Primary Diagnosis' : [ 
        [
            'AJCC Value with <t,n,m>_category values not set.',
            false,
            {
                'row' : {...primaryDiag,
                    "clinical_tumour_staging_system" : "AJCC 9th Edition"
                },
                'name' : 'clinical_tumour_staging_system'
            }
        ],
        [
            'AJCC Value with m and n values not set.',
            false,
            {
                'row' : {...primaryDiag,
                    "clinical_tumour_staging_system" : "AJCC 2nd Edition",
                    "clinical_t_category": "some val"
                },
                'name' : 'clinical_tumour_staging_system'
            }
        ],
        [
            'Non AJCC Value with <t,n,m>_category values not set.',
            true,
            {
                'row' : {...primaryDiag,
                    "clinical_tumour_staging_system" : "Ann Arbor",
                },
                'name' : 'clinical_tumour_staging_system'
            }
        ],
    ]
}

describe("Common Tests",()=>{
    Object.entries(unitTests).forEach(schema =>{
        schema[1].forEach(testSuite => {
            const testIndex = 2;
            const testInputs = testSuite[testIndex];
            universalTest(validation(testInputs.row,testInputs.name,testInputs.row[testInputs.name]));
        })
    })
})

describe("Unit Tests for AJCC validation script",()=>{
    // Using .each to reduce repetition. Each array entry is its own test.
    // Entry 0: Used as test description
    // Entry 1: The target result.
    // Entry 2: The object containing the inputs to the validate function.


    // the index for accessing the name of the type of unit tests what will run
    const nameIndex = 0;
    // the index for accessing the array of arrays that hold the test information
    const testsIndex = 1;

    Object.entries(unitTests).forEach(schema =>{
        describe(`${schema[nameIndex]} Tests`,()=>{
            test.each(schema[testsIndex])('\n Test %# : %s \nExpecting result.valid to be: %s',(description,target,inputs) =>{
                const scriptOutput = validation(inputs.row, inputs.name, inputs.row[inputs.name]);
                expect(scriptOutput.valid).toBe(target);
            })
        })
    })
})
