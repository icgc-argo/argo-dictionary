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
 * Validates to ensure that response_to_treatment is a permissable value based on response_to_treatment_criteria_method
 *
 * @param {Object} $row The object representing the row for a donor. Object keys represent the fields.
 * @param {String} $field The value for the field.
 */
const validation = () => 
  (function validate(inputs) {
    const {$row, $name, $field} = inputs;
    let result = { valid: true, message: 'Ok' };

    /* checks for a string just consisting of whitespace */
    const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
    let codeList = [];
    
      switch ($row.response_to_treatment_criteria_method && $row.response_to_treatment_criteria_method.trim().toLowerCase()) {
        case 'eln dohner aml 2017 oncology response criteria':
          codeList = [
            'complete remission',
            'complete remission with incomplete hematologic recovery (cri)',
            'complete remission without minimal residual disease (crmrd-)',
            'hematologic relapse (after crmrd-, cr, cri)',
            'molecular relapse (after crmrd-)',
            'partial remission',
            'progressive disease',
            'stable disease'
          ];
          break;
        case 'iwg cheson aml 2003 oncology response criteria':
          codeList = [
            'cytogenetic complete remission (crc)',
            'molecular complete remission (crm)',
            'morphologic complete remission',
            'morphologic complete remission with incomplete blood count recovery (cri)',
            'morphologic leukemia-free state',
            'partial remission'
          ];
          break;
        case 'irecist':
          codeList = [
            'immune complete response (icr)',
            'immune confirmed progressive disease (icpd)',
            'immune partial response (ipr)',
            'immune stable disease (isd)',
            'immune unconfirmed progressive disease (iupd)'
          ];
          break;
        case 'recist':
          codeList = [
            'complete response',
            'no evidence of disease (ned)',
            'partial response',
            'progressive disease',
            'stable disease'
          ];
          break;
        case 'response assessment in neuro-oncology (rano)':
          codeList = [
            'complete response',
            'minor response',
            'partial response',
            'progressive disease',
            'stable disease'
          ];
          break;
        case 'physician assessed response criteria':
          codeList = [
            'physician assessed complete response',
            'physician assessed partial response',
            'physician assessed progressive disease',
            'physician assessed stable disease'
          ];
          break;
        default:
          codelist = [];
      }

    if ($field && $field != null && !(checkforEmpty($field))) {
      if (!codeList.includes($field.trim().toLowerCase()) && codeList.length) {
        const msg = `'${$field}' is not a permissible value. When 'response_to_treatment_criteria_method' is set to '${
          $row.response_to_treatment_criteria_method}', the '${$name}' field must be one of the following: \n${codeList
          .map(code => `- "${code}"`)
          .join('\n')}`;

        result.valid = false;
        result.message = msg;
      }
    }
    else {
       if ($row.response_to_treatment_criteria_method && $row.response_to_treatment_criteria_method != null && !(checkforEmpty($row.response_to_treatment_criteria_method))) {
         result = { valid: false, message: `The '${$name}' field must be submitted when 'response_to_treatment_criteria_method' is set to '${$row.response_to_treatment_criteria_method}'. The '${$name}' field must be one of the following: \n${codeList
          .map(code => `- "${code}"`)
          .join('\n')}`};
       }
    }
    return result;
  });

module.exports = validation;
