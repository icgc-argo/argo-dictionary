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
 * If 'dose_intensity_reduction' is 'Yes', then 'dose_intensity_reduction_event' and 'dose_intensity_reduction_amount' must be submitted.
 */

const validation = () => 
  (function validate(inputs) {
      const {$row, $name, $field} = inputs;
      let result = {valid: true, message: "Ok"};
 
      // checks for a string just consisting of whitespace
      const checkforEmpty = (entry) => {return /^\s+$/g.test(entry.replace(/^"(.*)"$/, '$1'))};

      if ($field && $field != null && !(checkforEmpty($field))) {
        if (!$row.dose_intensity_reduction || checkforEmpty($row.dose_intensity_reduction) || $row.dose_intensity_reduction === null) {
          result = {
            valid: false,
            message: `The 'dose_intensity_reduction' field is required if the '${$name}' field is submitted.`,
          };
        }
        else if ($row.dose_intensity_reduction.trim().toLowerCase() === 'no') {
          result = {
            valid: false,
            message: `The '${$name}' field cannot be submitted if 'dose_intensity_reduction' field is 'No'.`,
          };
        } 
      }
      else if (!$field || $field === null || checkforEmpty($field)) {
        if ($row.dose_intensity_reduction && !(checkforEmpty($row.dose_intensity_reduction)) && $row.dose_intensity_reduction.trim().toLowerCase() === 'yes') {
          result = {
            valid: false,
            message: `The '${$name}' field is required if 'dose_intensity_reduction' field is 'Yes'.`
          };
        }
      }
      return result;
  });

module.exports = validation;
