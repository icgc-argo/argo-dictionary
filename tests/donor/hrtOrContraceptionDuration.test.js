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

const validation = require('./../../references/validationFunctions/donor/hrtOrContraceptionDuration.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const donor = require('../constructDummyData').getSchemaDummy('donor');

const myUnitTests = {
    'hrt_duration': [
        [
            "hrt_duration is submitted when donor took Combination HRT",
            true,
            loadObjects(donor,
                {   
                    "hrt_type": "Combination HRT",
                    "hrt_duration": 36
                }
            )
        ],
        [
            "hrt_duration is submitted when donor has never taken HRT",
            false,
            loadObjects(donor,
                {   
                    "hrt_type": "never taken HRT",
                    "hrt_duration": 12
                }
            )
        ],
        [
            "hrt_duration is submitted when hrt_type is missing",
            false,
            loadObjects(donor,
                {   
                    "hrt_duration": 25
                }
            )
        ],
        [
            "hrt_duration is missing but hrt_type is submitted",
            true,
            loadObjects(donor,
                {   
                    "hrt_type": "patch"
                }
            )
        ]
    ],
    'contraception_duration': [
        [
            "contraception_duration is submitted when donor took Injectable",
            true,
            loadObjects(donor,
                {   
                    "contraception_type": "Injectable",
                    "contraception_duration": 45
                }
            )
        ],
        [
            "contraception_duration is submitted when contraception type is missing",
            false,
            loadObjects(donor,
                {   
                    "contraception_duration": 15
                }
            )
        ],
        [
            "contraception_duration is submitted when donor has never taken contraception",
            false,
            loadObjects(donor,
                {   
                    "contraception_type": "Never used hormonal contraception",
                    "contraception_duration": 65
                }
            )
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

describe("Unit Tests for HRT/Contraception duration fields",()=>{
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

