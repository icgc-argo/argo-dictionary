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

const validation = require('../../references/validationFunctions/treatment/checkWhenNoTreatment.js');

const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const treatment = require('../constructDummyData').getSchemaDummy('treatment');


// key -> name of field, value -> unit tests
const myUnitTests = {
    'treatment_start_interval': [
        [
            'treatment_start_interval is submitted when no treatment was given',
            false,
            loadObjects(treatment,
                {   
                    "treatment_start_interval": 30,
                    "treatment_type": "No treatment"
                }
            )
        ],
        [
            'treatment_start_interval is submitted when treatment is given',
            true,
            loadObjects(treatment,
                {   
                    "treatment_start_interval": 409,
                    "treatment_type": "Chemotherapy"
                }
            )
        ],
        [
            'treatment_start_interval is a negative value when treatment is given',
            false,
            loadObjects(treatment,
                {   
                    "treatment_start_interval": -9999,
                    "treatment_type": "Chemotherapy"
                }
            )
        ],
        [
            'treatment_start_interval is not submitted  when no treatment is given',
            true,
            loadObjects(treatment,
                {
                    "treatment_type": "No treatment"
                }
            )
        ]
    ],
    'treatment_duration': [
        [
            'treatment_duration is submitted when no treatment was given',
            false,
            loadObjects(treatment,
                {   
                    "treatment_duration": 30,
                    "treatment_type": "No treatment"
                }
            )
        ],
        [
            'treatment_duration is submitted when treatment is given',
            true,
            loadObjects(treatment,
                {   
                    "treatment_duration": 40,
                    "treatment_type": "Chemotherapy"
                }
            )
        ],
        [
            'treatment_duration is missing when treatment is given',
            false,
            loadObjects(treatment,
                {   
                    "treatment_type": "Surgery"
                }
            )
        ]
    ],
    'is_primary_treatment': [
        [
            'is_primary_treatment is missing when treatment was given',
            false,
            loadObjects(treatment,
                {   
                    "is_primary_treatment": "",
                    "treatment_type": "Chemotherapy"
                }
            )
        ],
        [
            'is_primary_treatment is submitted when no treatment was given',
            false,
            loadObjects(treatment,
                {   
                    "is_primary_treatment": "Yes",
                    "treatment_type": "No treatment"
                }
            )
        ],
        [
            'is_primary_treatment is submitted when treatment is given',
            true,
            loadObjects(treatment,
                {   
                    "is_primary_treatment": "No",
                    "treatment_type": "Chemotherapy"
                }
            )
        ],
        [
            'is_primary_treatment is not submitted when no treatment is given',
            true,
            loadObjects(treatment,
                {  
                    "is_primary_treatment": "", 
                    "treatment_type": "No treatment"
                }
            )
        ]
    ],
    'treatment_setting': [
        [
            'treatment_setting is submitted when no treatment was given',
            false,
            loadObjects(treatment,
                {   
                    "treatment_setting": "neoadjuvant",
                    "treatment_type": "No treatment"
                }
            )
        ],
        [
            'treatment_setting is submitted when treatment is given',
            true,
            loadObjects(treatment,
                {   
                    "treatment_setting": "adjuvant",
                    "treatment_type": "Chemotherapy"
                }
            )
        ]
    ],
    'treatment_intent': [
        [
            'treatment_intent is submitted when no treatment was given',
            false,
            loadObjects(treatment,
                {   
                    "treatment_intent": "curative",
                    "treatment_type": "No treatment"
                }
            )
        ],
        [
            'treatment_intent is submitted when treatment is given',
            true,
            loadObjects(treatment,
                {   
                    "treatment_intent": "palliative",
                    "treatment_type": "Chemotherapy"
                }
            )
        ]
    ], 
    'line_of_treatment': [
        [
           'line of treatment submitted even though no treatment was given',
           false,
           loadObjects(treatment,
               {
                    "line_of_treatment": 1,
                    "treatment_type": "No treatment"
               }
           )
        ],
        [
           'line of treatment not submitted when no treatment was given',
           true,
           loadObjects(treatment,
               {
                    "treatment_type": "No treatment"
               }
           )
        ],
        [
           'line of treatment not submitted when Hormonal therapy given. Should not fail since this field is optional',
           true,
           loadObjects(treatment,
               {
                    "line_of_treatment": "",
                    "treatment_type": "Hormonal therapy"
               }
           )
        ],
    ],
    'days_per_cycle': [
        [
           'days per cycle is a negative number when no treatment was given',
           false,
           loadObjects(treatment,
               {
                    "days_per_cycle": -777,
                    "treatment_type": "No treatment"
               }
           )
        ],
        [
           'days per cycle is a negative number when Chemotherapy was given',
           false,
           loadObjects(treatment,
               {
                    "days_per_cycle": -777,
                    "treatment_type": "Chemotherapy"
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

describe("Unit Tests for treatment fields when no treatment is given",()=>{
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
