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
      const requiresAlcoholType = ["daily drinker", "occasional drinker (< once a month)", "social drinker (> once a month, < once a week)", "weekly drinker (>=1x a week)"];
    
      if ($row.alcohol_consumption_category && $row.alcohol_consumption_category != null && !(checkforEmpty($row.alcohol_consumption_category))) {
         alcoholConsumptionCategory = $row.alcohol_consumption_category.trim().toLowerCase();
         if ($field && $field != null && !(checkforEmpty($field))) {
            const alcoholType = ($field).map(value => value.toLowerCase());
            if (alcoholConsumptionCategory === 'none' && !(alcoholType.includes('unknown')) && !(alcoholType.includes('not applicable'))) {
               result = {valid:false, message: `The 'alcohol_consumption_category' field is submitted as 'None' and is inconsistent with the '${$name}' field which indicates the donor consumed '${alcoholType}'. If donor did not consume alcohol, then the '${$name}' field should be submitted as 'Not applicable'. Otherwise, please confirm the 'alcohol_consumption_category' field.`};
            }
            else if (alcoholConsumptionCategory === 'not applicable' && !(alcoholType.includes('not applicable'))) {
               result = {valid:false, message: `If the 'alcohol_consumption_category' is submitted as 'Not applicable', then the '${$name}' field must be submitted as 'Not applicable'.`};
            }
            else if (alcoholConsumptionCategory === 'unknown' && !(alcoholType.includes('unknown'))) {
               result = {valid:false, message: `If the 'alcohol_consumption_category' is submitted as 'Unknown', then the '${$name}' field must be submitted as 'Unknown'.`};
            }
            else if (requiresAlcoholType.includes(alcoholConsumptionCategory) && (alcoholType.includes('not applicable'))) {
               result = {valid:false, message: `If the donor consumes alcohol ('${alcoholConsumptionCategory}'), then the '${$name}' field cannot be 'Not applicable'. Indicate type(s) of alcohol consumed or submit 'Unknown'.`};
            }
         }
         else {
            if (requiresAlcoholType.includes(alcoholConsumptionCategory)) {
               result = {valid: false, message: `If the 'alcohol_consumption_category' field is '${alcoholConsumptionCategory}', then the 'alcohol_type' field must be submitted.`};
            }
         }
      }
      if ($field && $field != null && !(checkforEmpty($field)) && (!$row.alcohol_consumption_category || $row.alcohol_consumption_category === null || checkforEmpty($row.alcohol_consumption_category))) {
         result = {valid: false, message: `The 'alcohol_consumption_category' field is required if the '${$name}' field is submitted.`};
      }
      return result;
  });

module.exports = validation;
