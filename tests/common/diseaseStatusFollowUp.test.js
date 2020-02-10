const validation = require('../../references/validationFunctions/common/diseaseStatusFollowUp.js');
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
                    "disease_status_at_followup": "relapse",
                    "relapse_interval": "500"
                }
            )
        ],
        [
            'Disease status is not relapse, with provided relapse interval',
            true,
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
                    "disease_status_at_followup": "relapse"
                }
            )
        ],
        [
            'Disease status is relapse, but relapse interval is just whitespace',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse",
                    "relapse_interval" : "      "
                }
            )
        ],
        [
            'Disease status is not progression, and relapse interval is not provided',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "stable"
                }
            )
        ],
        [
            'Disease status is progression, and relapse interval is not provided',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "Distant progression"
                }
            )
        ]
    ],
    'method_of_progression_status': [
        [
            'Disease status is relapse, with provided method of progression',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse",
                    "method_of_progression_status": "Autopsy"
                }
            )
        ],
        [
            'Disease status is distant progression, with provided method of progression',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "Distant progression",
                    "method_of_progression_status": "Autopsy"
                }
            )
        ],
        [
            'Disease status is Loco-regional progression, with provided method of progression',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "Loco-regional progression",
                    "method_of_progression_status": "blood draw"
                }
            )
        ],
        [
            'Disease status is relapse, without provided method of progression',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse"
                }
            )
        ],
        [
            'Disease status is distant progression, without method of progression',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "Distant progression"
                }
            )
        ],
        [
            'Disease status is Loco-regional progression, without method of progression',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "Loco-regional progression"
                }
            )
        ],
        [
            'Disease status is partial remission, without method of progression',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "partial remission"
                }
            )
        ],
        [
            'Disease status is partial remission, with method of progression',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "partial remission",
                    "method_of_progression_status": "imaging"
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
                    "disease_status_at_followup": "relapse",
                    "anatomic_site_progression_or_recurrences": "Ankle"
                }
            )
        ],
        [
            'Disease status is distant progression, with provided ASPOR',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "Distant progression",
                    "anatomic_site_progression_or_recurrences": "Jaw"
                }
            )
        ],
        [
            'Disease status is relapse, without provided ASPOR',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse"
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
        ]
    ],
    'recurrence_tumour_staging_system': [
        [
            'Disease status is relapse, with provided RTSS',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse",
                    "recurrence_tumour_staging_system": "Binet"
                }
            )
        ],
        [
            'Disease status is distant progression, with provided RTSS',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "Distant progression",
                    "recurrence_tumour_staging_system": "FIGO"
                }
            )
        ],
        [
            'Disease status is relapse, without provided ASPOR',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse"
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
        ]
    ],
    'posttherapy_tumour_staging_system': [
        [
            'Disease status is relapse, with provided PTSS',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "Relapse",
                    "posttherapy_tumour_staging_system": "Murphy"
                }
            )
        ],
        [
            'Disease status is distant progression, with provided PTSS',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "Distant progression",
                    "posttherapy_tumour_staging_system": "Lugano"
                }
            )
        ],
        [
            'Disease status is relapse, without provided ASPOR',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse"
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