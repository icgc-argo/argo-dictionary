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
 * The relative's cause of death should only be provided if the relative is deceased.
 */
const validation = () => 
    (function validate(inputs) {
        const {$row, $name, $field} = inputs;
        let result = {valid: true, message: "Ok"};
        
        if ($row.relative_vital_status && $row.relative_vital_status != null) {
           const vitalStatus = $row.relative_vital_status.trim().toLowerCase();
           if (($field || $field != null) && (vitalStatus === "alive" || vitalStatus === "unknown")) {
              result = {valid: false, message: `The '${$name}' field cannot be submitted if the relative's vital_status is '${vitalStatus}'.`}
           }
        }
        else {
           if ($field || $field != null) {
              result = {valid: false, message: `The 'relative_vital_status' field must be submitted as 'deceased' if the '${$name}' field is submitted.` }
           }
        }
        return result;
    });


module.exports = validation;
