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
 * Tobacco_type should only be submitted if donor has a history of smoking. Tobacco_type is required if donor has history of smoking.
 */

const validation = () => 
  (function validate(inputs) {
      const {$row, $name, $field} = inputs;
      let result = {valid: true, message: "Ok"};
      const smokerCategories = ['current reformed smoker for <= 15 years', 'current reformed smoker for > 15 years', 'current reformed smoker, duration not specified', 'current smoker'];
      // checks for a string just consisting of whitespace
      const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};

      // check tobacco related fields
      if ($name === 'tobacco_type') {
         if ($row.tobacco_type != null && !(checkforEmpty($row.tobacco_type))) {
            const tobaccoType = ($row.tobacco_type).map(value => value.toLowerCase());
            if (!$row.tobacco_smoking_status || checkforEmpty($row.tobacco_smoking_status) || $row.tobacco_smoking_status === null) {
               result = { valid: false, message: `If '${$name}' is submitted, then the 'tobacco_smoking_status' field is required.`}
            }
            else {
               const smokingStatus = $row.tobacco_smoking_status.trim().toLowerCase();
               if (smokerCategories.includes(smokingStatus) && tobaccoType.includes('not applicable')) {
                  result = {valid: false, message: `If the 'tobacco_smoking_status' field is '${smokingStatus}', then the '${$name}' field cannot be submitted as 'Not applicable'. Indicate type(s) of tobacco smoked or submit 'Unknown'.`};
               }
               else if (smokingStatus  === 'smoking history not documented' && !(tobaccoType.includes('unknown'))) {
                  result = {valid: false, message: `If the 'tobacco_smoking_status' field is submitted as '${smokingStatus}', then the '${$name}' field must be submitted as 'Unknown'.`};
               }
               else if (smokingStatus === 'lifelong non-smoker (<100 cigarettes smoked in lifetime)' && !(tobaccoType.includes('not applicable'))) {
                  result = { valid: false, message: `If donor is a lifelong non-smoker, then the '${$name}' field should be submitted as 'Not applicable'.`}
               }
               else if (smokingStatus === 'not applicable' && !(tobaccoType.includes('not applicable'))) {
                  result = { valid: false, message: `If donor's smoking history is not applicable, then the '${$name}' field should be submitted as 'Not applicable'.`}
               }
            }
         }
         else {
            if ($row.tobacco_smoking_status != null && !(checkforEmpty($row.tobacco_smoking_status))) {
               if (smokerCategories.includes($row.tobacco_smoking_status.trim().toLowerCase())) {
                  result = { valid: false, message: `The '${$name}' field is required if donor is or was a smoker.`}
               }
            }
         }
      }
      else if ($name === 'pack_years_smoked' && $row.pack_years_smoked != null && !(checkforEmpty($row.pack_years_smoked))) {
        if ((!$row.tobacco_smoking_status || $row.tobacco_smoking_status === null || (!smokerCategories.includes($row.tobacco_smoking_status.trim().toLowerCase()))) && ($row.pack_years_smoked != null || !(checkforEmpty($row.pack_years_smoked)))) {
           result = {valid: false, message: `The '${$name}' field should not be submitted if donor does not have a history of smoking.`}
        }
     }
     return result;
  });

module.exports = validation;
