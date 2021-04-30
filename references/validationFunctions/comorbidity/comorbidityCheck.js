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

/* laterality_of_prior_malignancy should not be submitted if prior_malignancy is not submitted or is no/unknown.
 * age_at_comorbidity_diagnosis, comorbidity_treatment_status and comorbidity_treatment should not be submitted if prior_malignancy is not submitted or is no/unknown AND comorbidity_type_code is also empty
 * comorbidity_treatment_status should be submitted as Yes if comorbidity_treatment is submitted. If comorbidity_treatment_status is no/unknown, then comorbidity_treatment should not be submitted.
 */

const validation = () => 
  (function validate(inputs) {
      const {$row, $name, $field} = inputs;
      let result = {valid: true, message: "Ok"};

      const currField = typeof($field) === 'string' ? $field.trim().toLowerCase() : $field;
      
      /* checks for a string just consisting of whitespace */
      const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
      const invalidTypes = ["no", "unknown"]
   
      if ($name === "laterality_of_prior_malignancy") {
         if (($row.prior_malignancy === null || invalidTypes.includes($row.prior_malignancy.trim().toLowerCase())) && (currField || (!(checkforEmpty(currField))!= null))) {
            result = {
               valid: false,
               message: `The '${$name}' field should not be submitted if the 'prior_malignancy' field is left empty or is submitted as 'No' or 'Unknown'.`
            };
         }
      }
      else if (($name === "age_at_comorbidity_diagnosis" || $name === "comorbidity_treatment_status" || $name === "comorbidity_treatment") && (currField || (!(checkforEmpty(currField))))) {
         if (($row.prior_malignancy === null || invalidTypes.includes($row.prior_malignancy.trim().toLowerCase())) && ($row.comorbidity_type_code === null || checkforEmpty($row.comorbidity_type_code))) {
            result = { valid: false, message: `The '${$name}' field should not be submitted if 'prior_malignancy' is not 'Yes' and/or 'comorbidity_type_code' is not submitted.`};
         }
      }
      if ($row.comorbidity_treatment_status && ($name === "comorbidity_treatment") && (currField || (!(checkforEmpty(currField))))) {
         if (invalidTypes.includes($row.comorbidity_treatment_status.trim().toLowerCase())) {
            result = { valid: false, message: `The '${$name}' field should not be submitted if the 'comorbidity_treatment_status' field is not 'Yes'.`};
         }
         else if ($row.comorbidity_treatment_status.trim().toLowerCase() === null) {
            result = { valid: false, message: `The 'comorbidity_treatment_status' field should be submitted as 'Yes' if '${$name}' field is submitted.`};
        }
     }
     return result;
  });

module.exports = validation;
