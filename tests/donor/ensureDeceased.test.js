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

const validation = require('./../../references/validationFunctions/donor/ensureDeceased.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const donor = require('../constructDummyData').getSchemaDummy('donor');

const myUnitTests = {
    "cause_of_death": [
        [
            'Deceased Donor without cause of death.',
            false,
            loadObjects(donor,
                {   
                    "vital_status": "deceased"
                }
            )
        ],
        [
            'Deceased Donor with cause of death.',
            true,
            loadObjects(donor,
                {   
                    "vital_status": "deceased",
                    "cause_of_death" : "Died of Cancer"
                }
            )
            
        ],
        [
            'Living Donor with cause of death.',
            false,
            loadObjects(donor,
                {
                    "vital_status": "Alive",
                    "cause_of_death" : "Died of Other Reasons"
                }
            )
        ],
        [
            'Living Donor without a cause of death.',
            true,
            loadObjects(donor,
                {
                    "vital_status": "Alive"
                }
            )
        ],
        [
            'Unknown Donor with a cause of death.',
            false,
            loadObjects(donor,
                {   
                    "vital_status": "unknown",
                    "cause_of_death": "died of cancer"
                }
            )
        ]
    ],
    "survival_time": [
        [
            'Deceased Donor without survival time',
            false,
            loadObjects(donor,
                {   
                    "vital_status": "deceased"
                }
            )
        ],
        [
            'Deceased Donor with survival time',
            true,
            loadObjects(donor,
                {   
                    "vital_status": "deceased",
                    "survival_time" : "55"
                }
            )
            
        ],
        [
            'Living Donor with survival_time.',
            false,
            loadObjects(donor,
                {
                    "vital_status": "Alive",
                    "survival_time" : "65"
                }
            )
        ],
        [
            'Living Donor without a survival_time',
            true,
            loadObjects(donor,
                {
                    "vital_status": "Alive"
                }
            )
        ],
        [
            'Unknown Donor with a survival_time.',
            false,
            loadObjects(donor,
                {   
                    "vital_status": "unknown",
                    "survival_time": "88"
                }
            )
        ],
        [
            'survival_time is submitted but vital_status is missing',
            false,
            loadObjects(donor,
                { 
                    "survival_time": "88"
                }
            )
        ],
        [
            'Both survival_time and  vital_status are missing',
            true,
            loadObjects(donor, {})
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

