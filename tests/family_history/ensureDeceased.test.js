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

const validation = require('./../../references/validationFunctions/family_history/ensureDeceased.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const family_history = require('../constructDummyData').getSchemaDummy('family_history');

const myUnitTests = {
    "cause_of_death_of_relative": [
        [
            'Deceased relative with cause of death.',
            true,
            loadObjects(family_history,
                {   
                    "relative_vital_status": "deceased",
                    "cause_of_death_of_relative": "Died of cancer"
                }
            )
        ],
        [
            'Living relative with cause of death.',
            false,
            loadObjects(family_history,
                {   
                    "relative_vital_status": "alive",
                    "cause_of_death_of_relative" : "Died of Cancer"
                }
            )
        ],
        [
            'Relative vital status is unknown but cause of death is submitted.',
            false,
            loadObjects(family_history,
                {
                    "relative_vital_status": "unknown",
                    "cause_of_death_of_relative" : "Died of Other Reasons"
                }
            )
        ],
        [
            'Relative cause of death is submitted but relative_vital_status is not submitted.',
            false,
            loadObjects(family_history,
                {
                    "cause_of_death_of_relative": "died of cancer"
                }
            )
        ],
        [
            'Relative vital status is deceased and cause of death is not submitted.',
            true,
            loadObjects(family_history,
                {
                    "relative_vital_status": "deceased"
                }
            )
        ],
        [
            'Both relative_vital_status and cause_of_death_of_relative are undefined.',
            true,
            loadObjects(family_history, {
               })
        ],
        ['both undefined', true, family_history]
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

describe("Unit Tests for Ensure Deceased",()=>{
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

