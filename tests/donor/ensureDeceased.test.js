const validation = require('./../../references/validationFunctions/donor/ensureDeceased.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
// const donor = require('../dummyData/donor.json');
const donor = require('../constructDummyData').getSchemaDummy('donor');

const myUnitTests = {
    "cause_of_death": [
        [
            'Deceased Donor without cause of death.',
            false,
            loadObjects(donor,
                {   
                    "vital_status": "deceased"
                }
            )
        ],
        [
            'Deceased Donor with cause of death.',
            true,
            loadObjects(donor,
                {   
                    "vital_status": "deceased",
                    "cause_of_death" : "Died of Cancer"
                }
            )
            
        ],
        [
            'Living Donor with cause of death.',
            false,
            loadObjects(donor,
                {
                    "vital_status": "Alive",
                    "cause_of_death" : "Died of Other Reasons"
                }
            )
        ],
        [
            'Living Donor without a cause of death.',
            true,
            loadObjects(donor,
                {
                    "vital_status": "Alive"
                }
            )
        ],
        [
            'Unknown Donor with a cause of death.',
            false,
            loadObjects(donor,
                {   
                    "vital_status": "unknown",
                    "cause_of_death": "died of cancer"
                }
            )
        ]
    ],
    "survival_time": [
        [
            'Deceased Donor without survival time',
            false,
            loadObjects(donor,
                {   
                    "vital_status": "deceased"
                }
            )
        ],
        [
            'Deceased Donor with survival time',
            true,
            loadObjects(donor,
                {   
                    "vital_status": "deceased",
                    "survival_time" : "55"
                }
            )
            
        ],
        [
            'Living Donor with survival_time.',
            false,
            loadObjects(donor,
                {
                    "vital_status": "Alive",
                    "survival_time" : "65"
                }
            )
        ],
        [
            'Living Donor without a survival_time',
            true,
            loadObjects(donor,
                {
                    "vital_status": "Alive"
                }
            )
        ],
        [
            'Unknown Donor with a survival_time.',
            false,
            loadObjects(donor,
                {   
                    "vital_status": "unknown",
                    "survival_time": "88"
                }
            )
        ]
    ]
};

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

describe("Unit Tests for Ensure Deceased",()=>{
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