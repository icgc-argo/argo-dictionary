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
 * Validates that tumour_grade is a permissable value based on tumour_grading_system
 *
 * @param {Object} $row The object representing the row for a donor. Object keys represent the fields.
 * @param {String} $field The value for the field.
 */
const validation = ($row, $field) =>
  (function validate() {
    let result = { valid: true, message: 'Ok' };
    if ($row.tumour_grading_system && $field) {
      let codeList = [];
      const tieredGradingList = ['gx','g1','g2','g3'];
      const gradingSystems = ['two-tier grading system', 'three-tier grading system', 'four-tier grading system', 'grading system for gists', 'grading system for gnets', 'isup grading system', 'who grading system for cns tumours', 'fnclcc grading system', 'gleason grade group system', 'scarff-bloom-richardson grading system', 'nuclear grading system for dcis'];
      switch ($row.tumour_grading_system && $row.tumour_grading_system.trim().toLowerCase()) {
        case 'two-tier grading system':
          codeList = [
            'low grade',
            'high grade',
          ];
          break;
        case 'three-tier grading system':
          codeList = tieredGradingList;
          break;
        case 'four-tier grading system':
          codeList = [
            'gx',
            'g1',
            'g2',
            'g3',
            'g4',
          ];
          break;
        case 'grading system for gists':
          codeList = [
            'low',
            'high',
          ];
          break;
        case 'grading system for gnets':
          codeList = tieredGradingList;
          break;
        case 'isup grading system':
          codeList = [
            'gx',
            'g1',
            'g2',
            'g3',
            'g4',
          ];
          break;
        case 'who grading system for cns tumours':
          codeList = [
            'grade i',
            'grade ii',
            'grade iii',
            'grade iv',
          ];
          break;
        case 'fnclcc grading system':
          codeList = tieredGradingList;
          break;
        case 'gleason grade group system':
          codeList = [
            'grade group 1',
            'grade group 2',
            'grade group 3',
            'grade group 4',
            'grade group 5',
          ];
          break;
        case 'scarff-bloom-richardson grading system':
          codeList = tieredGradingList;
          break;
        case 'nuclear grading system for dcis':
          codeList = tieredGradingList;
          break;
      }

      if (!codeList.includes($field.trim().toLowerCase())) {
        const msg = `'${$field}' is not a permissible value. When 'tumour_grading_system' is set to '${
          $row.tumour_grading_system
        }', 'tumour_grade' must be one of the following: \n${codeList
          .map(code => `- "${code}"`)
          .join('\n')}`;
        result.valid = false;
        result.message = msg;
      }
      else if (!gradingSystems.includes($row.tumour_grading_system.trim().toLowerCase())) {
         result.valid = false;
         const msg = "'${$row.tumour_grading_system}' is not a permissible value for 'tumour_grading_system'. If the tumour grading system you use is missing, please contact the DCC.";
         result.message = msg;
      }
    }
    return result;
  })();

module.exports = validation;
