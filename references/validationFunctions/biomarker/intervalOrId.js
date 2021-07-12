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
 * A biomarker test can only be associated with one clinical event (one of [submitter_primary_diagnosis_id, submitter_treatment_id, submitter_follow_up_id] OR test_interval) 
 */

const validation = () => 
  (function validate(inputs) {
      const {$row, $name, $field} = inputs;
      let result = {valid: true, message: "Ok"};
      let missing = true;

      // checks for a string just consisting of whitespace
      const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};

      const identifierFields = ['submitter_specimen_id', 'submitter_treatment_id', 'submitter_primary_diagnosis_id', 'submitter_follow_up_id', 'test_interval'];
     
      if (!$field || checkforEmpty($field) || $field === null) { 
        for (let idField of identifierFields) {
          if (!$row[idField] || checkforEmpty($row[idField]) || $row[idField] === null) {
            continue;
          }
          else {
            missing = false;
          }
        }
        if (missing === true && (!$row.test_interval || checkforEmpty($row.test_interval) || $row.test_interval === null)) {
          result = {
            valid: false,
            message: `The biomarker test must be associated with one clinical event or time interval. Please submit one of [submitter_specimen_id, submitter_primary_diagnosis_id, submitter_treatment_id, submitter_follow_up_id] OR the 'test_interval' field.`};
        }
      }
      else if ($field && !(checkforEmpty($field)) && $field != null) {
        for (let idField of identifierFields) {
          if (($name != idField) && ($row[idField] && $row[idField] != null && !(checkforEmpty($row[idField])))) {
            result = {
              valid: false,
              message: `Cannot submit both '${$name}' and '${idField}'. The biomarker test can only be associated with one event clinical identifier. If it is not associated with a clinical event, then the 'test_interval' field must be submitted. If the biomarker test was done during two clinical events, then submit biomarker test as new row in table.`};
            break;
          }
        }
      }
      return result;
  });

module.exports = validation;
