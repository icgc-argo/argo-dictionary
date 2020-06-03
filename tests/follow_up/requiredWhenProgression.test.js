const validation = require('../../references/validationFunctions/follow_up/baseScripts/requiredWhenProgression');

const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const followUp = require('../constructDummyData').getSchemaDummy('follow_up');


// key -> name of field, value -> unit tests
const myUnitTests = {

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
    ],
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
        ]
    ],
    'recurrence_tumour_staging_system': [
        [
            'Disease status is distant progression, with provided RTSS',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "Distant progression",
                    "recurrence_tumour_staging_system": "FIGO staging system"
                }
            )
        ],
        [
            'Disease status is Loco-regional progression, without provided recurrence_tumour_staging_system',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "Loco-regional progression"
                }
            )
        ],
        [
            'Disease status is complete remission, without provided recurrence_tumour_staging_system',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "complete remission"
                }
            )
        ],
        [
            'Disease status is complete remission, with provided recurrence_tumour_staging_system',
            false,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "complete remission",
                    "recurrence_tumour_staging_system": "FIGO staging system"
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
