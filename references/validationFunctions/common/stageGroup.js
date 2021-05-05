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
 * Validates that clinical_stage_group is a permissable value based on clinical_tumour_staging_system
 *
 * @param {Object} $row The object representing the row for a donor. Object keys represent the fields.
 * @param {String} $field The value for the field.
 */
const validation = () => 
  (function validate(inputs) {
    const {$row, $name, $field} = inputs;
    let result = { valid: true, message: 'Ok' };
    const stagingName = $name
      .trim()
      .toLowerCase()
      .split('_stage_group')[0];

    const stagingSystem = stagingName + `_tumour_staging_system`;
    
    /* checks for a string just consisting of whitespace */
    const checkforEmpty = (entry) => {return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'))};
 
    if ($row[stagingSystem] && (!$field || checkforEmpty($field))) {
      result.valid = false;
      const msg = `The ${stagingName}_stage_group must be submitted if the field ${stagingSystem} is submitted.`;
      result.message = msg;
    }
    else if (!($row[stagingSystem]) && $field) {
       result.valid = false;
       const msg = `The field ${stagingSystem} must be submitted if ${stagingName}_stage_group is submitted.`;
       result.message = msg;
    }
    else if ($row[stagingSystem] && $field) {
      let codeList = [];
      switch ($row[stagingSystem] && $row[stagingSystem].trim().toLowerCase()) {
        case 'revised international staging system (riss)':
          codeList = [
            'stage i',
            'stage ii',
            'stage iii'
          ];
          break;
        case 'lugano staging system':
          codeList = [
             'stage i',
             'stage ia',
             'stage ib',
             'stage ie',
             'stage iea',
             'stage ieb',
             'stage ii',
             'stage ii bulky',
             'stage iia',
             'stage iib',
             'stage iie',
             'stage iiea',
             'stage iieb',
             'stage iii',
             'stage iiia',
             'stage iiib',
             'stage iv',
             'stage iva',
             'stage ivb'
          ];
          break;
        case 'st jude staging system':
          codeList = [
            'stage i',
            'stage ii',
            'stage iii',
            'stage iv'
          ];
          break;
        case 'ann arbor staging system':
          codeList = [
            'stage i',
            'stage ia',
            'stage ie',
            'stage is',
            'stage ies',
            'stage iae',
            'stage ias',
            'stage iaes',
            'stage ib',
            'stage ibe',
            'stage ibs',
            'stage ibes',
            'stage ii',
            'stage iia',
            'stage iie',
            'stage iis',
            'stage iies',
            'stage iiae',
            'stage iias',
            'stage iiaes',
            'stage iib',
            'stage iibe',
            'stage iibs',
            'stage iibes',
            'stage iii',
            'stage iiia',
            'stage iiie',
            'stage iiis',
            'stage iiies',
            'stage iiiae',
            'stage iiias',
            'stage iiiaes',
            'stage iiib',
            'stage iiibe',
            'stage iiibs',
            'stage iiibes',
            'stage iv',
            'stage iva',
            'stage ive',
            'stage ivs',
            'stage ives',
            'stage ivae',
            'stage ivas',
            'stage ivaes',
            'stage ivb',
            'stage ivbe',
            'stage ivbs',
            'stage ivbes'
          ];
          break;
        case 'rai staging system':
          codeList = [
             'stage 0',
             'stage i',
             'stage ii',
             'stage iii',
             'stage iv'
          ];
          break;
        case 'durie-salmon staging system':
          codeList = [
            'stage 1',
            'stage 1a',
            'stage 1b',
            'stage ii',
            'stage iia',
            'stage iib',
            'stage iii',
            'stage iiia',
            'stage iiib'
          ];
          break;
        case 'figo staging system':
          codeList = [
            'stage ia',
            'stage ia1',
            'stage ia2',
            'stage ib',
            'stage ib1',
            'stage ib2',
            'stage iia',
            'stage iab',
            'stage iiia',
            'stage iiib',
            'stage iva',
            'stage ivb'
          ];
          break;
        case 'binet staging system':
          codeList = [
             'stage a',
             'stage b',
             'stage c'
         ];
          break;
        case 'ajcc 8th edition':
          codeList = ['stage 0','stage 0a','stage 0is','stage i','stage ia','stage ia1','stage ia2','stage ia3','stage ib','stage ib1','stage ib2','stage ic','stage ie','stage is','stage ii','stage iia','stage iia1','stage iia2','stage iib','stage iic','stage iie','stage iii','stage iiia','stage iiia1','stage iiia2','stage iiib','stage iiic','stage iiic1','stage iiic2','stage iiid','stage iv','stage iva','stage iva1','stage iva2','stage ivb','stage ivc','occult carcinoma','stage 1'];
          break;
        case 'ajcc 7th edition':
          codeList = ['stage 0','stage 0a','stage 0is','stage i','stage ia','stage ia1','stage ia2','stage ib','stage ib1','stage ib2','stage ic','stage is','stage ii','stage iia','stage iia1','stage iia2','stage iib','stage iic','stage iii','stage iiia','stage iiib','stage iiic','stage iiic1','stage iiic2','stage iv','stage iva','stage iva1','stage iva2','stage ivb','stage ivc','occult carcinoma','stage 1'
];
          break;
        default:
          codelist = [];
      }

      if (!codeList.includes($field.trim().toLowerCase()) && codeList.length) {
        const msg = `'${$field}' is not a permissible value. When '${stagingSystem}' is set to '${
          $row[stagingSystem]
        }', '${stagingName}_stage_group' must be one of the following: \n${codeList
          .map(code => `- "${code}"`)
          .join('\n')}`;

        result.valid = false;
        result.message = msg;
      }
    }
    
    return result;
  });

module.exports = validation;
