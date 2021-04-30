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

const validation = require('../../references/validationFunctions/comorbidity/comorbidityCheck.js');

const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const comorbidity = require('../constructDummyData').getSchemaDummy('comorbidity');


// key -> name of field, value -> unit tests
const myUnitTests = {
    'laterality_of_prior_malignancy': [
        [
            'laterality_of_prior_malignancy is submitted when there is a prior malignancy',
            true,
            loadObjects(comorbidity,
                {   
                    "prior_malignancy": "yes",
                    "laterality_of_prior_malignancy": "Left"
                }
            )
        ],
        [
            'laterality_of_prior_malignancy is not submitted when there is a prior malignancy',
            true,
            loadObjects(comorbidity,
                {   
                    "prior_malignancy": "yes",
                }
            )
        ],
        [
            'laterality_of_prior_malignancy is submitted when there is no prior malignancy',
            false,
            loadObjects(comorbidity,
                {   
                    "prior_malignancy": "no",
                    "laterality_of_prior_malignancy": "Right"
                }
            )
        ],
        [
            'laterality_of_prior_malignancy is submitted when there  prior malignancy information is not submitted',
            false,
            loadObjects(comorbidity,
                {   
                    "laterality_of_prior_malignancy": "Midline"
                }
            )
        ]
    ],
    'age_at_comorbidity_diagnosis': [
       [
          'age_at_comorbidity_diagnosis is submitted when there is a prior malignancy',
          true,
          loadObjects(comorbidity,
              {
                 "age_at_comorbidity_diagnosis": 34,
                 "prior_malignancy": "yes"
              }
          )
       ],
       [
          'age_at_comorbidity_diagnosis is submitted when there is no prior malignancy',
          false,
          loadObjects(comorbidity,
              {
                 "age_at_comorbidity_diagnosis": 55,
                 "prior_malignancy": "no"
              }
          )
       ],
       [
          'age_at_comorbidity_diagnosis is submitted when there is no prior malignancy but there is a comorbidity',
          true,
          loadObjects(comorbidity,
              {
                 "age_at_comorbidity_diagnosis": 52,
                 "prior_malignancy": "no",
                 "comorbidity_type_code": "E10"
              }
          )
       ],
       [
          'age_at_comorbidity_diagnosis is submitted when prior malignancy is not submitted  but there is a comorbidity',
          true,
          loadObjects(comorbidity,
              {
                 "age_at_comorbidity_diagnosis": 51,
                 "comorbidity_type_code": "I11"
              }
          )
       ],
       [
          'age_at_comorbidity_diagnosis is submitted when prior malignancy is not submitted and there is no comorbidity',
          false,
          loadObjects(comorbidity,
              {
                 "age_at_comorbidity_diagnosis": 56,
                 "comorbidity_type_code": "  "
              }
          )
       ],
       [
          'age_at_comorbidity_diagnosis is submitted when prior malignancy and comorbidity type are not submitted.',
          false,
          loadObjects(comorbidity,
              {
                 "age_at_comorbidity_diagnosis": 52,
              }
          )
       ]
    ],
    'comorbidity_treatment': [
       [
          'comorbidity_treatment is submitted when a comorbidity code is submitted',
          true,
          loadObjects(comorbidity,
              {
                 "comorbidity_treatment": "metformin",
                 "comorbidity_type_code": "E10"
              }
           )
       ],
       [
          'comorbidity_treatment is submitted when no comorbidity code is submitted',
          false,
          loadObjects(comorbidity,
              {
                 "comorbidity_treatment": "metformin",
              }
          )
       ],
       [
          'comorbidity_treatment is submitted when comorbidity treatment status is no',
          false,
          loadObjects(comorbidity,
              {
                 "comorbidity_treatment": "metformin",
                 "comorbidity_treatment_status": "no"
              }
          )
       ],
       [
          'comorbidity_treatment is submitted when comorbidity type code is submitted but comorbidity treatment status is no ',
          false,
          loadObjects(comorbidity,
              {
                 "comorbidity_type_code": "E10",
                 "comorbidity_treatment": "metformin",
                 "comorbidity_treatment_status": "no"
              }
          )
       ],
       [
          'comorbidity_treatment is submitted when there is prior malignancy.',
          true,
          loadObjects(comorbidity,
              {
                 "prior_malignancy": "yes",
                 "comorbidity_treatment": "metformin",
                 "comorbidity_treatment_status": "yes"
              }
          )
       ],
       [
          'comorbidity_treatment is submitted when comorbidity treatment status is not submitted',
          false,
          loadObjects(comorbidity,
              {
                 "comorbidity_treatment": "metformin",
              }
          )
       ],
       [
          'comorbidity_treatment is submitted when prior_malignancy is no',
          false,
          loadObjects(comorbidity,
              {
                 "comorbidity_treatment": "metformin",
                 "prior_malignancy": "no",
              }
          )
       ]
   ],
   'comorbidity_treatment_status': [
       [
          'comorbidity_treatment_status is submitted when a comorbidity code is submitted',
          true,
          loadObjects(comorbidity,
              {
                 "comorbidity_treatment_status": "yes",
                 "comorbidity_type_code": "E10"
              }
           )
       ],
       [
          'comorbidity_treatment_status is submitted when a comorbidity code is not submitted but there was a prior malignancy',
          true,
          loadObjects(comorbidity,
              {
                 "comorbidity_treatment_status": "yes",
                 "prior_malignancy": "yes"
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

describe("Unit Tests for comorbidity fields",()=>{
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

