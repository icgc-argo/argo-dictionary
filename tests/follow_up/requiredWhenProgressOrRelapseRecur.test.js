const validation = require('../../references/validationFunctions/follow_up/baseScripts/requiredWhenProgressOrRelapseRecur');

const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const followUp = require('../constructDummyData').getSchemaDummy('follow_up');


// key -> name of field, value -> unit tests
const myUnitTests = {
    'anatomic_site_progression_or_recurrences': [
        [
            'Disease status is distant progression, with provided ASPOR',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "Distant progression",
                    "anatomic_site_progression_or_recurrences": "C50"
                }
            )
        ],
        [
            'Disease status is Loco-regional progression, without provided ASPOR',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "Loco-regional progression"
                }
            )
        ],
        [
            'Disease status is stable, without provided ASPOR',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "stable"
                }
            )
        ],
        [
            'Disease status is stable, with provided ASPOR',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "stable",
                    "anatomic_site_progression_or_recurrences": "C50.1"
                }
            )
        ],
        [
            'Disease status is relapse or recurrence, with provided ASPOR',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse or recurrence",
                    "anatomic_site_progression_or_recurrences": "C50.1"
                }
            )
        ],
        [
            'Disease status is relapse or recurrenc, without provided ASPOR',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse or recurrence"
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

describe("Unit Tests for Disease Status Follow-Up",()=>{
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
