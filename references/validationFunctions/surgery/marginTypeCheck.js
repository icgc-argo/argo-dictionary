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
 * Allows margin type fields to be submitted if biopsy or debulking surgical procedures performed, since margins can still be commented on even if specimen is not resected during biopsy or debulking
 * @param {object} $row 
 * @param {string} $field 
 * @param {string} $name 
 */

const validation = () => 
   (function validate(inputs) {
      const {$row, $name, $field} = inputs;
        let result = {valid: true, message: "Ok"};
        
        /* checks if surgical procedure involves debulking or biopsy */
        const surgeryTypeExceptions = (entry) => {return /(biopsy|debulking)$/.test(decodeURI(entry))}; 
   
        /* checks for a string just consisting of whitespace */
        const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
        
        if ($field && !(checkforEmpty($field)) && $field != null) {
          if ((!$row.submitter_specimen_id || $row.submitter_specimen_id === null) && !(surgeryTypeExceptions($row.surgery_type.trim().toLowerCase()))) {
            result = {valid: false, message: `The 'submitter_specimen_id' of the resected specimen must be submitted if '${$name}' is submitted.`};
          }
        }
        return  result;
    });

module.exports = validation;
