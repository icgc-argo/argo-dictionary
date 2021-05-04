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
 * Validates hemotological_toxicity and non-hemotological_toxicity fields against toxicity_type (makes sure it's consistent) 
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
      
      if ($field != null && !(checkforEmpty($field))) {
         if (($row.toxicity_type != null && !(checkforEmpty($row.toxicity_type)))) { 
            const toxicityType = $row.toxicity_type.trim().toLowerCase();
     
            /* if toxicity_type is non-hemotological, then hemotological_toxicity should not be submitted. If toxicity_type is hemotological, then 'non-hemotological_toxicity' should not be submitted */
            if (toxicityType === 'non-hemotological' && $name === 'hemotological_toxicity') {
               result = { valid: false, message: `The '${$name}' field should not be submitted if 'toxicity_type' is '${toxicityType}'.`};
            }
            else if (toxicityType === 'hemotological' && $name === 'non-hemotological_toxicity') {
               result = { valid: false, message: `The '${name}' field should not be submitted if 'toxicity_type' is '${toxicityType}'.`};
            }
         }
         else {
            result = {valid: false, message: `The 'toxicity_type' field should be submitted if '${$name}' field is submitted.`};
         }
      }
      return result;
  });

module.exports = validation;
