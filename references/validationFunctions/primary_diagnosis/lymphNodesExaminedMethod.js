/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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
 * Enforces requirement on lymph_nodes_examined_method if lymph_nodes_examined_status is 'Yes'. If 'lymph_nodes_examined_status' is any other value, then 'lymph_nodes_examined_method' should not be submitted.
 * @param {object} $row 
 * @param {string} $field 
 * @param {string} $name 
 */
const validation = () => 
  (function validate(inputs) {
      const {$row, $name, $field} = inputs;
      let result = {valid: true, message: "Ok"};

      const notExamined = ['cannot be determined', 'no', 'no lymph nodes found in resected specimen', 'not applicable'];
      /* checks for a string just consisting of whitespace */
      const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
      
      if ($row.lymph_nodes_examined_status === null) {
        result = {valid: false, message: `The 'lymph_nodes_examined_status' field must be submitted.`};
      }
      else {
        const lymphNodesExaminedStatus = $row.lymph_nodes_examined_status.trim().toLowerCase();
      
        if (!$field || $field === null || checkforEmpty($field)) {
          if (lymphNodesExaminedStatus === 'yes') {
            result = { valid: false, message: `The '${$name}' field must be submitted if the 'lymph_nodes_examined_status' field is 'Yes'`};
          }
        }
        else {
          if (notExamined.includes(lymphNodesExaminedStatus)) {
            result = { valid: false, message: `The '${$name}' field should not be submitted if the 'lymph_nodes_examined_status' field is '${lymphNodesExaminedStatus}'`};
          }
        }
      }
    return result;
});
                 
module.exports = validation;
