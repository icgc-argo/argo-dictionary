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
 * alcohol_type should only be submitted if donor currently drinks alcohol.
 * alcohol_history should be submitted as 'yes' if donor is currently a daily drinker, social drinker or weekly drinker.
 * If alcohol_consumption_category is daily drinker, social drinker, occassional drinker or weekly drinker, then alcohol_type is required (and vice versa).
 */

const validation = () => 
  (function validate(inputs) {
      const {$row, $name, $field} = inputs;
      let result = {valid: true, message: "Ok"};
      
      // checks for a string just consisting of whitespace
      const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
      const alcoholHistoryYes = ["daily drinker", "social drinker (> once a month, < once a week)", "weekly drinker (>=1x a week)"];
      const exclusionCategories = ["no", "not applicable", "unknown"];
      
      if ($field && $field != null && !(checkforEmpty($field))) {
         const alcoholHistory = $field.trim().toLowerCase() 
         if ($row.alcohol_consumption_category && $row.alcohol_consumption_category != null && !(checkforEmpty($row.alcohol_consumption_category))) {
            const alcoholConsumptionCategory = $row.alcohol_consumption_category.trim().toLowerCase();
            if (exclusionCategories.includes(alcoholHistory) && alcoholHistoryYes.includes(alcoholConsumptionCategory)) {
               result = {valid:false, message: `The 'alcohol_history' field is inconsistent with the 'alcohol_consumption_category' field which indicates the donor is a(n) '${alcoholConsumptionCategory}'. Confirm the 'alcohol_history' and 'alcohol_consumption_category' fields.`};
            }
            else if (alcoholHistory === 'not applicable' && (alcoholConsumptionCategory === 'unknown' || alcoholConsumptionCategory === 'none' || alcoholConsumptionCategory === 'occasional drinker (< once a month)')) {
               result = {valid:false, message: `If the 'alcohol_history' field is not applicable, then the 'alcohol_consumption_category' field must be submitted as 'Not applicable'.`};
            }
            else if (alcoholHistory === 'unknown' && (alcoholConsumptionCategory === 'not applicable' || alcoholConsumptionCategory === 'none' || alcoholConsumptionCategory === 'occasional drinker (< once a month)')) {
               result = {valid:false, message: `If the 'alcohol_history' field is unknown, then the 'alcohol_consumption_category' must be submitted as 'Unknown'.`};
            }
            else if (alcoholHistory === 'no' && alcoholConsumptionCategory === 'unknown') {
               result = {valid:false, message: `If the 'alcohol_history' field is 'No', then the 'alcohol_consumption_category' must be submitted as 'Not applicable' or 'None'.`};
            }
        }
        else if (alcoholHistoryYes.includes(alcoholConsumptionCategory)) {
          result = {valid:false, message: `If the donor is a '${alcoholConsumptionCategory}', then the 'alcohol_history' field must be submitted as 'Yes'.`};
        }
      }
      return result;
  });

module.exports = validation;
