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
 * Validates submitted clinical N category based on AJCC edition. Certain categories are not valid in clinical N category when AJCC 6th edition is used.
 *
 * @param {String} $name The name of the field this validation function runs on.
 * @param {String} $field The value for the field.
 */

const validation = () =>
  (function validate(inputs) {
    const {$row, $name, $field} = inputs;
    let result = { valid: true, message: 'Ok' };
   
    const nCategoriesExclude = ['n0(i-)','n0(i+)','n0(mol-)','n0(mol+)','n4'];
    
    /* Check for contigous spaces wrapped with quotes (empty strings) */
    const checkforEmpty = entry => {
      return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'));
    };
  
    if ($row.clinical_tumour_staging_system && $row.clinical_tumour_staging_system != null && !(checkforEmpty($row.clinical_tumour_staging_system))) {
      if ($row.clinical_tumour_staging_system.trim().toLowerCase() === 'ajcc 6th edition') {
         if ($field && $field != null && !(checkforEmpty($field)) && nCategoriesExclude.includes($field.trim().toLowerCase())) {
           result = {
             valid: false,
             message: `The designation of '${$field}' in the '${$name}' field is not a valid N category in the clinical_tumour_staging_system '${$row.clinical_tumour_staging_system}'.`
           };
         }
      }
    }
    return result;
});
module.exports = validation;
