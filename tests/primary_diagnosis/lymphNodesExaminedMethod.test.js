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

const validation = require('../../references/validationFunctions/primary_diagnosis/lymphNodesExaminedMethod');

const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const primary_diagnosis = require('../constructDummyData').getSchemaDummy('primary_diagnosis');


// key -> name of field, value -> unit tests
const myUnitTests = {
    'lymph_nodes_examined_method': [
        [
            'lymph nodes were examined and lymph_nodes_examined_method is submitted',
            true,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Yes",
                    "lymph_nodes_examined_method": "imaging"
                }
            )
        ],
        [
            'lymph nodes were not examined and lymph_nodes_examined_method is submitted',
            false,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "no",
                    "lymph_nodes_examined_method": "physical palpation of patient"
                }
            )
        ],
        [
            'lymph nodes were examined and lymph_nodes_examined_method is left blank',
            false,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Yes",
                    "lymph_nodes_examined_method": ""
                }
            )
        ],
        [
            'lymph nodes examined status is unknown and lymph_nodes_examined_method is left blank',
            true,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Unknown",
                    "lymph_nodes_examined_method": ""
                }
            )
        ],
        [
            'lymph nodes examined status is unknown and lymph_nodes_examined_method is submitted',
            false,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Unknown",
                    "lymph_nodes_examined_method": "Imaging"
                }
            )
        ],
        [
            'lymph nodes were examined and lymph_nodes_examined_method not submitted',
            false,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Yes",
                }
            )
        ],
        [
            'lymph nodes were not examined and lymph_nodes_examined_method not submitted',
            true,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_status": "Not applicable"
                }
            )
        ],
        [
            'lymph_nodes_examined_method is missing',
            false,
            loadObjects(primary_diagnosis,
                {   
                    "lymph_nodes_examined_method": null
                }
            )
        ],
        [
            'lymph_nodes_examined_status is missing and lymph_nodes_examined_method not submitted',
            false,
            loadObjects(primary_diagnosis,
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
