/**
 * Validates that recurrence_stage_group is a permissable value based on recurrence_tumour_staging_system
 *
 * @param {Object} $row The object representing the row for a donor. Object keys represent the fields.
 * @param {String} $field The value for the field.
 */
const validation = ($row, $field) =>
  (function validate() {
    let result = { valid: true, message: 'Ok' };
    if ($row.recurrence_tumour_staging_system && $field) {
      let codeList = [];
      switch ($row.recurrence_tumour_staging_system && $row.recurrence_tumour_staging_system.trim().toLowerCase()) {
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
            'stage ib',
            'stage ie',
            'stage is',
            'stage ii',
            'stage iia',
            'stage iib',
            'stage iie',
            'stage iis',
            'stage iii',
            'stage iiia',
            'stage iiib',
            'stage iiie',
            'stage iiis',
            'stage iv',
            'stage iva',
            'stage ivb',
            'stage ive',
            'stage ivs'
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
        const msg = `'${$field}' is not a permissible value. When 'recurrence_tumour_staging_system' is set to '${
          $row.recurrence_tumour_staging_system
        }', 'recurrence_stage_group' must be one of the following: \n${codeList
          .map(code => `- "${code}"`)
          .join('\n')}`;

        result.valid = false;
        result.message = msg;
      }
    }
    return result;
  })();

module.exports = validation;
