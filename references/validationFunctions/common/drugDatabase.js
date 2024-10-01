/*
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
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
 * Requirement to submit either drug_rxnormcui, drug_name or drug_database, drug_id, drug_term.
 */

const validation = () => 
  (function validate(inputs) {
    const {$row, $name, $field} = inputs;
    let result = {valid: true, message: "Ok"};

    // Extract related fields from the row
    const drug_rxnormcui = $row.drug_rxnormcui;
    const drug_name = $row.drug_name;
    const drug_database = $row.drug_database;
    const drug_id = $row.drug_id;
    const drug_term = $row.drug_term;
      
    // checks for empty fields
    const checkforEmpty = (entry) => {
      // Check if entry is null or undefined
      if (entry === null || entry === undefined) {
        return true;
      } 
      // Logic to check if the entry is an empty string or contains only whitespace
      return /^\s*$/.test(decodeURI(entry).replace(/^"(.*)"$/, '$1'));
    };
     
    // Validate based on the field name
    switch ($name) {
        case 'drug_rxnormcui':
            // If drug_rxnormcui is provided
            if (!checkforEmpty($field)) {
              if (checkforEmpty(drug_name)) {
                  result = {
                    valid: false,
                    message: `drug_name is required when drug_rxnormcui is provided.`
                  };
              }
              if (!checkforEmpty(drug_database) || !checkforEmpty(drug_id) || !checkforEmpty(drug_term) ) {
                  result = {
                    valid: false,
                    message: `drug_database, drug_id and drug_term should be blank when drug_rxnormcui is provided.`
                  };
              }
          } else {
              // If drug_rxnormcui is not provided
              if (!checkforEmpty(drug_name)) {
                  result = {
                    valid: false,
                    message: `drug_name should not be populated when drug_rxnormcui is not provided.`
                  };
              }
              if (checkforEmpty(drug_database) || checkforEmpty(drug_id) || checkforEmpty(drug_term) ) {
                  result = {
                    valid: false,
                    message: `drug_database, drug_id and drug_term must be populated when drug_rxnormcui is not provided.`
                  };
              }
          }
          break;

      case 'drug_name':
          // If drug_rxnormcui is provided, drug_name must be populated
          if (!checkforEmpty(drug_rxnormcui) && checkforEmpty($field)) {
              result = {
                valid: false,
                message: `drug_name is required when drug_rxnormcui is provided.`
              };
          }
          // If drug_rxnormcui is not provided, drug_name should be empty
          if (checkforEmpty(drug_rxnormcui) && !checkforEmpty($field)) {
              result = {
                valid: false,
                message: `drug_name should not be populated when drug_rxnormcui is not provided.`
              };
          }
          break;

      case 'drug_database':
      case 'drug_id': 
      case 'drug_term':
          // If drug_rxnormcui is provided, these fields should be empty
          if (!checkforEmpty(drug_rxnormcui) && !checkforEmpty($field)) {
              result = {
                valid: false,
                message: `'${$name}' should be blank when drug_rxnormcui is provided.`
              };
          }
          // If drug_rxnormcui is not provided, these fields must be populated
          if (checkforEmpty(drug_rxnormcui) && checkforEmpty($field)) {
              result = {
                valid: false,
                message: `'${$name}' must be populated when drug_rxnormcui is not provided.`
              };
          }
          break;

        default:
            break;
    }

    return result;
  });


module.exports = validation;
