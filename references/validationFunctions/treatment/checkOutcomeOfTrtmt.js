/*
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
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
 * Validates toxicity_type field against outcome_of_treatment (makes sure it's consistent) 
 * @param {object} $row 
 * @param {string} $field 
 * @param {string} $name 
 */
const validation = () => 
  (function validate(inputs) {
      const {$row, $name, $field} = inputs;
      let result = {valid: true, message: "Ok"};
      const NAapplicable = ['treatment completed as prescribed', 'treatment incomplete due to technical or organizational problem', ' treatment incomplete because patient died', 'patient choice (stopped or interrupted treatment)', 'physician decision (stopped or interrupted treatment)', 'treatment stopped due to lack of efficacy (disease progression)', 'other', 'not applicable'];
 
      /* checks for a string just consisting of whitespace */
      const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
      
      if ($field != null && !(checkforEmpty($field))) {
         const toxicityType = $field.trim().toLowerCase();
         if (($row.outcome_of_treatment != null && !(checkforEmpty($row.outcome_of_treatment)))) { 
            const outcomeOfTreatment = $row.outcome_of_treatment.trim().toLowerCase();
            if (outcomeOfTreatment === 'not applicable' && toxicityType != 'not applicable') {
               result = {valid: false, message: `The '${$name}' field can only be submitted as 'Not applicable' if the 'outcome_of_treatment' field is 'Not applicable', or if treatment was terminated for any other reason other than 'Treatment stopped due to acute toxicity'. Confirm the 'outcome_of_treatment' and 'toxicity_type' fields.`};
            }
            else if (outcomeOfTreatment === 'unknown' && toxicityType != 'unknown') {
               result = {valid: false, message: `The '${$name}' field can only be submitted as 'Unknown' if the 'outcome_of_treatment' field is Unknown. Confirm the 'outcome_of_treatment' and 'toxicity_type' fields.`};
            }
            else if (NAapplicable.includes(outcomeOfTreatment) && toxicityType != 'not applicable') {
               result = {valid: false, message: `The '${$name}' field must be submitted as 'Not applicable' if treatment was terminated for any other reason other than 'Treatment stopped due to acute toxicity'. Confirm the 'outcome_of_treatment' and 'toxicity_type' fields.`};
            }
            else if (outcomeOfTreatment === 'treatment stopped due to acute toxicity' && toxicityType === 'not applicable') {
               result = {valid: false, message: `The '${$name}' field is inconsistent (submitted as 'Not applicable') is inconsistent with the 'outcome_of_treatment' field ('Treatment stopped due to acute toxicity'). Confirm the 'outcome_of_treatment' and 'toxicity_type' fields. If toxicity_type is not known, then 'Unknown' should be submitted.`};
            }
         }
         else {
            result = {valid: false, message: `If the 'toxicity_type' field is submitted, then the 'outcome_of_treatment' field must be submitted as well.`}
         }
      }
      return result;
  });

module.exports = validation;
