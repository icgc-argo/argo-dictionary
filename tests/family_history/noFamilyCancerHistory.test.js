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

const validation = require('../../references/validationFunctions/family_history/noFamilyCancerHistory.js');

const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const family_history = require('../constructDummyData').getSchemaDummy('family_history');


// key -> name of field, value -> unit tests
const myUnitTests = {
    'age_of_relative_at_diagnosis': [
        [
            'age_of_relative_at_diagnosis is submitted when relative_with_cancer_history is yes',
            true,
            loadObjects(family_history,
                {   
                    "relative_with_cancer_history": "yes",
                    "age_of_relative_at_diagnosis": 67
                }
            )
        ],
        [
            'age_of_relative_at_diagnosis is submitted when relative_with_cancer_history is no',
            false,
            loadObjects(family_history,
                {   
                    "relative_with_cancer_history": "NO",
                    "age_of_relative_at_diagnosis": 69
                }
            )
        ],
        [
            'age_of_relative_at_diagnosis is submitted without relative_with_cancer_history',
            false,
            loadObjects(family_history,
                {   
                    "age_of_relative_at_diagnosis": 69
                }
            )
        ]

    ],
    'cancer_type_code_of_relative': [
        [
            'cancer_type_code_of_relative is submitted when relative_with_cancer_history is unknown',
            false,
            loadObjects(family_history,
                {   
                    "relative_with_cancer_history": "unknown",
                    "cancer_type_code_of_relative": "C50"
                }
            )
        ],
        [
            'cancer_type_code_of_relative is submitted when relative_with_cancer_history is yes',
            true,
            loadObjects(family_history,
                {   
                    "relative_with_cancer_history": "yes",
                    "cancer_type_code_of_relative": "C50"
                }
            )
        ],
        [
            'cancer_type_code_of_relative is submitted when relative_with_cancer_history is not submitted',
            false,
            loadObjects(family_history,
                {   
                    "cancer_type_code_of_relative": "C50"
                }
            )
        ]
    ],
    'relative_survival_time': [
        [
            'relative_survival_time is submitted when relative_with_cancer_history is yes',
            true,
            loadObjects(family_history,
                {   
                    "relative_with_cancer_history": "yes",
                    "relative_survival_time": 738
                }
            )
        ],
        [
            'relative_survival_time is submitted when relative_with_cancer_history is no',
            false,
            loadObjects(family_history,
                {   
                    "relative_with_cancer_history": "no",
                    "relative_survival_time": 738
                }
            )
        ],
        [
            'relative_survival_time is submitted when relative_with_cancer_history is unknown',
            false,
            loadObjects(family_history,
                {   
                    "relative_with_cancer_history": "unknown",
                    "relative_survival_time": 388
                }
            )
        ],
        [
            'relative_survival_time is submitted when relative_with_cancer_history is left empty',
            false,
            loadObjects(family_history,
                {   
                    "relative_survival_time": 90
                }
            )
        ],
        [
            'relative_survival_time is not submitted when relative_with_cancer_history is yes',
            true,
            loadObjects(family_history,
                {   
                    "relative_with_cancer_history": "yes",
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

describe("Unit Tests for family history fields",()=>{
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

