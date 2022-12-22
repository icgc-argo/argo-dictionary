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
 * Validates line_of_treatment and makes sure it's consistent with 'is_primary_treatment' field 
 * @param {object} $row 
 * @param {string} $field 
 * @param {string} $name 
 */
const validation = () => 
  (function validate(inputs) {
      const {$row, $name, $field} = inputs;
      let result = {valid: true, message: "Ok"};

      /* checks for a string just consisting of whitespace */
      const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
     
      if (($field != null && (!(checkforEmpty($field)))) && ($row.is_primary_treatment != null && !(checkforEmpty($row.is_primary_treatment)))) {
         const isPrimaryTreatment = $row.is_primary_treatment.trim().toLowerCase();
         /* if treatment is the primary treatment, then line_of_treatment should not be submitted. */
         if (isPrimaryTreatment === 'yes') {
            result = { valid: false, message: `The '${$name}' field should not be submitted if this treatment is the primary treatment.`};
         }
         /* if treatment is not primary treatment, then line_of_treatment must be greater than 1 */
         else if (isPrimaryTreatment === 'no' && parseInt($field) <= 1) {
            result = { valid: false, message: `The '${$name}' field must be a value greater than 1`};
         }
         /* if it is unknown whether treatment was primary treatment, then line_of_treatment should not be submitted. If it is, then primary_treatment should be 'no' */
         else if (isPrimaryTreatment === 'not applicable') {
            result = { valid: false, message: `The '${$name}' field should not be submitted if 'is_primary_treatment' is 'Not applicable'.`};
         }
      }
      return result;
  });

module.exports = validation;
