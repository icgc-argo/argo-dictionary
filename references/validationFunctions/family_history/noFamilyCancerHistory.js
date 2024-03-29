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

/*
 * If 'relative_with_cancer_history` is 'No', then the following fields should not be submitted: age_of_relative_at_diagnosis, 
 *  cancer_type_code_of_relative, relative_survival_time, cause_of_death_of_relative. If these fields are submitted, then 
   'relative_with_cancer_history' should not be left empty (should be submitted as 'Yes')
 */

const validation = () => 
  (function validate(inputs) {
      const {$row, $name, $field} = inputs;
      let result = {valid: true, message: "Ok"};

      const currField = typeof($field) === 'string' ? $field.trim().toLowerCase() : $field;
      if ($row.relative_with_cancer_history != null) {
         const relativeWithCancerHistory = $row.relative_with_cancer_history.trim().toLowerCase();
         if (((relativeWithCancerHistory === "no") || (relativeWithCancerHistory === "unknown")) && currField != null) {
            result = {
               valid: false,
               message: `The '${$name}' field should not be submitted if the 'relative_with_cancer_history' field is '${relativeWithCancerHistory}'`,
            };
         }
      }
      else {
         if (currField || currField != null) {
            result = { valid: false, message: `The 'relative_with_cancer_history' field must be submitted as 'Yes' if the '${$name}' field is submitted.`};
         }
      }
      return result;
  });

module.exports = validation;
