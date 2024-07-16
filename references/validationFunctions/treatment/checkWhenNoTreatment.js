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

/**
 * If treatment_type is 'No treatment' or 'Unknown', core treatment fields should not be submitted.
 */

const validation = () =>
    (function validate(inputs) {
        const { $row, $name, $field } = inputs;
        const result = { valid: true, message: 'Ok' };

        const arrayItemsInSecondArray = (arr1, arr2) => {
            return arr2.some(arr2Item => {
                return arr1.includes(arr2Item);
            });
        };

        const coreFields = [
            'treatment_start_interval',
            'treatment_duration',
            'is_primary_treatment',
            'treatment_intent',
            'treatment_setting',
            'response_to_treatment_criteria_method',
            'response_to_treatment',
        ];

        const treatmentExceptionTypes = ['no treatment', 'unknown'];

        // checks for a string just consisting of whitespace
        const checkforEmpty = entry => {
            return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'));
        };
        const treatmentTypes = $row.treatment_type.map(value => value.toLowerCase());

        const recordHasTreatments = !arrayItemsInSecondArray(
            treatmentExceptionTypes,
            treatmentTypes,
        );

        if (recordHasTreatments) {
            if (
                coreFields.includes($name) &&
                (!$field || $field === null || checkforEmpty($field))
            ) {
                return {
                    valid: false,
                    message: `The '${$name}' field must be submitted when the 'treatment_type' field is '${treatmentTypes}'`,
                };
            }

        } else if ($field && $field != null && !checkforEmpty($field)) {
            if (
                coreFields.includes($name) ||
                (typeof $field === 'string' && $field.trim().toLowerCase() != 'not applicable') ||
                typeof $field === 'number'
            ) {
                return {
                    valid: false,
                    message: `The '${$name}' field cannot be submitted if the 'treatment_type' field is '${treatmentTypes}'`,
                };
            }
        }
        return result;
    });

module.exports = validation;
