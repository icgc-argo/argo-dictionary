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
 * If a radiation boost was given, then the 'reference_radiation_treatment_id' must be submitted.
 */
const validation = () => 
    (function validate(inputs) {
        const {$row, $name, $field} = inputs;
        let result = {valid: true, message: "Ok"};
        const currField = typeof($field) === 'string' ? $field.trim().toLowerCase() : $field;
        
        if ($row.radiation_boost != null) {
           const radiationBoost = $row.radiation_boost.trim().toLowerCase();

           if (!currField && radiationBoost === "yes") {
              result = {valid: false, message: `${$name} must be provided when if a radiation boost was given.`}
           }
           else if (currField && radiationBoost != "yes"){
              result = {valid: false, message: `${$name} cannot be provided if the 'radiation_boost' field is '${radiationBoost}'.`}
           }
        }
        else if (($row.radiation_boost === null) && (currField)) {
           result = {valid: false, message: `'${$name}' requires the 'radiation_boost' field.` }
        }
        return result;
    });


module.exports = validation;
