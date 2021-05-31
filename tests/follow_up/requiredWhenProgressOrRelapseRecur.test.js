const validation = require('../../references/validationFunctions/follow_up/baseScripts/requiredWhenProgressOrRelapseRecur');

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
        ],
        [
            'Disease status is complete remission, and relapse type is not provided',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "complete remission",
                }
            )
        ],
    ],
    'anatomic_site_progression_or_recurrence': [
        [
            'Disease status is distant progression, with provided ASPOR',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "Distant progression",
                    "anatomic_site_progression_or_recurrence": "C50"
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
                    "anatomic_site_progression_or_recurrence": "C50.1"
                }
            )
        ],
        [
            'Disease status is relapse or recurrence, with provided ASPOR',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse or recurrence",
                    "anatomic_site_progression_or_recurrence": "C50.1"
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
   ],
    'recurrence_tumour_staging_system': [
        [
            'Disease status is relapse, with provided RTSS',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse or recurrence",
                    "recurrence_tumour_staging_system": "AJCC 8th edition"
                }
            )
        ],
        [
            'Disease status is relapse, without provided RTSS',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse or recurrence"
                }
            )
        ],
        [
            'Disease status is distant progression, without provided RTSS',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "distant progression"
                }
            )
        ],
        [
            'Disease status is loco-regional progression, without provided RTSS',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "loco-regional progression",
                    "recurrence_tumour_staging_system": "Binet staging system"
                    
                }
            )
        ],
        [
            'Disease status is no evidence of disease, without provided RTSS',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "no evidence of disease"
                }
            )
        ],
        [
            'Disease status is no evidence of disease, without provided RTSS',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "no evidence of disease",
                    "recurrence_tumour_staging_system": "Binet staging system"
                }
            )
        ]
    ],
    'method_of_progression_status': [

        [
            'Disease status is distant progression, with provided method of progression',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "Distant progression",
                    "method_of_progression_status": "Biopsy"
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
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "partial remission",
                    "method_of_progression_status": "imaging"
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
            universalTest(validation()({ $row: testInputs, $name: name, $field: testInputs[name]}));
        })
    })
    
})

describe("Unit Tests for Disease Status Follow-Up",()=>{
    Object.entries(myUnitTests).forEach(field => {
        const name = field[0];
        const unitTests = field[1];
        describe(`Tests for the ${name} field.`,()=>{
            test.each(unitTests)('\n Test %# : %s \nExpecting result.valid to be: %s',(description,target,inputs) =>{
                const scriptOutput = validation()({ $row: inputs, $field: inputs[name], $name: name});
                expect(scriptOutput.valid).toBe(target);
            })
        })
        
    })
    
})
