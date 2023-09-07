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

const validation = require('../../references/validationFunctions/common/submitterIdRegex.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

const sampleReg = require('../constructDummyData').getSchemaDummy('sample_registration');

const allUnitTests = {
  submitter_donor_id: [
    [
      'Submitter Donor Id does not contain invalid characters',
      false,
      {
        row: loadObjects(sampleReg, {
          submitter_donor_id: 'S1529515-1B, 1D',
        }),
        name: 'submitter_donor_id',
      },
    ],
    [
      'Valid Submitter Donor Id matches Regex',
      true,
      {
        row: loadObjects(sampleReg, {
          submitter_donor_id: 'ICGC_0400',
        }),
        name: 'submitter_donor_id',
      },
    ],
  ],
};

describe('Common Tests', () => {
  Object.entries(allUnitTests).forEach(field => {
    const name = field[0];
    const unitTests = field[1];
    unitTests.forEach(test => {
      const testIndex = 2;
      const testInputs = test[testIndex];
      universalTest(validation()({ $row: testInputs, $name: name, $field: testInputs[name] }));
    });
  });
});

describe('Unit Tests for Ensure Deceased', () => {
  Object.entries(allUnitTests).forEach(field => {
    const name = field[0];
    const unitTests = field[1];
    describe(`Tests for the ${name} field.`, () => {
      test.each(unitTests)(
        '\n Test %# : %s \nExpecting result.valid to be: %s',
        (description, target, inputs) => {
          const scriptOutput = validation()({ $row: inputs, $field: inputs[name], $name: name });
          expect(scriptOutput.valid).toBe(target);
        },
      );
    });
  });
});
