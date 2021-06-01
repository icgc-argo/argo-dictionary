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
      alcoholHistoryCategories = ["daily drinker", "occasional drinker (< once a month)", "social drinker (> once a month, < once a week)", "weekly drinker (>=1x a week)"];
      noOrUnknownAllowedCategories = ["none", "occasional drinker (< once a month)", "unknown"];
       
      if ($row.alcohol_consumption_category && $row.alcohol_consumption_category != null && !(checkforEmpty($row.alcohol_consumption_category))) {
         alcoholConsumptionCategory = $row.alcohol_consumption_category.trim().toLowerCase();
         if ((!$field || $field == null || checkforEmpty($field)) && alcoholHistoryCategories.includes(alcoholConsumptionCategory)) {
            result = {valid:false, message: `If the donor is a '${alcoholConsumptionCategory}', then the 'alcohol_history' field must be submitted as well.`};
         }
         if ((!$field || $field === null || checkforEmpty($field) || $field.trim().toLowerCase() === 'no') && (!(noOrUnknownAllowedCategories.includes(alcoholConsumptionCategory)))) {
            result = {valid:false, message: `If the donor is a '${alcoholConsumptionCategory}', then the 'alcohol_history' field must be submitted as 'Yes'.`};
         }
      }
      return result;
  });

module.exports = validation;
