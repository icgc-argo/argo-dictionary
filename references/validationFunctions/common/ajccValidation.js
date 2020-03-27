/**
 * Validates that T, N, M values are non empty if staging system field is set to an AJCC value
 *
 * @param {Object} $row The object representing the row for a donor. Object keys represent the fields.
 * @param {String} $name The name of the field this validation function runs on.
 * @param {String} $field The value for the field.
 */
const validation = ($row, $name, $field) =>
  (function validate() {
    let result = { valid: true, message: 'Ok' };

    /* This is not a required field, so first ensure that it exists */
    if ($field) {
      /* Contingent on the naming system for tumour staging systems to remain consistent */
      const stagingName = $name
        .trim()
        .toLowerCase()
        .split('_tumour_staging_system')[0];
      const requiredFields = [
        `${stagingName}_m_category`,
        `${stagingName}_n_category`,
        `${stagingName}_t_category`,
      ];
      const convertedRow = Object.fromEntries(
        Object.entries($row).map(([fieldName, fieldVal]) => [fieldName.toLowerCase(), fieldVal]),
      );
      /* Check for contigous spaces wrapped with quotes (empty strings) */
      const checkforEmpty = entry => {
        return /^\s+$/g.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'));
      };
      /* search for fields with falsy values, given the field exists */
      const emptyFields = requiredFields.filter(
        field =>
          Object.keys(convertedRow).includes(field) &&
          (!convertedRow[field] || checkforEmpty(convertedRow[field])),
      );

      /* The fields should be provided IF and ONLY IF the AJCC regex passes */
      if (/^(AJCC)\b/i.test($field) && emptyFields.length) {
        result = {
          valid: false,
          message: `The following fields are required when ${$name} is set to an AJCC option: ${emptyFields}`,
        };
      } else if (!/^(AJCC)\b/i.test($field) && emptyFields.length != requiredFields.length) {
        result = {
          valid: false,
          message: `The following fields cannot be provided when ${$name} is not set to an AJCC option: ${requiredFields.filter(
            fieldName => !emptyFields.includes(fieldName),
          )}`,
        };
      }
    }
    return result;
  })();

module.exports = validation;
