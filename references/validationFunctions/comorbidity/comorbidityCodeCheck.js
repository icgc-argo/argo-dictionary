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

/* comorbidity_type_code is a required field but can be left empty if prior_malignancy is 'No' or 'Unknown'.
 * If there was a prior malignancy, then the ICD-10 code submitted in the comorbidity_type_code field should be for neoplasms (ie. starts with C or D). Otherwise, it should be non-cancer code.
 */

const validation = () => 
  (function validate(inputs) {
      const {$row, $name, $field} = inputs;
      let result = {valid: true, message: "Ok"};
      
      /* checks for a string just consisting of whitespace */
      const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
      const invalidTypes = ["no", "unknown"]
      /* check if ICD-10 code is for neoplasms */
      const neoplasmCode = (entry) => {return /^[C|D][0-9]{2}(.[0-9]{1,3}[A-Z]{0,1})?$/.test(decodeURI(entry))};

    
      if (neoplasmCode($row.comorbidity_type_code)) { 
         if (!$row.prior_malignancy || $row.prior_malignancy === null || checkforEmpty($row.prior_malignancy) || invalidTypes.includes($row.prior_malignancy.trim().toLowerCase())) {
           result = {valid: false, message: `If an ICD-10 code for cancer is submitted in the '${$name}' field, then 'prior_malignancy' should be submitted as 'Yes'.`}
         }
      }
      else if ($row.prior_malignancy && $row.prior_malignancy != null && !(checkforEmpty($row.prior_malignancy)) && $row.prior_malignancy.trim().toLowerCase() === "yes" && (!(neoplasmCode($row.comorbidity_type_code)))) {
        result = {valid: false, message: `If the 'prior_malignancy' field is submitted as 'Yes', then an ICD-10 code for cancer is expected in the '${$name}' field.`}
      }
      return result;
  });

module.exports = validation;
