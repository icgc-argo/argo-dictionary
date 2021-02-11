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

const validation = require('./../../references/validationFunctions/specimen/stageGroup.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const specimen = require('../constructDummyData').getSchemaDummy('specimen');

// the name of the field being validateds
const name = 'pathological_stage_group';

const unitTests = [
  [
    'Staging system set to "revised international staging system (riss)", stage group is: "stage ii"',
    true,
    loadObjects(specimen, {
      pathological_tumour_staging_system: 'revised international staging system (riss)',
      pathological_stage_group: 'stage ii',
    }),
  ],
  [
    'Staging system set to "lugano staging system", stage group is: "stage iva"',
    true,
    loadObjects(specimen, {
      pathological_tumour_staging_system: 'lugano staging system',
      pathological_stage_group: 'stage iva',
    }),
  ],
  [
    'Staging system set to "St Jude staging System", stage group is: "Stage III"',
    true,
    loadObjects(specimen, {
      pathological_tumour_staging_system: 'St Jude staging System',
      pathological_stage_group: 'Stage III',
    }),
  ],
  [
    'Staging system set to "Ann Arbor Staging System", stage group is: "stage IiIA"',
    true,
    loadObjects(specimen, {
      pathological_tumour_staging_system: 'Ann Arbor Staging System',
      pathological_stage_group: 'stage IiIA',
    }),
  ],
  [
    'Staging system set to " rai Staging syStem ", stage group is: " stage 0 "',
    true,
    loadObjects(specimen, {
      pathological_tumour_staging_system: ' rai Staging syStem ',
      pathological_stage_group: ' stage 0 ',
    }),
  ],
  [
    'Staging system set to " Durie-salmon Staging syStem ", stage group is: " stage iiB"',
    true,
    loadObjects(specimen, {
      pathological_tumour_staging_system: ' Durie-salmon Staging syStem ',
      pathological_stage_group: ' stage iiB',
    }),
  ],
  [
    'Staging system set to "FIGO Staging syStem ", stage group is: "stage iAB "',
    true,
    loadObjects(specimen, {
      pathological_tumour_staging_system: 'FIGO Staging syStem ',
      pathological_stage_group: 'stage iAB ',
    }),
  ],
  [
    'Staging system set to " binEt stAging SYSTEM", stage group is: "stAge C "',
    true,
    loadObjects(specimen, {
      pathological_tumour_staging_system: ' binEt stAging SYSTEM',
      pathological_stage_group: 'stAge C ',
    }),
  ],
  [
    'Staging system set to "AJCC 8th Edition", stage group is: "STAGE IB1"',
    true,
    loadObjects(specimen, {
      pathological_tumour_staging_system: 'AJCC 8th Edition',
      pathological_stage_group: 'STAGE IB1',
    }),
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is: "occult Carcinoma"',
    true,
    loadObjects(specimen, {
      pathological_tumour_staging_system: 'AJCC 7th edition',
      pathological_stage_group: 'occult Carcinoma',
    }),
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is: "occult Carcinoma"',
    true,
    loadObjects(specimen, {
      pathological_tumour_staging_system: 'AJCC 7th edition',
      pathological_stage_group: 'occult Carcinoma',
    }),
  ],
  [
    'Staging system set to "AJCC 7th edition", stage group is an impermissable value',
    false,
    loadObjects(specimen, {
      pathological_tumour_staging_system: 'AJCC 7th edition',
      pathological_stage_group: ' an impermissable VALUE!!! ',
    }),
  ],
  [
    'Staging system set to "Binet staging system", stage group is: "Stage I"',
    false,
    loadObjects(specimen, {
      pathological_tumour_staging_system: 'Binet staging system',
      pathological_stage_group: 'Stage I',
    }),
  ],
  [
    'Staging system set to "Binet staging system", stage group is value from another codelist: "Stage I"',
    false,
    loadObjects(specimen, {
      pathological_tumour_staging_system: 'Binet staging system',
      pathological_stage_group: 'Stage I',
    }),
  ],
  [
    'Staging system set to "Rai staging system", stage group is "iii"',
    false,
    loadObjects(specimen, {
      pathological_tumour_staging_system: 'Rai staging system',
      pathological_stage_group: 'iii',
    }),
  ],
  [
    'Staging system set to "ajcc 8th edition", stage group is just whitespace"',
    false,
    loadObjects(specimen, {
      pathological_tumour_staging_system: 'ajcc 8th edition',
      pathological_stage_group: '         ',
    }),
  ],
  [
    'Staging system set to "ajcc 7th edition", stage group is gibberish"',
    false,
    loadObjects(specimen, {
      pathological_tumour_staging_system: 'ajcc 8th edition',
      pathological_stage_group: 'gibberish!',
    }),
  ],
  [
    'Staging system set to "ann arbor staging system", stage group is any text"',
    false,
    loadObjects(specimen, {
      pathological_tumour_staging_system: 'ann arbor staging system',
      pathological_stage_group: 'any text',
    }),
  ],
  [
    'Staging system set to empty, stage group is Stage I"',
    false,
    loadObjects(specimen, {
      pathological_tumour_staging_system: '',
      pathological_stage_group: 'Stage I',
    }),
  ],
  [
    'Staging system undefined',
    false,
    loadObjects(specimen, {
      pathological_stage_group: 'any text here',
    }),
  ],
  [
    'staging system undefined',
    true,
    loadObjects(specimen, {
      pathological_tumour_staging_system: 'default',
    }),
  ],
  ['both undefined', true, specimen],
];

describe('Common Tests', () => {
  unitTests.forEach(test => {
    const testIndex = 2;
    const testInputs = test[testIndex];
    universalTest(validation()({ $row: testInputs, $name: name, $field: testInputs[name]}));
  });
});

describe('Unit Tests for Pathological Staging System', () => {
  test.each(unitTests)(
    '\n Test %# : %s \nExpecting result.valid to be: %s',
    (description, target, inputs) => {
      const scriptOutput = validation()({ $row: inputs, $field: inputs[name], $name: name});
      expect(scriptOutput.valid).toBe(target);
    },
  );
});
