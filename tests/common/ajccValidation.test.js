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

const validation = require('./../../references/validationFunctions/common/ajccValidation.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// Load in template files which already have all the field names
// Field values are null by default
const dummy = require('../constructDummyData');
const specimen = dummy.getSchemaDummy('specimen');
const followUp = dummy.getSchemaDummy('follow_up');
const primaryDiag = dummy.getSchemaDummy('primary_diagnosis');

//use spread operator to grab copies of template files
const unitTests = {
  Specimen: [
    [
      'AJCC Value with <t,n,m>_category values not set.',
      false,
      {
        row: loadObjects(specimen, {
          pathological_tumour_staging_system: 'AJCC 8th edition',
        }),
        name: 'pathological_tumour_staging_system',
      },
    ],
    [
      'AJCC Value with one category value not set.',
      false,
      {
        row: loadObjects(specimen, {
          pathological_tumour_staging_system: 'AJCC 7th Edition',
          pathological_m_category: 'M1',
          pathological_n_category: 'N2',
        }),
        name: 'pathological_tumour_staging_system',
      },
    ],
    [
      'AJCC Value with two categories value not set.',
      false,
      {
        row: loadObjects(specimen, {
          pathological_tumour_staging_system: 'AJCC 8th Edition',
          pathological_t_category: ' ',
          pathological_m_category: '',
          pathological_n_category: 'N3',
        }),
        name: 'pathological_tumour_staging_system',
      },
    ],
    [
      'Non AJCC Value with no categories set.',
      true,
      {
        row: loadObjects(specimen, {
          pathological_tumour_staging_system: 'Aajccc fake edition',
        }),
        name: 'pathological_tumour_staging_system',
      },
    ],
    [
      'Non AJCC Value with all categories set.',
      false,
      {
        row: loadObjects(specimen, {
          pathological_tumour_staging_system: 'binet staging system',
          pathological_t_category: 'T2',
          pathological_m_category: 'M1a',
          pathological_n_category: 'N3a',
        }),
        name: 'pathological_tumour_staging_system',
      },
    ],
  ],
  FollowUp: [
    [
      'Post-Therapy: AJCC Value with <t,n,m>_category values not set.',
      false,
      {
        row: loadObjects(followUp, {
          posttherapy_tumour_staging_system: 'AJCC 8th Edition',
        }),
        name: 'posttherapy_tumour_staging_system',
      },
    ],
    [
      'Post-Therapy: AJCC Value with t category value not set.',
      false,
      {
        row: loadObjects(followUp, {
          posttherapy_tumour_staging_system: 'AJCC 8th Edition',
          posttherapy_n_category: 'n3',
          posttherapy_m_category: 'm1',
        }),
        name: 'posttherapy_tumour_staging_system',
      },
    ],
    [
      'Post-Therapy: Non AJCC Value with <t,n,m>_category values not set',
      true,
      {
        row: loadObjects(followUp, {
          posttherapy_tumour_staging_system: 'Lugano staging system',
        }),
        name: 'posttherapy_tumour_staging_system',
      },
    ],
    [
      'Post-Therapy: Non AJCC Value with <t,n,m>_category values set',
      false,
      {
        row: loadObjects(followUp, {
          posttherapy_tumour_staging_system: 'Lugano staging system',
          posttherapy_t_category: 'T1',
          posttherapy_n_category: 'N3',
          posttherapy_m_category: 'M0',
        }),
        name: 'posttherapy_tumour_staging_system',
      },
    ],
    [
      'Recurrence: AJCC Value with <t,n,m>_category values not set.',
      false,
      {
        row: loadObjects(followUp, {
          recurrence_tumour_staging_system: 'AJCC 8th Edition',
        }),
        name: 'recurrence_tumour_staging_system',
      },
    ],
    [
      'Recurrence: AJCC Value with m value not set.',
      false,
      {
        row: loadObjects(followUp, {
          recurrence_tumour_staging_system: 'AJCC 7th Edition',
          recurrence_m_category: ' ',
        }),
        name: 'recurrence_tumour_staging_system',
      },
    ],
    [
      'Recurrence: Non AJCC Value with <t,n,m>_category values not set.',
      true,
      {
        row: loadObjects(followUp, {
          recurrence_tumour_staging_system: 'FIGO staging system',
        }),
        name: 'recurrence_tumour_staging_system',
      },
    ],
    [
      'Recurrence: Non AJCC Value with <n,m>_category values  set.',
      false,
      {
        row: loadObjects(followUp, {
          recurrence_tumour_staging_system: 'FIGO staging system',
          recurrence_t_category: ' ',
          recurrence_m_category: 'm1',
          recurrence_n_category: 'n2',
        }),
        name: 'recurrence_tumour_staging_system',
      },
    ],
  ],
  'Primary Diagnosis': [
    [
      'AJCC Value with <t,n,m>_category values not set.',
      false,
      {
        row: loadObjects(primaryDiag, {
          clinical_tumour_staging_system: 'AJCC 8th Edition',
        }),
        name: 'clinical_tumour_staging_system',
      },
    ],
    [
      'AJCC Value with m and n values not set.',
      false,
      {
        row: loadObjects(primaryDiag, {
          clinical_tumour_staging_system: 'AJCC 8th Edition',
          clinical_t_category: 'T2',
        }),
        name: 'clinical_tumour_staging_system',
      },
    ],
    [
      'Non AJCC Value with <t,n,m>_category values not set.',
      true,
      {
        row: loadObjects(primaryDiag, {
          clinical_tumour_staging_system: 'Ann Arbor staging system',
        }),
        name: 'clinical_tumour_staging_system',
      },
    ],
    [
      'Non AJCC Value with <t>_category values  set.',
      false,
      {
        row: loadObjects(primaryDiag, {
          clinical_tumour_staging_system: 'Ann Arbor staging system',
          clinical_t_category: 'some val',
        }),
        name: 'clinical_tumour_staging_system',
      },
    ],
    [
      'Null Value for field.',
      true,
      {
        row: loadObjects(primaryDiag, {
          clinical_tumour_staging_system: null,
        }),
        name: 'clinical_tumour_staging_system',
      },
    ],
    [
      'AJCC Value with T, N, M values all set',
      true,
      {
        row: loadObjects(primaryDiag, {
          clinical_tumour_staging_system: 'AJCC 8th Edition',
          clinical_t_category: 'T2',
          clinical_m_category: 'M1',
          clinical_n_category: 'N0(i-)',
        }),
        name: 'clinical_tumour_staging_system',
      },
    ],
    // Load objects will prepopulate the input data with the same keys as the schema
    // Not using it in these cases to simulate somebody not providing headers
    [
      'Non AJCC Value with <t,n,m>_category header not provided.',
      true,
      {
        row: {
          clinical_tumour_staging_system: 'Rai staging system',
        },
        name: 'clinical_tumour_staging_system',
      },
    ],
    [
      'Non AJCC Value with <m,n>_category header not provided, <t>_category field left empty.',
      true,
      {
        row: {
          clinical_tumour_staging_system: 'revised international staging sytem (riss)',
          clinical_t_category: '',
        },
        name: 'clinical_tumour_staging_system',
      },
    ],
    [
      'Non AJCC Value with <m,n>_category header not provided, <t>_category field provided.',
      false,
      {
        row: {
          clinical_tumour_staging_system: 'St Jude staging system',
          clinical_t_category: 'Forbidden Provided Value!',
        },
        name: 'clinical_tumour_staging_system',
      },
    ],
    [
      'AJCC Value with <t,n,m>_category fields not provided.',
      false,
      {
        row: {
          clinical_tumour_staging_system: 'AJCC 8th Edition',
        },
        name: 'clinical_tumour_staging_system',
      },
    ],
  ],
};

describe('Common Tests', () => {
  Object.entries(unitTests).forEach(schema => {
    schema[1].forEach(testSuite => {
      const testIndex = 2;
      const testInputs = testSuite[testIndex];
      universalTest(validation(testInputs.row, testInputs.name, testInputs.row[testInputs.name]));
    });
  });
});

describe('Unit Tests for AJCC validation script', () => {
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
          const scriptOutput = validation(inputs.row, inputs.name, inputs.row[inputs.name]);
          expect(scriptOutput.valid).toBe(target);
        },
      );
    });
  });
});
