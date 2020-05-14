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
        case 'two-grade system':
          codeList = [
            'Low grade',
            'High grade',
          ];
          break;
        case 'three-grade system':
          codeList = [
            'GX',
            'G1',
            'G2',
            'G3',
          ];
          break;
        case 'four-grade system':
          codeList = [
            'GX',
            'G1',
            'G2',
            'G3',
            'G4',
          ];
          break;
        case 'grading system for GISTs':
          codeList = [
            'Low',
            'High',
          ];
          break;
        case 'grading system for GNETs':
          codeList = [
            'GX',
            'G1',
            'G2',
            'G3',
          ];
          break;
        case 'ISUP grading system':
          codeList = [
            'GX',
            'G1',
            'G2',
            'G3',
          ];
          break;
        case 'CNS WHO tumour grading system':
          codeList = [
            'I',
            'II',
            'III',
            'IV',
          ];
          break;
        case 'FNCLCC grading system':
          codeList = [
            'GX',
            'G1',
            'G2',
            'G3',
          ];
          break;
        case 'Gleason grade group system':
          codeList = [
            '1',
            '2',
            '3',
            '4',
            '5',
          ];
          break;
        case 'Scarff-Bloom-Richardson (SBR) grading system':
          codeList = [
            'GX',
            'G1',
            'G2',
            'G3',
          ];
          break;
        case 'Nuclear grading system for DCIS':
          codeList = [
            'GX',
            'G1',
            'G2',
            'G3',
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
