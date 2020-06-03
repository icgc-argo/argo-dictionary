/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of the GNU Affero General Public License v3.0.
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY                           
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES                          
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT                           
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,                                
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED                          
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;                               
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER                              
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN                         
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *  
 *
 */

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
    'anatomic_site_progression_or_recurrences': [
        [
            'Disease status is relapse, with provided ASPOR',
            true,
            loadObjects(followUp,
                {   
                    "disease_status_at_followup": "relapse or recurrence",
                    "anatomic_site_progression_or_recurrences": "C50.1"
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
                    "anatomic_site_progression_or_recurrences": "C50"
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
