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
 * Validates that T, N, M values are non empty if staging system field is set to an AJCC value
 *
 * @param {Object} $row The object representing the row for a donor. Object keys represent the fields.
 * @param {String} $name The name of the field this validation function runs on.
 * @param {String} $field The value for the field.
 */
const validation = ($row, $name, $field) =>
  (function validate() {
    let result = { valid: true, message: 'Ok' };
    const arrayFormatter = arr => `\n${arr.map(entry => `- "${entry}"`).join('\n')}`;
    /* This is not a required field, so first ensure that it exists */
    if ($field) {
      /* Contingent on the naming system for tumour staging systems to remain consistent */
      const stagingName = $name
        .trim()
        .toLowerCase()
        .split('_tumour_staging_system')[0];
      const requiredFields = [
        `${stagingName}_m_category`,
        `${stagingName}_n_category`,
        `${stagingName}_t_category`,
      ];
      const convertedRow = Object.fromEntries(
        Object.entries($row).map(([fieldName, fieldVal]) => [fieldName.toLowerCase(), fieldVal]),
      );
      /* Check for contigous spaces wrapped with quotes (empty strings) */
      const checkforEmpty = entry => {
        return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'));
      };

      /* search for fields with falsy values*/
      const emptyFields = requiredFields.filter(
        field => !convertedRow[field] || checkforEmpty(convertedRow[field]),
      );

      /* The fields should be provided IF and ONLY IF the AJCC regex passes */
      if (/^(AJCC)\b/i.test($field) && emptyFields.length) {
        result = {
          valid: false,
          message: `The following fields are required when ${$name} is set to an AJCC option: ${arrayFormatter(
            emptyFields,
          )}`,
        };
      } else if (!/^(AJCC)\b/i.test($field) && emptyFields.length != requiredFields.length) {
        const errorFields = requiredFields.filter(fieldName => !emptyFields.includes(fieldName));
        result = {
          valid: false,
          message: `The following fields cannot be provided when ${$name} is not set to an AJCC option: ${arrayFormatter(
            errorFields,
          )}`,
        };
      }
    }
    return result;
  })();

module.exports = validation;
