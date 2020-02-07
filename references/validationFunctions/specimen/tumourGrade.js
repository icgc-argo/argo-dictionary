/**
 * Validates that tumour_grade is a permissable value based on tumour_grading_system
 * 
 * @param {Object} $row The object representing the row for a donor. Object keys represent the fields.
 * @param {String} $field The value for the field.
 */
const validation = ($row,$field) => 
    (function validate() {
        let result = {valid: true, message: "Ok"};
        let codeList = [];
        switch ($row.tumour_grading_system.trim().toLowerCase()) {
            case 'default':
                codeList = [
                    'gx - cannot be assessed',
                    'g1 well differentiated/low grade',
                    'g2 moderately differentiated/intermediated grade',
                    'g3 poorly differentiated/high grade',
                    'g4 undifferentiated/high grade'
                ];
                break;
            case 'gleason':
                codeList = [
                    'gleason x: gleason score cannot be determined',
                    'gleason 2–6: the tumor tissue is well differentiated',
                    'gleason 7: the tumor tissue is moderately differentiated',
                    'gleason 8–10: the tumor tissue is poorly differentiated or undifferentiated'
                ];
                break;
            case 'nottingham':
                codeList = [
                    'g1 (low grade or well differentiated)',
                    'g2 (intermediate grade or moderately differentiated)',
                    'g3 (high grade or poorly differentiated)'
                ];
                break;
            case 'brain cancer':
                codeList = [
                    'grade i',
                    'grade ii',
                    'grade iii',
                    'grade iv'
                ];
                break;
            case 'isup for renal cell carcinoma':
                codeList = [
                    'grade 1: tumor cell nucleoli invisible or small and basophilic at 400 x magnification',
                    'grade 2: tumor cell nucleoli conspicuous at 400 x magnification but inconspicuous at 100 x magnification',
                    'grade 3: tumor cell nucleoli eosinophilic and clearly visible at 100 x magnification',
                    'grade 4: tumors showing extreme nuclear pleomorphism and/or containing tumor giant cells and/or the presence of any proportion of tumor showing sarcomatoid and/or rhabdoid dedifferentiation'
                ];
                break;
            case 'lymphoid neoplasms':
                codeList = [
                    'low grade or indolent nhl',
                    'high grade or aggressive nhl'
                ];
                break;
        }

        if (!codeList.includes($field.trim().toLowerCase())){
            const msg = `'${$field}' is not a permissible value. When 'tumour_grading_system' is set to '${$row.tumour_grading_system}','tumour_grade' must be one of the following: \n${codeList.join("\n")}`;

            result.valid = false;
            result.message = msg;
        }
        return result;
    })();

module.exports = validation;