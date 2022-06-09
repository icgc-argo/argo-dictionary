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
 * exercise_frequency cannot be submitted as 'never' if excercise_intensity is submitted.
 */

const validation = () => 
  (function validate(inputs) {
      const {$row, $name, $field} = inputs;
      let result = {valid: true, message: "Ok"};
      
      // checks for a string just consisting of whitespace
      const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
         //const exerciseFreq = $row.exercise_frequency.trim().toLowerCase();
     
      if ($field && $field != null && !(checkforEmpty($field))) {
        const exerciseIntensity = $field.trim().toLowerCase();
        if ($row.exercise_frequency && $row.exercise_frequency != null && !(checkforEmpty($row.exercise_frequency))) {
          const exerciseFreq = $row.exercise_frequency.trim().toLowerCase();
          if (exerciseIntensity === 'not applicable' && exerciseFreq != 'not applicable') {
            result = {valid: false, message: `If the 'exercise_intensity' field is submitted as 'Not applicable', then the 'exercise_frequency' field must be submitted as 'Not applicable' as well. Please correct your data submission.`};
          }
          else if (exerciseIntensity === 'unknown' && exerciseFreq === 'not applicable') {
            result = {valid: false, message: `If the 'exercise_intensity' field is submitted as 'Unknown', then the 'exercise_frequency' field must be submitted as 'Unknown' as well. Please correct your data submission.`};
          }
          else if ((exerciseIntensity != 'unknown' || exerciseIntensity != 'not applicable') && (exerciseFreq === 'never')) {
            result = {valid: false, message: `The 'exercise_intensity' field (submitted as '${$field}') is inconsistent with the 'exercise_frequency': 'Never'. Please correct your data submission.`};
          }
        }
        else { 
          result = {valid: false, message: `If the '${$name}' field is submitted, then the 'exercise_frequency' field is required as well.`};
        }
      }
      else if ($row.exercise_frequency && $row.exercise_frequency != null && !(checkforEmpty($row.exercise_frequency))) {
         result = {valid:false, message: `If the 'exercise_frequency' field is submitted, then the '${$name}' field must be submitted as well.`}
      }
      return result;
  });

module.exports = validation;
