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

const validation = require('../../references/validationFunctions/exposure/checkAlcoholHistory.js');

const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const exposure = require('../constructDummyData').getSchemaDummy('exposure');


// key -> name of field, value -> unit tests
const myUnitTests = {
    'alcohol_history': [
        [
            'alcohol_history is submitted as yes when donor is a daily drinker',
            true,
            loadObjects(exposure,
                {
                    "alcohol_history": "yes", 
                    "alcohol_consumption_category": "daily drinker",
                }
            )
        ],
        [
            'alcohol_history is submitted as yes when donor consumption category is unknown (may have been a former drinker)',
            true,
            loadObjects(exposure,
                {
                    "alcohol_history": "yes", 
                    "alcohol_consumption_category": "unknown"
                }
            )
        ],
        [
            'alcohol_history is submitted as no when donor consumption category is occasional (donor may have recently started drinking alcohol but not 12 drinks yet)',
            true,
            loadObjects(exposure,
                {
                    "alcohol_history": "no", 
                    "alcohol_consumption_category": "Occasional Drinker (< once a month)"
                }
            )
        ],
        [
            'alcohol_history is submitted as no when donor consumption category is weekly',
            false,
            loadObjects(exposure,
                {
                    "alcohol_history": "No",
                    "alcohol_consumption_category": "Weekly Drinker (>=1x a week)",
                    "alcohol_type": "Beer|Liquor|Wine"
                }
            )
        ],
        [
           'alcohol_consumption_category is daily drinker but alcohol_history is no',
           false,
           loadObjects(exposure, 
               {
                   "alcohol_consumption_category": "daily drinker",
                   "alcohol_history": "no"
               }
           )
        ],
        [
           'alcohol_consumption_category is daily drinker but alcohol_history is not applicable',
           false,
           loadObjects(exposure, 
               {
                   "alcohol_consumption_category": "daily drinker",
                   "alcohol_history": "not applicable"
               }
           )
        ],
        [
           'alcohol_consumption_category is unknown but alcohol_history is no',
           false,
           loadObjects(exposure, 
               {
                   "alcohol_consumption_category": "unknown",
                   "alcohol_history": "no"
               }
           )
        ],
        [
            'alcohol_type is submitted as not applicable and alcohol consumption is unknown',
            false,
            loadObjects(exposure,
                {
                    "alcohol_history": "not applicable", 
                    "alcohol_consumption_category": "unknown"
                }
            )
        ],
        [
            'alcohol_type is submitted as unknown but alcohol consumption is missing',
            false,
            loadObjects(exposure,
                {
                    "alcohol_history": "unknown" 
                }
            )
        ],
        [
            'alcohol_type is submitted as yes but alcohol consumption is missing',
            false,
            loadObjects(exposure,
                {
                    "alcohol_history": "yes" 
                }
            )
        ],
        [
            'alcohol_type is missing and alcohol consumption is daily drinker',
            false,
            loadObjects(exposure,
                {
                    "alcohol_consumption_category": "daily drinker" 
                }
            )
        ],
        [
            'alcohol_type is missing and alcohol consumption is unknown',
            false,
            loadObjects(exposure,
                {
                    "alcohol_consumption_category": "unknown" 
                }
            )
        ],
        [
            'alcohol_type is missing and alcohol consumption is not applicable',
            false,
            loadObjects(exposure,
                {
                    "alcohol_consumption_category": "not applicable" 
                }
            )
        ],
        [
            'Neither alcohol_history or alcohol_consumption are submitted',
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

describe("Unit Tests for alcohol related fields in exposure table",()=>{
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

