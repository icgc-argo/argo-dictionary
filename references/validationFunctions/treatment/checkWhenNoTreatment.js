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
 * If treatment_type is 'No treatment':
 * - core fields accepting text should be submitted as 'Not applicable' 
 * - core fields accepting numbers should be left empty
 * - if Extended field that accepts text is submitted, it should be submitted as 'Not applicable'. 
 */

const validation = () => 
  (function validate(inputs) {
      const {$row, $name, $field} = inputs;
      let result = {valid: true, message: "Ok"};
      const coreNumberFields = ['treatment_start_interval', 'treatment_duration']
      const coreTextFields = ['is_primary_treatment', 'treatment_intent', 'treatment_setting', 'response_to_treatment']
 
      // checks for a string just consisting of whitespace
      const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
      const treatmentType = ($row.treatment_type).map(value => value.toLowerCase());
       
      if ((!(treatmentType.includes("no treatment"))) && (coreTextFields.includes($name) || coreNumberFields.includes($name))) {
        if (!$field || $field === null || checkforEmpty($field)) {
          result = { valid: false, message: `The '${$name}' field must be submitted when the 'treatment_type' field is '${treatmentType}'`};
        }
        else {
          if (coreTextFields.includes($name) && $field.trim().toLowerCase() === 'not applicable') {
            result = { valid: false, message: `The '${$name}' field cannot be submitted as 'Not applicable' if the 'treatment_type' field is '${treatmentType}'`};
          }
        }
      }
      else if (treatmentType.includes("no treatment")) {
        if ($field && $field != null && !(checkforEmpty($field))) {
          if (coreNumberFields.includes($name) || typeof($field) === 'number') {
            result = { valid: false, message: `The '${$name}' field cannot be submitted if the 'treatment_type' field is '${treatmentType}'`};
          }
          else if ((coreTextFields.includes($name) || typeof($field) === 'string') && $field.trim().toLowerCase() != 'not applicable') {
            result = { valid: false, message: `If '${$name}' field is submitted when the 'treatment_type' field is '${treatmentType}', it can only be submitted as 'Not applicable'.`};
          }
        }
      }
      return result;
  });

module.exports = validation;
