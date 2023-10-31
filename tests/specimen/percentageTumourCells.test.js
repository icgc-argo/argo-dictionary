/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
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

const validation = require('./../../references/validationFunctions/specimen/percentageTumourCells.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const specimen = require('../constructDummyData').getSchemaDummy('specimen');

// the name of the field being validateds
const name = 'percent_tumour_cells';

const unitTests = [
  [
    'A percentage of tumour cells is given, and a measurement method is given too',
    true,
    loadObjects(specimen, {
      percent_tumour_cells: 0.5,
      percent_tumour_cells_measurement_method: 'Genomics',
    }),
  ],
  [
    'A percentage of tumour cells is given, and a measurement method does not apply',
    false,
    loadObjects(specimen, {
      percent_tumour_cells: 0.5,
      percent_tumour_cells_measurement_method: 'Not applicable',
    }),
  ],
  [
    'A percentage of tumour cells is given, and a measurement method is missing',
    true,
    loadObjects(specimen, {
      percent_tumour_cells: 0.5,
    }),
  ],
  [
    'A percentage of tumour cells is missing, and a measurement method is given too',
    true,
    loadObjects(specimen, {
      percent_tumour_cells_measurement_method: 'Image analysis',
    }),
  ],
  [
    'A percentage of tumour cells is missing, and a measurement method does not apply',
    true,
    loadObjects(specimen, {
      percent_tumour_cells_measurement_method: 'Not applicable',
    }),
  ],
  ['Both fields are undefined', true, specimen]
];

describe('Common Tests', () => {
  unitTests.forEach(([description, expected, testInputs]) => {
    universalTest(validation()({ $row: testInputs, $name: name, $field: testInputs[name]}));
  });
});

describe('Unit Tests for Tumour Grade', () => {
  test.each(unitTests)(
    '\n Test %# : %s \nExpecting result.valid to be: %s',
    (description, target, inputs) => {
      const scriptOutput = validation()({ $row: inputs, $field: inputs[name], $name: name});
      expect(scriptOutput.valid).toBe(target);
    },
  );
});
