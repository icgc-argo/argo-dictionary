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

const validation = require('../../references/validationFunctions/treatment/clinicalTrialValidation');

const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const treatment = require('../constructDummyData').getSchemaDummy('treatment');


// key -> name of field, value -> unit tests
const myUnitTests = {
    'clinical_trial_number': [
        [
            'Clinical trials database is NCI Clinical Trials, with provided NCI number',
            true,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "NCI Clinical Trials",
                    "clinical_trial_number": "NCT02750826"
                }
            )
        ],
        [
            'Clinical trials database is NCI Clinical Trials and NCI clinical number with whitespace',
            true,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": " nci clinical trials ",
                    "clinical_trial_number": "  NCT02750826  "
                }
            )
        ],
        [
            'Clinical trials database is NCI Clinical Trials, with incorrect NCI number',
            false,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "nci clinical trials",
                    "clinical_trial_number": "CT0275082"
                }
            )
        ],
        [
            'Clinical trials database is NCI Clinical Trials, but with a EudraCT number',
            false,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "nci clinical trials",
                    "clinical_trial_number": "2010-023457-11"
                }
            )
        ],
        [
            'Clinical trials database is NCI Clinical Trials, with missing NCI number',
            false,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "NCI Clinical Trials"
                }
            )
        ],
        [

            'Clinical trials database is EU Clinical Trials Register, with provided EudraCT number',
            true,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "EU Clinical Trials Register",
                    "clinical_trial_number":  "2010-023457-11"
                }
            )
        ],
        [
            'Clinical trials database is EU Clinical Trials Register, with incorrect EudraCT number',
            false,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "EU Clinical Trials Register",
                    "clinical_trial_number":  "2010/023d4-11"
                }
            )
        ],
        [
            'Clinical trials database is EU Clinical Trials Register, but with a NCI clinical number',
            false,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "EU Clinical Trials Register",
                    "clinical_trial_number":  "NCT0275082"
                }
            )
        ],
        [
            'Clinical trials database is EU Clinical Trials Register, but with missing EudraCT number',
            false,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "EU Clinical Trials Register"
                }
            )
        ],
        [
            'Clinical trials database is no correct, but has EudraCT number',
            false,
            loadObjects(treatment,
                {   
                    "clinical_trials_database": "  My own clinical trials database ",
                    "clinical_trial_number":  "2010-123456-11"

                }
            )
        ],
        [
            'Both clinical trials database and clinical trial number are undefined',
            true,
            loadObjects(treatment, {   
                })
        ],
        ['both undefined', true, treatment]
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

describe("Unit Tests for Clinical Trials Db in Treatment",()=>{
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
