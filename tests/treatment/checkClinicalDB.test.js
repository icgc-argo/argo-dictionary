const validation = require('../../references/validationFunctions/treatment/clinicalTrialValidation');

const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const treatment = require('../constructDummyData').getSchemaDummy('treatment');


// key -> name of field, value -> unit tests
const myUnitTests = {
    'clinical_trial_number': [
        [
            'Clincial trials database is NCI Clinical Trials, with provided NCI number',
            true,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "NCI Clinical Trials",
                    "clinical_trial_number": "NCT02750826"
                }
            )
        ],
        [
            'Clincial trials database is NCI Clinical Trials and NCI clinical number with whitespace',
            true,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": " nci clinical trials ",
                    "clinical_trial_number": "  NCT02750826  "
                }
            )
        ],
        [
            'Clincial trials database is NCI Clinical Trials, with incorrect NCI number',
            false,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "nci clinical trials",
                    "clinical_trial_number": "CT0275082"
                }
            )
        ],
        [
            'Clincial trials database is NCI Clinical Trials, but with a EudraCT number',
            false,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "nci clinical trials",
                    "clinical_trial_number": "2010-023457-11"
                }
            )
        ],
        [
            'Clincial trials database is NCI Clinical Trials, with missing NCI number',
            false,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "NCI Clinical Trials"
                }
            )
        ],
        [

            'Clincial trials database is EU Clinical Trials Register, with provided EudraCT number',
            true,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "EU Clinical Trials Register",
                    "clinical_trial_number":  "2010-023457-11"
                }
            )
        ],
        [
            'Clincial trials database is EU Clinical Trials Register, with incorrect EudraCT number',
            false,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "EU Clinical Trials Register",
                    "clinical_trial_number":  "2010/023d4-11"
                }
            )
        ],
        [
            'Clincial trials database is EU Clinical Trials Register, but with a NCI clinical number',
            false,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "EU Clinical Trials Register",
                    "clinical_trial_number":  "NCT0275082"
                }
            )
        ],
        [
            'Clincial trials database is EU Clinical Trials Register, but with missing EudraCT number',
            false,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "EU Clinical Trials Register"
                }
            )
        ]
    ]
}


describe("Common Tests",()=>{
    Object.entries(myUnitTests).forEach(field =>{
        const name = field[0];
        const unitTests = field[1];
        unitTests.forEach(test=>{
            const testIndex = 2;
            const testInputs = test[testIndex];
            universalTest(validation(testInputs,name,testInputs[name]));
        })
    })
    
})

describe("Unit Tests for Clinical Trials Db in Treatment",()=>{
    Object.entries(myUnitTests).forEach(field => {
        const name = field[0];
        const unitTests = field[1];
        describe(`Tests for the ${name} field.`,()=>{
            test.each(unitTests)('\n Test %# : %s \nExpecting result.valid to be: %s',(description,target,inputs) =>{
                const scriptOutput = validation(inputs, inputs[name], name);
                expect(scriptOutput.valid).toBe(target);
            })
        })
        
    })
    
})
