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

const validation = require('../../references/validationFunctions/exposure/checkExerciseIntensity.js');

const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const exposure = require('../constructDummyData').getSchemaDummy('exposure');


// key -> name of field, value -> unit tests
const myUnitTests = {
    'exercise_intensity': [
        [
            'exercise_intensity is submitted when donor exercise 1-3 times a month',
            true,
            loadObjects(exposure,
                {   
                    "exercise_frequency": "1-3 times a month",
                    "exercise_intensity": "Moderate: Increase in heart beat sligtly with some light perspiration"
                }
            )
        ],
        [
            'exercise_intensity is submitted when donor never exercises',
            false,
            loadObjects(exposure,
                {   
                    "exercise_frequency": "never",
                    "exercise_intensity": "Moderate: Increase in heart beat sligtly with some light perspiration"
                }
            )
        ],
        [
            'exercise_intensity is submitted as not applicable when donor exercises once or twice a week',
            false,
            loadObjects(exposure,
                {   
                    "exercise_frequency": "once or twice a week",
                    "exercise_intensity": "not applicable"
                }
            )
        ],
        [
            'exercise_intensity is submitted as unknown when donor exercises once or twice a week',
            true,
            loadObjects(exposure,
                {   
                    "exercise_frequency": "once or twice a week",
                    "exercise_intensity": "unknown"
                }
            )
        ],
        [
            'exercise_intensity is submitted as unknown when exercise_frequency is not applicable',
            false,
            loadObjects(exposure,
                {   
                    "exercise_frequency": "not applicable",
                    "exercise_intensity": "unknown"
                }
            )
        ],
        [
            'exercise_intensity is submitted as not applicable when exercise_frequency is unknown',
            false,
            loadObjects(exposure,
                {   
                    "exercise_frequency": "unknown",
                    "exercise_intensity": "not applicable"
                }
            )
        ],
        [
            'exercise_intensity is submitted and exercise_frequency is missing',
            false,
            loadObjects(exposure,
                {   
                    "exercise_intensity": "Low: No increase in the heart beat, and no perspiration"
                }
            )
        ],
        [
            'exercise_intensity is missing and exercise_frequency is submitted',
            false,
            loadObjects(exposure,
                {   
                    "exercise_frequency": "less than once a month"
                }
            )
        ],
        [
            'neither exercise_intensity or exercise_frequency are submitted',
            true,
            loadObjects(exposure, {})
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

describe("Unit Tests for exercise related fields in exposure table",()=>{
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

