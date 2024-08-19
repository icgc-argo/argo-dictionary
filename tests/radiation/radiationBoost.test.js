/*
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
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

const validation = require('./../../references/validationFunctions/radiation/radiationBoost.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const radiation = require('../constructDummyData').getSchemaDummy('radiation');

const myUnitTests = {
    "reference_radiation_treatment_id": [
        [
            'reference_radiation_treatment_id submitted when radiation boost was given.',
            true,
            loadObjects(radiation,
                {   
                    "radiation_boost": "yes",
                    "reference_radiation_treatment_id": "tr2"
                }
            )
        ],
        [
            'reference_radiation_treatment_id is empty when radiation boost was given.',
            false,
            loadObjects(radiation,
                {   
                    "radiation_boost": "yes",
                    "reference_radiation_treatment_id": ""
                }
            )
        ],
        [
            'reference_radiation_treatment_id is not submitted when radiation boost was given.',
            false,
            loadObjects(radiation,
                {   
                    "radiation_boost": "yes",
                }
            )
        ],
        [
            'reference_radiation_treatment_id is submitted when radiation boost was not given.',
            false,
            loadObjects(radiation,
                {   
                    "radiation_boost": "no",
                    "reference_radiation_treatment_id": "tr40"
                }
            )
        ],
        [
            'reference_radiation_treatment_id is submitted when radiation boost was unknown.',
            false,
            loadObjects(radiation,
                {   
                    "radiation_boost": "unknown",
                    "reference_radiation_treatment_id": "tr25"
                }
            )
        ],
        [
            'reference_radiation_treatment_id is submitted when radiation boost is missing.',
            false,
            loadObjects(radiation,
                {   
                    "reference_radiation_treatment_id": "tr3"
                }
            )
        ],
        [
            'Both radiation_boost and reference_radiation_treatment_id are missing',
            true,
            loadObjects(radiation, {})
        ]
    ]
};

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

describe("Unit Tests for Radiation Boost",()=>{
    Object.entries(myUnitTests).forEach(field => {
        const name = field[0];
        const unitTests = field[1];
        describe(`Tests for the ${name} field.`,() => {
            test.each(unitTests)('\n Test %# : %s \nExpecting result.valid to be: %s',(description,target,inputs) =>{
                const scriptOutput = validation()({ $row: inputs, $field: inputs[name], $name: name});
                expect(scriptOutput.valid).toBe(target);
            })
        })
    })
})

