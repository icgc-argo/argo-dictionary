/*
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
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

const validation = require('../../references/validationFunctions/common/mxCategoryValidation.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const dummy = require('../constructDummyData');
const specimen = require('../constructDummyData').getSchemaDummy('specimen');
const primary_diagnosis = require('../constructDummyData').getSchemaDummy('primary_diagnosis');

// the name of the field being validateds

const unitTests = {
 'Specimen': [
  [
    'Pathological staging system set to "AJCC 6th edition" and "MX" submitted in pathological_m_category',
    true,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'ajcc 6th edition',
        pathological_m_category: 'MX'
      }),
      name: 'pathological_m_category',
    },
  ],
  [
    'Pathological staging system set to "AJCC 8th edition" and "MX" submitted in pathological_m_category',
    false,
    {
      row: loadObjects(specimen, {
        pathological_tumour_staging_system: 'AJCC 8th edition',
        pathological_m_category: 'MX'
      }),
      name: 'pathological_m_category',
    },
  ]
 ],
 'Primary Diagnosis': [
  [
    'Staging system set to an "AJCC 6th edition" and clinical_m_category set to "MX"',
    true,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'Ajcc 6th Edition',
        clinical_m_category: 'MX',
      }),
      name: 'clinical_m_category'
    },
  ],
  [
    'Staging system set to an "AJCC 7th edition" and clinical_m_category set to "MX"',
    false,
    {
      row: loadObjects(primary_diagnosis, {
        clinical_tumour_staging_system: 'Ajcc 7th Edition',
        clinical_m_category: 'MX',
      }),
      name: 'clinical_m_category'
    },
  ]
 ]
};

describe('Common Tests', () => {
  Object.entries(unitTests).forEach(schema => {
    schema[1].forEach(testSuite => {
      const testIndex = 2;
      const testInputs = testSuite[testIndex];
      universalTest(validation()({$row: testInputs, $name: name, $field: testInputs[name]}));
    });
  });
});


describe('Unit Tests for Stage Group script', () => {
  // Using .each to reduce repetition. Each array entry is its own test.
  // Entry 0: Used as test description
  // Entry 1: The target result.
  // Entry 2: The object containing the inputs to the validate function.

  // the index for accessing the name of the type of unit tests what will run
  const nameIndex = 0;
  // the index for accessing the array of arrays that hold the test information
  const testsIndex = 1;

  Object.entries(unitTests).forEach(schema => {
    describe(`${schema[nameIndex]} Tests`, () => {
      test.each(schema[testsIndex])(
        '\n Test %# : %s \nExpecting result.valid to be: %s',
        (description, target, inputs) => {
          console.log(inputs.name);
          console.log(inputs.row[inputs.name]);
          const scriptOutput = validation()({ $row: inputs.row, $name: inputs.name, $field: inputs.row[inputs.name]});
          expect(scriptOutput.valid).toBe(target);
        },
      );
    });
  });
});
