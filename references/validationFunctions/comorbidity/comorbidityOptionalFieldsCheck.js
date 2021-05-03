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

/* age_at_comorbidity_diagnosis, comorbidity_treatment_status and comorbidity_treatment should not be submitted if prior_malignancy is not submitted or is no/unknown AND comorbidity_type_code is also empty
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
      optionalFields = ["age_at_comorbidity_diagnosis", "comorbidity_treatment_status", "comorbidity_treatment"];
   
      if (optionalFields.includes($name) && (currField || (!(checkforEmpty(currField))))) {
         if (($row.comorbidity_type_code === null || checkforEmpty($row.comorbidity_type_code))) {
            result = { valid: false, message: `The '${$name}' field should not be submitted if the 'comorbidity_type_code' field is not submitted.`};
         }
         if ($name === "comorbidity_treatment" && currField && !(checkforEmpty(currField))) {
            if ($row.comorbidity_treatment_status === null || checkforEmpty($row.comorbidity_treatment_status)) {
               result = { valid: false, message: `The 'comorbidity_treatment_status' field should be submitted as 'Yes' if '${$name}' field is submitted.`};
            }
            else if (invalidTypes.includes($row.comorbidity_treatment_status.trim().toLowerCase())) {
               result = { valid: false, message: `The '${$name}' field should not be submitted if the 'comorbidity_treatment_status' field is not 'Yes'.`};
            }
         }
     }
     return result;
  });

module.exports = validation;
