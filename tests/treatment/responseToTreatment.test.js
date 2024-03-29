/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

const validation = require('./../../references/validationFunctions/treatment/responseToTreatment.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const dummy = require('../constructDummyData');
const treatment = require('../constructDummyData').getSchemaDummy('treatment');

// the name of the field being validateds

const myUnitTests = {
 'response_to_treatment': [
  [
    'response_to_treatment_criteria_method is IWG Cheson AML 2003 Oncology Response Criteria, response_to_treatment is "Stable disease" which does not exist',
    false,
      loadObjects(treatment, 
          {
             "response_to_treatment_criteria_method": "IWG Cheson AML 2003 Oncology Response Criteria",
             "response_to_treatment": "stable Disease",
          }
      )
  ],
  [
    'response_to_treatment_criteria_method is "Response Assessment in Neuro-Oncology (RANO)" when response_to_treatment is "minor response"',
    true,
      loadObjects(treatment, 
          {
             "response_to_treatment_criteria_method": "Response Assessment in Neuro-Oncology (RANO)",
             "response_to_treatment": "minor response",
          }
      )
  ],
  [
    'response_to_treatment_criteria_method is "recist" when response_to_treatment is "minor response"',
    false,
      loadObjects(treatment, 
          {
             "response_to_treatment_criteria_method": "recist",
             "response_to_treatment": "minor response",
          }
      )
  ],
  [
    'response_to_treatment_criteria_method is recist and response_to_treatment is missing',
    false,
      loadObjects(treatment, 
          {
             "response_to_treatment_criteria_method": "recist",
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

describe("Unit Tests for response_to_treatment field",()=>{
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

