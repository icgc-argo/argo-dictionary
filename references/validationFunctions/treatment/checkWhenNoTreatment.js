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
 * If treatment_type is 'No treatment', the other core treatment fields should not be submitted. 
 * Ensure interval/duration fields are greater than 0 days
 */

const validation = () => 
  (function validate(inputs) {
      const {$row, $name, $field} = inputs;
      let result = {valid: true, message: "Ok"};
      const coreFields = ['is_primary_treatment', 'treatment_start_interval', 'treatment_duration', 'treatment_intent', 'treatment_setting', 'response_to_treatment_criteria_method'];
 
      // checks for a string just consisting of whitespace
      const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};

      if ($row.treatment_type != null) {
         const treatmentType = $row.treatment_type;
         if (!(treatmentType.includes("No treatment"))) {
            if (coreFields.includes($name)) {
               if (!$field || checkforEmpty($field)) {
                  result = {
                     valid: false,
                     message: `The '${$name}' field must be submitted when 'treatment_type' is '${treatmentType}'`,
                  };
               }
            }
         }
         else if (treatmentType.includes("No treatment") && ($field)) {
            result = {
               valid: false,
               message: `The '${$name}' field should not be submitted if 'treatment_type' is set to '${treatmentType}'`,
            };
         }
      }
      return result;
  });

module.exports = validation;
