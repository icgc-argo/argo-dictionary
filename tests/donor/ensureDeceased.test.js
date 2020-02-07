const validation = require('./../../references/validationFunctions/donor/ensureDeceased.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const donor = require('../constructDummyData').getSchemaDummy('donor');

// the name of the field being validateds
const name = "cause_of_death";

const unitTests = [
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
];


describe("Common Tests",()=>{
    unitTests.forEach(test=>{
        const testIndex = 2;
        const testInputs = test[testIndex];
        universalTest(validation(testInputs,name,testInputs[name]));
    })
})

describe("Unit Tests for Ensure Deceased Validation",()=>{
    test.each(unitTests)('\n Test %# : %s \nExpecting result.valid to be: %s',(description,target,inputs) =>{
        const scriptOutput = validation(inputs, inputs[name], inputs[inputs.name]);
        expect(scriptOutput.valid).toBe(target);
    })
})