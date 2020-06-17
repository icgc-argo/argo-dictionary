const validation = require('../../references/validationFunctions/follow_up/baseScripts/checkRelapseInterval');

const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const followUp = require('../constructDummyData').getSchemaDummy('follow_up');


// key -> name of field, value -> unit tests
const myUnitTests = {
    'relapse_interval': [
        [
            'Disease status is relapse, with provided relapse interval',
            true,
            loadObjects(followUp,
                {   
                    "interval_of_followup": "1200",
                    "disease_status_at_followup": "relapse or recurrence",
                    "relapse_interval": "500"
                }
            )
        ],
        [
            'Disease status is not relapse, with provided relapse interval',
            false,
            loadObjects(followUp,
                {   
                    "interval_of_followup": "1200",
                    "disease_status_at_followup": "partial remission",
                    "relapse_interval": "900"
                }
            )
        ],
        [
            'Disease status is relapse, without provided relapse interval',
            false,
            loadObjects(followUp,
                {   
                    "interval_of_followup": "1200",
                    "disease_status_at_followup": "relapse or recurrence"
                }
            )
        ],
        [
            'Disease status is relapse, but relapse interval is just whitespace',
            false,
            loadObjects(followUp,
                { 
                    "interval_of_followup": "1200", 
                    "disease_status_at_followup": "relapse or recurrence",
                    "relapse_interval" : "      "
                }
            )
        ],
        [
            'Disease status is not relapse or recurrence, and relapse interval is not provided',
            true,
            loadObjects(followUp,
                {   
                    "interval_of_followup": "1200",
                    "disease_status_at_followup": "stable"
                }
            )
        ],
        [
            'Disease status is relapse or recurrence, and relapse interval is greater than the interval of followup',
            false,
            loadObjects(followUp,
                {   
                    "interval_of_followup": "200",
                    "disease_status_at_followup": "relapse or recurrence",
                    "relapse_interval": "500"
                }
            )
        ],
        [
            'Disease status is relapse or recurrence, and relapse interval is less than the interval of followup',
            true,
            loadObjects(followUp,
                {   
                    "interval_of_followup": "200",
                    "disease_status_at_followup": "relapse or recurrence",
                    "relapse_interval": "40"
                }
            )
        ],
        [
            'Disease status is partial remission, and relapse interval is provided',
            false,
            loadObjects(followUp,
                {   
                    "interval_of_followup": "200",
                    "disease_status_at_followup": "partial remission",
                    "relapse_interval": "50"
                }
            )
        ],
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

describe("Unit Tests for Relapse Interval Follow-Up",()=>{
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
