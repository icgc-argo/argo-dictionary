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
 * Enforces a required field if disease status at followup is progression or relapse or recurrence
 * @param {object} $row 
 * @param {string} $field 
 * @param {string} $name 
 */

const validation = () => 
   (function validate(inputs) {
      const {$row, $name, $field} = inputs;
        let result = {valid: true, message: "Ok"};
        
        /* required field, cannot be null */
        if ($row.disease_status_at_followup != null) {
           const diseaseStatus = $row.disease_status_at_followup.trim().toLowerCase();
           const stateOfProgression = (entry) => {return /(progression)$/.test(decodeURI(entry))}; 
           const relapseOrRecurrence = diseaseStatus === "relapse or recurrence";
   
           /* checks for a string just consisting of whitespace */
           const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
           
           if ($name === 'recurrence_tumour_staging_system') {
             if (!(!$field || checkforEmpty($field)) && !stateOfProgression(diseaseStatus) && !relapseOrRecurrence) {
              result = {valid: false, message: `'${$name}' should not be submitted if 'disease_status_at_followup' is not a state of progression, relapse, or recurrence.` }
             }
           }
           else {
             if ((!$field || checkforEmpty($field)) && (stateOfProgression(diseaseStatus) || relapseOrRecurrence)) {
               result = {valid: false, message: `'${$name}' is a required field if 'disease_status_at_followup' is set a state of progression, relapse, or recurrence.` }
             }
             else if (!(!$field || checkforEmpty($field)) && !stateOfProgression(diseaseStatus) && !relapseOrRecurrence) {
               result = {valid: false, message: `'${$name}' should not be submitted if 'disease_status_at_followup' is not a state of progression, relapse, or recurrence.` }
             }
           }
        }
        return  result;
  });

module.exports = validation;
