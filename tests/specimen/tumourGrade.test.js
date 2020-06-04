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

const validation = require('./../../references/validationFunctions/specimen/tumourGrade.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const specimen = require('../constructDummyData').getSchemaDummy('specimen');

// the name of the field being validateds
const name = 'tumour_grade';

const unitTests = [
  [
    'Grading system set to "three-tier grading system", tumour grade is: "G3"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'three-tier grading system',
      tumour_grade: 'G3',
    }),
  ],
  [
    'Grading system set to "Two-tier grading system", tumour grade is: "Low Grade"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'Two-tier grading system',
      tumour_grade: 'Low Grade',
    }),
  ],
  [
    'Grading system set to "four-Tier grading SysTem", tumour grade is: "gx"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'four-Tier grading SysTem',
      tumour_grade: 'gx',
    }),
  ],
  [
    'Grading system set to "grading system for GISTS", tumour grade is: "high"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'grading system for GISTS',
      tumour_grade: 'high',
    }),
  ],
  [
    'Grading system set to " grading system for gnets ", tumour grade is: " g2 "',
    true,
    loadObjects(specimen, {
      tumour_grading_system: ' grading system for gnets ',
      tumour_grade: ' g2 ',
    }),
  ],
  [
    'Grading system set to "two-tier grading system", tumour grade is an impermissable value',
    false,
    loadObjects(specimen, {
      tumour_grading_system: 'two-tier grading system ',
      tumour_grade: ' an impermissable VALUE!!! ',
    }),
  ],
  [
    'Grading system set to "iSuP grading system", tumour grade is "G2"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'iSuP grading system',
      tumour_grade: 'G2',
    }),
  ],
  [
    'Grading system set to "who grading system for cns tumours", tumour grade is "grade iii"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'who grading system for cns tumours ',
      tumour_grade: 'grade iii',
    }),
  ],
  [
    'Grading system set to "WHO grading system for CNS tumours", tumour grade is "GRADE IV"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'WHO grading system for cns tumours',
      tumour_grade: 'GRADE IV',
    }),
  ],
  [
    'Grading system set to "FNCLCC grading system", tumour grade is "G1"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'FNCLCC grading system',
      tumour_grade: 'G1',
    }),
  ],
  [
    'Grading system set to "Gleason grade group system", tumour grade is a value from another codelist',
    false,
    loadObjects(specimen, {
      tumour_grading_system: 'Gleason grade group system',
      tumour_grade: 'IV',
    }),
  ],
  [
    'Grading system set to "Gleason grade group system ", tumour grade is "Grade group 5"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'Gleason grade group system ',
      tumour_grade: 'Grade group 5',
    }),
  ],
  [
    'Grading system set to "Scarff-Bloom-Richardson grading system", tumour grade is "G2"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'Scarff-Bloom-Richardson grading system ',
      tumour_grade: 'G2',
    }),
  ],
  [
    'Grading system set to "Nuclear grading system for DCIS", tumour grade is "G3"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'Nuclear grading system for DCIS ',
      tumour_grade: 'G3',
    }),
  ],
  [
    'Grading system set to "Nuclear grading system for DCIS", tumour grade is just whitespace',
    false,
    loadObjects(specimen, {
      tumour_grading_system: 'Nuclear grading system for DCIS ',
      tumour_grade: '          ',
    }),
  ],
  [
    'Grading system set to "WHO grading system for CNS tumours", tumour grade is "grade Iv"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'WHO grading system for CNS tumours ',
      tumour_grade: 'grade Iv',
    }),
  ],
  [
    'Grading system set to "WHO grading system for CNS tumours", tumour grade is "Grade iII"',
    true,
    loadObjects(specimen, {
      tumour_grading_system: 'WHO grading system for CNS tumours ',
      tumour_grade: 'Grade iII',
    }),
  ],
  [
    'Grading system set to "WHO grading system for CNS tumours", tumour grade is gibberish',
    false,
    loadObjects(specimen, {
      tumour_grading_system: 'WHO grading system for CNS tumours ',
      tumour_grade: 'gibberish!',
    }),
  ],
  [
    'Grading system set to an unexpected value, tumour grade is any text',
    false,
    loadObjects(specimen, {
      tumour_grading_system: 'A possible new entry to the codelist for tumour grading system.',
      tumour_grade: 'any text here',
    }),
  ],
  [
    'Grading system is undefined',
    true,
    loadObjects(specimen, {
      tumour_grade: 'any text here',
    }),
  ],
 // [
 //   'grade is g2 but grading system is undefined',
 //   false,
 //   loadObjects(specimen, {
 //     tumour_grade: 'g2',
 //   }),
 // ],
  [
    'grade system is not one of the valid grading systems',
    false,
    loadObjects(specimen, {
      tumour_grading_system: 'my own grading system',
      tumour_grade: 'g4'
    }),
  ],
 // [
 //   'both grade system and grade are undefined',
 //   false,
 //   loadObjects(specimen, {
 //   }),
 // ],
 // ['both undefined', false, specimen]
  ['both undefined', true, specimen]
];

describe('Common Tests', () => {
  unitTests.forEach(test => {
    const testIndex = 2;
    const testInputs = test[testIndex];
    universalTest(validation(testInputs, name, testInputs[name]));
  });
});

describe('Unit Tests for Tumour Grade', () => {
  test.each(unitTests)(
    '\n Test %# : %s \nExpecting result.valid to be: %s',
    (description, target, inputs) => {
      const scriptOutput = validation(inputs, inputs[name]);
      expect(scriptOutput.valid).toBe(target);
    },
  );
});
