const validation = require('../../references/validationFunctions/follow_up/baseScripts/requiredWhenRelapse');

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
                    "disease_status_at_followup": "relapse or recurrence"
                }
            )
        ],
        [
            'Disease status is relapse, but relapse interval is just whitespace',
            false,
            loadObjects(followUp,
                {   
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
                    "disease_status_at_followup": "stable"
                }
            )
        ],
    ],
    'relapse_type': [
        [
            'Disease status is relapse, and relapse type is Local recurrence',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse or recurrence",
                    "relapse_type": "local recurrence"
                }
            )
        ],
        [
            'Disease status is stable, and relapse type is recurrence',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "stable",
                    "relapse_type": "Distant recurrence/metastasis"
                }
            )
        ]
    ],
    'anatomic_site_progression_or_recurrences': [
        [
            'Disease status is relapse, with provided ASPOR',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse or recurrence",
                    "anatomic_site_progression_or_recurrences": "Ankle"
                }
            )
        ],
        [
            'Disease status is relapse, without provided ASPOR',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse or recurrence"
                }
            )
        ],
    ],
    'recurrence_tumour_staging_system': [
        [
            'Disease status is relapse, with provided RTSS',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse or recurrence",
                    "recurrence_tumour_staging_system": "Binet"
                }
            )
        ],
        [
            'Disease status is relapse, without provided ASPOR',
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
