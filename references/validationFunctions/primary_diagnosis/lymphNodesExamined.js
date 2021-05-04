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
 * Enforces requirement on number_lymph_nodes_positive and number_lymph_nodes_examined based on whether lymph nodes were examined. 
 * @param {object} $row 
 * @param {string} $field 
 * @param {string} $name 
 */
const validation = () => 
  (function validate(inputs) {
      const {$row, $name, $field} = inputs;
      let result = {valid: true, message: "Ok"};

      /* checks for a string just consisting of whitespacei */
      const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
      
      const numberLymphNodesExamined = $row.number_lymph_nodes_examined;
      const numberLymphNodesPositive = $row.number_lymph_nodes_positive;
      
      if ($row.lymph_nodes_examined_status != null) {
         const lymphNodesExaminedStatus = $row.lymph_nodes_examined_status.trim().toLowerCase();
         /* if lymph nodes were examined and number_lymph_nodes_examined is submitted, it must be a value greater than 0. Otherwise, this field should be 0 or left blank. */
         if (($name === "number_lymph_nodes_examined") && (!(checkforEmpty($field)))) {
            if (lymphNodesExaminedStatus === "yes") { 
               if (parseInt($field) <= 0) {
                  result = {
                    valid: false,
                    message: `The '${$name}' field must be a value greater than 0 if 'lymph_nodes_examined_status' is '${lymphNodesExaminedStatus}'`
                  };
               }
            }
            else if (parseInt($field) > 0) {
               result = {
                 valid: false,
                 message: `The '${$name}' field must be submitted as 0 or left blank if 'lymph_nodes_examined_status' is '${lymphNodesExaminedStatus}'`
               };
            }
         }
      
         /* If lymph nodes were examined, number_lymph_nodes_positive must be submitted and it must be a value less than or equal to number_lymph_nodes_examined (if it is submitted). Otherwise, this field should not be submitted.*/
         else if ($name === "number_lymph_nodes_positive") {
            if (lymphNodesExaminedStatus === "yes") {
               if (checkforEmpty($field) || $field == null) {
                  result = {
                     valid: false,
                     message: `The '${$name}' field must be submitted if 'lymph_nodes_examined_status' is '${lymphNodesExaminedStatus}'`
                  };
               }
               else if (parseInt($field) < 0) {
                  result = {
                    valid: false,
                    message: `The '${$name}' field must be a value greater than or equal to 0 if 'lymph_nodes_examined_status' is '${lymphNodesExaminedStatus}'`
                  };
               }
               else if ((!(checkforEmpty(numberLymphNodesExamined)) && ((parseInt($field) > parseInt(numberLymphNodesExamined))))) {
                  result = {
                    valid: false,
                    message: `The '${$name}' field must be a value less than or equal to 'number_lymph_nodes_examined' if 'lymph_nodes_examined_status' is '${lymphNodesExaminedStatus}'`
                  };
               }
            }
            else if ($field || $field != null) {
               result = {
                 valid: false,
                 message: `The '${$name}' field should not be submitted if 'lymph_nodes_examined_status' is '${lymphNodesExaminedStatus}'`
               };
            }
        }
     }
     return result;
});
                 
module.exports = validation;
