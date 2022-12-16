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

const validation = require('../../references/validationFunctions/immunotherapy/drugDose.js');

const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const immunotherapy = require('../constructDummyData').getSchemaDummy('immunotherapy');


// key -> name of field, value -> unit tests
const myUnitTests = {
    'actual_cumulative_drug_dose': [
        [
            'actual_cumulative_drug_dose is submitted when prescribed_cumulative_drug_dose is missing',
            true,
            loadObjects(immunotherapy,
                {   
                    "actual_cumulative_drug_dose": 100
                }
            )
        ],
        [
            'prescribed_drug_dose is submitted when actual_cumulative_drug_dose is missing',
            true,
            loadObjects(immunotherapy,
                {   
                    "prescribed_cumulative_drug_dose": 150
                }
            )
        ],
        [
            'Both actual_cumulative_drug_dose and prescribed_cumulative_drug_dose are submitted',
            true,
            loadObjects(immunotherapy,
                {   
                    "actual_cumulative_drug_dose": 300,
                    "prescribed_cumulative_drug_dose": 350
                }
            )
        ]
    ],
    'prescribed_cumulative_drug_dose': [
        [
            'prescribed_cumulative_drug_dose is submitted when actual_cumulative_drug_dose is missing',
            true,
            loadObjects(immunotherapy,
                {   
                    "prescribed_cumulative_drug_dose": 100
                }
            )
        ],
        [
            'actual_cumlative__drug_dose is submitted when prescribed_cumlative_drug_dose is missing',
            true,
            loadObjects(immunotherapy,
                {   
                    "actual_cumulative_drug_dose": 150
                }
            )
        ],
        [
            'Both actual_cumulative_drug_dose and prescribed_cumulative_drug_dose are submitted',
            true,
            loadObjects(immunotherapy,
                {   
                    "actual_cumulative_drug_dose": 300,
                    "prescribed_cumulative_drug_dose": 350
                }
            )
        ],
        [
            'Both actual_cumulative_drug_dose and prescribed_cumulative_drug_dose are missing',
            false,
            loadObjects(immunotherapy,
                {   
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

describe("Unit Tests for immunotherapy fields",()=>{
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
