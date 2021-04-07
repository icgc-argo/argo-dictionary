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
 * Validates line_of_treatment field 
 * @param {object} $row 
 * @param {string} $field 
 * @param {string} $name 
 */
const validation = () => 
  (function validate(inputs) {
      const {$row, $name, $field} = inputs;
      let result = {valid: true, message: "Ok"};
      
      const isPrimaryTreatment = $row.is_primary_treatment.trim().toLowerCase();

      // checks for a string just consisting of whitespace
      const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
     
      // if treatment is the primary treatment, then line_of_treatment should not be submitted. 
      if (isPrimaryTreatment === 'yes' && (!(checkforEmpty($field)))) {
         result = { valid: false, message: `The '${name}' field should not be submitted if this treatment is the primary treatment.`};
      }
      // if is_primary_treatment is no or unknown, line_of_treatment cannot be '1' and must be a value greater than 0
      else if (isPrimaryTreatment === 'no' || isPrimaryTreatment === 'unknown' && (!(checkforEmpty($field)))) {
         if ($field == 1) {
            result = { valid: false, message: `The ${name}' field cannot be submitted as '1' if this treatment is not the primary treatment.`};
         }
         else if (parseInt($field) <= 0) {
            result = { valid: false, message: `The '${name}' field must be a value greater than 0`};
         }
      }
      return result;
  });

module.exports = validation;
