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

const validation = require('../../references/validationFunctions/comorbidity/comorbidityOptionalFieldsCheck.js');

const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const comorbidity = require('../constructDummyData').getSchemaDummy('comorbidity');


// key -> name of field, value -> unit tests
const myUnitTests = {
   'age_at_comorbidity_diagnosis': [
       [
          'Age is submitted when comorbidity_type_code is submitted.',
          true,
          loadObjects(comorbidity,
              {
                 "age_at_comorbidity_diagnosis": 58,
                 "comorbidity_type_code": "C50"
              }
           )
       ],
       [
          'Age is not submitted when comorbidity_type_code is submitted.',
          true,
          loadObjects(comorbidity,
              {
                 "age_at_comorbidity_diagnosis": 62,
                 "comorbidity_type_code": "C50"
              }
           )
       ],
       [
          'Age is submitted when comorbidity_type_code is not submitted.',
          false,
          loadObjects(comorbidity,
              {
                 "prior_malignancy": "no",
                 "age_at_comorbidity_diagnosis": 65,
              }
           )
       ]
   ],
   'comorbidity_treatment_status': [
       [
          'Comorbidity treatment status is submitted when comorbidity_type_code is not submitted.',
          false,
          loadObjects(comorbidity,
              {
                 "prior_malignancy": "no",
                 "comorbidity_treatment_status": "yes",
              }
           )
       ],
       [
          'Comorbidity treatment status is not submitted when comorbidity_type_code is submitted.',
          true,
          loadObjects(comorbidity,
              {
                 "comorbidity_type_code": "K87"
              }
           )
       ],
       [
          'Comorbidity treatment status is submitted when comorbidity_type_code is submitted.',
          true,
          loadObjects(comorbidity,
              {
                 "comorbidity_type_code": "E78",
                 "comorbidity_treatment_status": "no"
              }
           )
       ]
    ],
    'comorbidity_treatment': [
       [
          'Comorbidity treatment is submitted when comorbidity_type_code is submitted.',
          false,
          loadObjects(comorbidity,
              {
                 "comorbidity_type_code": "E78",
                 "comorbidity_treatment": "medication"
              }
           )
       ],
       [
          'Comorbidity treatment is submitted when comorbidity_type_code is not submitted.',
          false,
          loadObjects(comorbidity,
              {
                 "comorbidity_treatment": "some medication"
              }
           )
       ],
       [
          'Comorbidity treatment is submitted when comorbidity_treatment_status is not submitted.',
          false,
          loadObjects(comorbidity,
              {
                 "comorbidity_treatment": "some treatment"
              }
           )
       ],
       [
          'Comorbidity treatment is submitted when comorbidity_treatment_status is submitted as yes.',
          true,
          loadObjects(comorbidity,
              {
                 "comorbidity_treatment_status": "yes",
                 "comorbidity_treatment": "some medication",
                 "comorbidity_type_code": "E10"
              }
           )
       ],
       [
          'Comorbidity treatment is submitted when comorbidity_treatment_status is no.',
          false,
          loadObjects(comorbidity,
              {
                 "comorbidity_treatment_status": "no",
                 "comorbidity_treatment": "some medication",
                 "comorbidity_type_code": "E10"
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

