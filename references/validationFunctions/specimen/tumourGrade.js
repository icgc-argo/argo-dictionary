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
            'i',
            'ii',
            'iii',
            'iv',
          ];
          break;
        case 'fnclcc grading system':
          codeList = tieredGradingList;
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
    else if (!$row.tumour_grading_system) {
       result.valid = false;
       result.message = "'tumour_grading_system' is required for tumour specimens.";
    }
    else if ($row.tumour_grading_system && !$field) {
       result.valid = false;
       result.message = "'tumour_grade' is required for tumour specimens.";
    }
    else if (!$row.tumour_grading_system && !$field) {
       result.valid = false;
       result.message = "'tumour_grading_system' and 'tumour_grade' are both required for tumour specimens.";
    }
    return result;
  })();

module.exports = validation;
