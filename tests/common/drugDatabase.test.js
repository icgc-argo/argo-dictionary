/*
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
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

const validation = require('./../../references/validationFunctions/common/drugDatabase.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const dummy = require('../constructDummyData');
const chemotherapy = require('../constructDummyData').getSchemaDummy('chemotherapy');
const immunotherapy = require('../constructDummyData').getSchemaDummy('immunotherapy');
const hormone_therapy = require('../constructDummyData').getSchemaDummy('hormone_therapy');
// the name of the field being validateds

const unitTests = {
 'Chemotherapy': [
  [
    'drug_rxnormcui & drug_name are provided, drug_database, drug_id, drug_term are blank.',
    true,
    {
      row: loadObjects(chemotherapy, {
        drug_rxnormcui: '6313',
        drug_name: 'leucovorin',
        drug_database: ' ',
        drug_id: undefined,
        drug_term: null
      }),
      name: 'drug_rxnormcui',
    },
  ],
  [
    'drug_rxnormcui & drug_name are not provided, drug_database, drug_id, drug_term are provided.',
    true,
    {
      row: loadObjects(chemotherapy, {
        drug_rxnormcui: '',
        drug_name: ' ',
        drug_database: 'KEGG',
        drug_id: '123',
        drug_term: 'test'
      }),
      name: 'drug_rxnormcui',
    },
  ],
  [
    'drug_rxnormcui is provided, drug_name is blank.',
    false,
    {
      row: loadObjects(chemotherapy, {
        drug_rxnormcui: '6313',
        drug_name: ''
      }),
      name: 'drug_rxnormcui',
    },
  ],
  [
    'drug_rxnormcui is not provided, drug_name is not blank.',
    false,
    {
      row: loadObjects(chemotherapy, {
        drug_rxnormcui: ' ',
        drug_name: 'leucovorin'
      }),
      name: 'drug_rxnormcui',
    },
  ],
  [
    'drug_rxnormcui & drug_name are provided, drug_database, drug_id, drug_term are not blank.',
    false,
    {
      row: loadObjects(chemotherapy, {
        drug_rxnormcui: '6313',
        drug_name: 'leucovorin',
        drug_database: 'KEGG',
        drug_id: '123',
        drug_term: 'S-1'
      }),
      name: 'drug_rxnormcui',
    },
  ],
  [
    'drug_rxnormcui is provided, drug_name is blank.',
    false,
    {
      row: loadObjects(chemotherapy, {
        drug_rxnormcui: '6313',
        drug_name: ''
      }),
      name: 'drug_name',
    },
  ],
  [
    'drug_rxnormcui is not provided, drug_name is not blank.',
    false,
    {
      row: loadObjects(chemotherapy, {
        drug_rxnormcui: ' ',
        drug_name: 'leucovorin'
      }),
      name: 'drug_name',
    },
  ],
  [
    'drug_rxnormcui & drug_name are provided, drug_database, drug_id, drug_term are not blank.',
    false,
    {
      row: loadObjects(chemotherapy, {
        drug_rxnormcui: '6313',
        drug_name: 'leucovorin',
        drug_database: 'KEGG',
        drug_id: '123',
        drug_term: 'S-1'
      }),
      name: 'drug_database',
    },
  ],
  [
    'drug_rxnormcui & drug_name are not provided, drug_database, drug_id, drug_term are blank.',
    false,
    {
      row: loadObjects(chemotherapy, {
        drug_rxnormcui: '',
        drug_name: ' ',
        drug_database: ''
      }),
      name: 'drug_database',
    },
  ],
  [
    'drug_rxnormcui & drug_name are provided, drug_database, drug_id, drug_term are not blank.',
    false,
    {
      row: loadObjects(chemotherapy, {
        drug_rxnormcui: '6313',
        drug_name: 'leucovorin',
        drug_database: 'KEGG',
        drug_id: '123',
        drug_term: 'S-1'
      }),
      name: 'drug_id',
    },
  ],
  [
    'drug_rxnormcui & drug_name are provided, drug_database, drug_id, drug_term are not blank.',
    false,
    {
      row: loadObjects(chemotherapy, {
        drug_rxnormcui: null,
        drug_name: ' ',
        drug_id: ' '
      }),
      name: 'drug_id',
    },
  ],
  [
    'drug_rxnormcui & drug_name are provided, drug_database, drug_id, drug_term are not blank.',
    false,
    {
      row: loadObjects(chemotherapy, {
        drug_rxnormcui: '6313',
        drug_name: 'leucovorin',
        drug_database: 'KEGG',
        drug_id: '123',
        drug_term: 'S-1'
      }),
      name: 'drug_term',
    },
  ],
  [
    'drug_rxnormcui & drug_name are not provided, drug_database, drug_id, drug_term are blank.',
    false,
    {
      row: loadObjects(chemotherapy, {
        drug_rxnormcui: '',
        drug_name: '',
        drug_term: null
      }),
      name: 'drug_term',
    },
  ]
 ],
 'Hormone Therapy': [
  [
    'drug_rxnormcui & drug_name are provided, drug_database, drug_id, drug_term are blank.',
    true,
    {
      row: loadObjects(hormone_therapy, {
        drug_rxnormcui: '6313',
        drug_name: 'leucovorin',
        drug_database: null,
        drug_id: ' ',
        drug_term: ''
      }),
      name: 'drug_rxnormcui',
    },
  ],
  [
    'drug_rxnormcui & drug_name are not provided, drug_database, drug_id, drug_term are provided.',
    true,
    {
      row: loadObjects(hormone_therapy, {
        drug_rxnormcui: '',
        drug_name: ' ',
        drug_database: 'KEGG',
        drug_id: '123',
        drug_term: 'test'
      }),
      name: 'drug_rxnormcui',
    },
  ],
  [
    'drug_rxnormcui is provided, drug_name is blank.',
    false,
    {
      row: loadObjects(hormone_therapy, {
        drug_rxnormcui: '6313',
        drug_name: ''
      }),
      name: 'drug_rxnormcui',
    },
  ],
  [
    'drug_rxnormcui is not provided, drug_name is not blank.',
    false,
    {
      row: loadObjects(hormone_therapy, {
        drug_rxnormcui: ' ',
        drug_name: 'leucovorin'
      }),
      name: 'drug_rxnormcui',
    },
  ],
  [
    'drug_rxnormcui & drug_name are provided, drug_database, drug_id, drug_term are not blank.',
    false,
    {
      row: loadObjects(hormone_therapy, {
        drug_rxnormcui: '6313',
        drug_name: 'leucovorin',
        drug_database: 'KEGG',
        drug_id: '123',
        drug_term: 'S-1'
      }),
      name: 'drug_rxnormcui',
    },
  ],
  [
    'drug_rxnormcui is provided, drug_name is blank.',
    false,
    {
      row: loadObjects(hormone_therapy, {
        drug_rxnormcui: '6313',
        drug_name: ''
      }),
      name: 'drug_name',
    },
  ],
  [
    'drug_rxnormcui is not provided, drug_name is not blank.',
    false,
    {
      row: loadObjects(hormone_therapy, {
        drug_rxnormcui: ' ',
        drug_name: 'leucovorin'
      }),
      name: 'drug_name',
    },
  ],
  [
    'drug_rxnormcui & drug_name are provided, drug_database, drug_id, drug_term are not blank.',
    false,
    {
      row: loadObjects(hormone_therapy, {
        drug_rxnormcui: '6313',
        drug_name: 'leucovorin',
        drug_database: 'KEGG',
        drug_id: '123',
        drug_term: 'S-1'
      }),
      name: 'drug_database',
    },
  ],
  [
    'drug_rxnormcui & drug_name are not provided, drug_database, drug_id, drug_term are blank.',
    false,
    {
      row: loadObjects(hormone_therapy, {
        drug_rxnormcui: '',
        drug_name: ' ',
        drug_database: ''
      }),
      name: 'drug_database',
    },
  ],
  [
    'drug_rxnormcui & drug_name are provided, drug_database, drug_id, drug_term are not blank.',
    false,
    {
      row: loadObjects(hormone_therapy, {
        drug_rxnormcui: '6313',
        drug_name: 'leucovorin',
        drug_database: 'KEGG',
        drug_id: '123',
        drug_term: 'S-1'
      }),
      name: 'drug_id',
    },
  ],
  [
    'drug_rxnormcui & drug_name are not provided, drug_database, drug_id, drug_term are blank.',
    false,
    {
      row: loadObjects(hormone_therapy, {
        drug_rxnormcui: null,
        drug_name: ' ',
        drug_id: ' '
      }),
      name: 'drug_id',
    },
  ],
  [
    'drug_rxnormcui & drug_name are provided, drug_database, drug_id, drug_term are not blank.',
    false,
    {
      row: loadObjects(hormone_therapy, {
        drug_rxnormcui: '6313',
        drug_name: 'leucovorin',
        drug_database: 'KEGG',
        drug_id: '123',
        drug_term: 'S-1'
      }),
      name: 'drug_term',
    },
  ],
  [
    'drug_rxnormcui & drug_name are not provided, drug_database, drug_id, drug_term are blank.',
    false,
    {
      row: loadObjects(hormone_therapy, {
        drug_rxnormcui: '',
        drug_name: '',
        drug_term: null
      }),
      name: 'drug_term',
    },
  ]
 ],
 'Immunotherapy': [
  [
    'drug_rxnormcui & drug_name are provided, drug_database, drug_id, drug_term are blank.',
    true,
    {
      row: loadObjects(immunotherapy, {
        drug_rxnormcui: '6313',
        drug_name: 'leucovorin',
        drug_database: null,
        drug_id: ' ',
        drug_term: ''
      }),
      name: 'drug_rxnormcui',
    },
  ],
  [
    'drug_rxnormcui & drug_name are not provided, drug_database, drug_id, drug_term are provided.',
    true,
    {
      row: loadObjects(immunotherapy, {
        drug_rxnormcui: '',
        drug_name: ' ',
        drug_database: 'KEGG',
        drug_id: '123',
        drug_term: 'test'
      }),
      name: 'drug_rxnormcui',
    },
  ],
  [
    'drug_rxnormcui is provided, drug_name is blank.',
    false,
    {
      row: loadObjects(immunotherapy, {
        drug_rxnormcui: '6313',
        drug_name: ''
      }),
      name: 'drug_rxnormcui',
    },
  ],
  [
    'drug_rxnormcui is not provided, drug_name is not blank.',
    false,
    {
      row: loadObjects(immunotherapy, {
        drug_rxnormcui: ' ',
        drug_name: 'leucovorin'
      }),
      name: 'drug_rxnormcui',
    },
  ],
  [
    'drug_rxnormcui & drug_name are provided, drug_database, drug_id, drug_term are not blank.',
    false,
    {
      row: loadObjects(immunotherapy, {
        drug_rxnormcui: '6313',
        drug_name: 'leucovorin',
        drug_database: 'KEGG',
        drug_id: '123',
        drug_term: 'S-1'
      }),
      name: 'drug_rxnormcui',
    },
  ],
  [
    'drug_rxnormcui is provided, drug_name is blank.',
    false,
    {
      row: loadObjects(immunotherapy, {
        drug_rxnormcui: '6313',
        drug_name: ''
      }),
      name: 'drug_name',
    },
  ],
  [
    'drug_rxnormcui is not provided, drug_name is not blank.',
    false,
    {
      row: loadObjects(immunotherapy, {
        drug_rxnormcui: ' ',
        drug_name: 'leucovorin'
      }),
      name: 'drug_name',
    },
  ],
  [
    'drug_rxnormcui & drug_name are provided, drug_database, drug_id, drug_term are not blank.',
    false,
    {
      row: loadObjects(immunotherapy, {
        drug_rxnormcui: '6313',
        drug_name: 'leucovorin',
        drug_database: 'KEGG',
        drug_id: '123',
        drug_term: 'S-1'
      }),
      name: 'drug_database',
    },
  ],
  [
    'drug_rxnormcui & drug_name are not provided, drug_database, drug_id, drug_term are blank.',
    false,
    {
      row: loadObjects(immunotherapy, {
        drug_rxnormcui: '',
        drug_name: ' ',
        drug_database: ''
      }),
      name: 'drug_database',
    },
  ],
  [
    'drug_rxnormcui & drug_name are provided, drug_database, drug_id, drug_term are not blank.',
    false,
    {
      row: loadObjects(immunotherapy, {
        drug_rxnormcui: '6313',
        drug_name: 'leucovorin',
        drug_database: 'KEGG',
        drug_id: '123',
        drug_term: 'S-1'
      }),
      name: 'drug_id',
    },
  ],
  [
    'drug_rxnormcui & drug_name are not provided, drug_database, drug_id, drug_term are blank.',
    false,
    {
      row: loadObjects(immunotherapy, {
        drug_rxnormcui: null,
        drug_name: ' ',
        drug_id: ' '
      }),
      name: 'drug_id',
    },
  ],
  [
    'drug_rxnormcui & drug_name are provided, drug_database, drug_id, drug_term are not blank.',
    false,
    {
      row: loadObjects(immunotherapy, {
        drug_rxnormcui: '6313',
        drug_name: 'leucovorin',
        drug_database: 'KEGG',
        drug_id: '123',
        drug_term: 'S-1'
      }),
      name: 'drug_term',
    },
  ],
  [
    'drug_rxnormcui & drug_name are not provided, drug_database, drug_id, drug_term are blank.',
    false,
    {
      row: loadObjects(immunotherapy, {
        drug_rxnormcui: '',
        drug_name: '',
        drug_term: null
      }),
      name: 'drug_term',
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


describe('Unit Tests for Drug Database script', () => {
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
          const scriptOutput = validation()({ $row: inputs.row, $name: inputs.name, $field: inputs.row[inputs.name]});

          expect(scriptOutput.valid).toBe(target);
        },
      );
    });
  });
});
