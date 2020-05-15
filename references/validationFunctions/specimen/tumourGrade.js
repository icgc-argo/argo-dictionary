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

      switch ($row.tumour_grading_system && $row.tumour_grading_system.trim().toLowerCase()) {
        case 'two-tier grading system':
          codeList = [
            'low grade',
            'high grade',
          ];
          break;
        case 'three-tier grading system':
          codeList = [
            'gx',
            'g1',
            'g2',
            'g3',
          ];
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
          codeList = [
            'gx',
            'g1',
            'g2',
            'g3',
          ];
          break;
        case 'isup grading system':
          codeList = [
            'gx',
            'g1',
            'g2',
            'g3',
          ];
          break;
        case 'who grading system for cns tumours':
          codeList = [
            'i',
            'ii',
            'iii',
            'iv',
          ];
          break;
        case 'fnclcc grading system':
          codeList = [
            'gx',
            'g1',
            'g2',
            'g3',
          ];
          break;
        case 'gleason grade group system':
          codeList = [
            '1',
            '2',
            '3',
            '4',
            '5',
          ];
          break;
        case 'scarff-bloom-richardson grading system':
          codeList = [
            'gx',
            'g1',
            'g2',
            'g3',
          ];
          break;
        case 'nuclear grading system for dcis':
          codeList = [
            'gx',
            'g1',
            'g2',
            'g3',
          ];
          break;
        default:
          codelist = [];
      }

      if (!codeList.includes($field.trim().toLowerCase()) && codeList.length) {
        const msg = `'${$field}' is not a permissible value. When 'tumour_grading_system' is set to '${
          $row.tumour_grading_system
        }', 'tumour_grade' must be one of the following: \n${codeList
          .map(code => `- "${code}"`)
          .join('\n')}`;

        result.valid = false;
        result.message = msg;
      }
    }
    return result;
  })();

module.exports = validation;
