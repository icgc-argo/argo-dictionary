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
 * Validates hrt_duration and/or contraception_duration fields to make sure they are consistent with hrt_type and/or contraception_type
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
     
      const type = $name.trim().toLowerCase().split('_duration')[0];
      const hormoneType = type + `_type`;
   
      if ($field != null && !(checkforEmpty($field))) {
        if (!$row[hormoneType] || $row[hormoneType] === null || checkforEmpty($row[hormoneType])) {
           result = { valid: false, message: `Indicate type of ${type} taken in the '${hormoneType}' field if '${$name}' field is submitted.`};
        }
        else if ($row[hormoneType].toLowerCase() === "never taken hrt" || $row[hormoneType].toLowerCase() === "never used hormonal contraception") {
           const submittedValue = $row[hormoneType].toLowerCase()
           result = {valid: false, message: `If '${$name}' is submitted, then '${hormoneType}' field cannot be '${submittedValue}'.`};
       }

      }
      return result;
  });

module.exports = validation;
