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

const validation = require('../../references/validationFunctions/surgery/marginTypeCheck');

const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const surgery = require('../constructDummyData').getSchemaDummy('surgery');


// key -> name of field, value -> unit tests
const myUnitTests = {
    'margin_types_involved': [
        [
            'margin_types_involved is submitted when surgery_type is Lobectomy and submitter_specimen_id is submitted',
            true,
            loadObjects(surgery,
                {   
                    "margin_types_involved": "Proximal margin",
                    "submitter_specimen_id": "SP01",
                    "surgery_type": "Lobectomy"
                }
            )
        ],
        [
            'margin_types_involved is submitted when surgery_type is Sentinal Lymph Node Biopsy and submitter_specimen_id is not submitted',
            true,
            loadObjects(surgery,
                {   
                    "margin_types_involved": "Distal margin",
                    "submitter_specimen_id": "SP02",
                    "surgery_type": "Sentinal Lymph Node Biopsy"
                }
            )
        ],
        [
            'margin_types_involved is submitted when surgery_type is Debulking and submitter_specimen_id is not submitted',
            true,
            loadObjects(surgery,
                {   
                    "margin_types_involved": "Distal margin",
                    "submitter_specimen_id": "SP03",
                    "surgery_type": "Debulking"
                }
            )
        ],
        [
            'margin_types_involved is submitted when surgery_type is Mastectomy and submitter_specimen_id is not submitted',
            false,
            loadObjects(surgery,
                {   
                    "margin_types_involved": "Proximal margin|Distal margin",
                    "surgery_type": "Mastectomy"
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

describe("Unit Tests for fields in Surgery",()=>{
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
