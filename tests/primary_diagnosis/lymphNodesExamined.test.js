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

const validation = require('../../references/validationFunctions/primary_diagnosis/lymphNodesExamined');

const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const primary_diagnosis = require('../constructDummyData').getSchemaDummy('primary_diagnosis');


// key -> name of field, value -> unit tests
const myUnitTests = {
    'number_lymph_nodes_examined': [
        [
            'lymph nodes were examined and number_lymph_nodes_examined is a value greater than 0',
            true,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Yes",
                    "number_lymph_nodes_examined": 35
                }
            )
        ],
        [
            'lymph nodes were examined and number_lymph_nodes_examined is 0',
            false,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Yes",
                    "number_lymph_nodes_examined": 0
                }
            )
        ],
        [
            'lymph nodes were examined and number_lymph_nodes_examined is left blank',
            true,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Yes",
                }
            )
        ],
        [
            'lymph nodes were examined and number_lymph_nodes_examined is less than 0',
            false,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Yes",
                    "number_lymph_nodes_examined": -77
                }
            )
        ],
        [
            'lymph nodes were not examined but number_lymph_nodes_examined is submitted',
            false,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Not applicable",
                    "number_lymph_nodes_examined": 9
                }
            )
        ],
        [
            'lymph nodes were not examined and number_lymph_nodes_examined is 0',
            true,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Not applicable",
                    "number_lymph_nodes_examined": 0
                }
            )
        ]
   ],
   'number_lymph_nodes_positive': [
        [
            'lymph nodes were examined and number_lymph_nodes_positive is 0',
            true,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Yes",
                    "number_lymph_nodes_positive": 0
                }
            )
        ],
        [
            'lymph nodes were examined and number_lymph_nodes_positive is left blank',
            false,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Yes",
                }
            )
        ],
        [
            'lymph nodes were examined, number_lymph_nodes_examined is 16 and number_lymph_nodes_positive is 10',
            true,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Yes",
                    "number_lymph_nodes_examined": 16,
                    "number_lymph_nodes_positive": 10
                }
            )
        ],
        [
            'lymph nodes were examined but number_lymph_nodes_positive is greater than number_lymph_nodes_examined. ',
            false,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Yes",
                    "number_lymph_nodes_examined": 12,
                    "number_lymph_nodes_positive": 18
                }
            )
        ],
        [
            'lymph nodes were not examined but number_lymph_nodes_positive is submitted. ',
            false,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "No",
                    "number_lymph_nodes_positive": 5
                }
            )
        ],
        [
            'lymph nodes could not be examined but number_lymph_nodes_positive is submitted. ',
            false,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Cannot be determined",
                    "number_lymph_nodes_positive": 7
                }
            )
        ],
        [
            'lymph nodes were examined but number_lymph_nodes_positive is not submitted. ',
            false,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Yes",
                    "number_lymph_nodes_examined": 23
                }
            )
        ],
        [
            'lymph nodes were examined and number_lymph_nodes_positive is a negative value',
            false,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Yes",
                    "number_lymph_nodes_positive": -8783
                }
            )
        ],
        [
            'lymph nodes were examined and number_lymph_nodes_examined is left blank and number_lymph_nodes_positive is a value greater than 0',
            true,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Yes",
                    "number_lymph_nodes_examined": "",
                    "number_lymph_nodes_positive": 9
                }
            )
        ],
        [
            'lymph nodes were examined and both number_lymph_nodes_examined and number_lymph_nodes_positive are negative values',
            false,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Yes",
                    "number_lymph_nodes_examined": -2,
                    "number_lymph_nodes_positive": -9
                }
            )
        ],
        [
            'lymph nodes were examined and number_lymph_nodes_examined is the same as number_lymph_nodes_positive',
            true,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Yes",
                    "number_lymph_nodes_examined": 12,
                    "number_lymph_nodes_positive": 12
                }
            )
        ],
        [
            'lymph nodes were examined was not applicable but number_lymph_nodes_positive is submitted as 0',
            false,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Not applicable",
                    "number_lymph_nodes_examined": 0,
                    "number_lymph_nodes_positive": 0
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

describe("Unit Tests for Lymph Node Fields in Primary Diagnosis",()=>{
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
