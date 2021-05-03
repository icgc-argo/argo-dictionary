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

const validation = require('./../../references/validationFunctions/sample_registration/specimentypeDesignation.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const sampleReg = require('../constructDummyData').getSchemaDummy('sample_registration');

// the name of the field being validated
const name = "specimen_type";

const unitTests = [
    [
        'Normal Designation with Normal',
        true,
        loadObjects(sampleReg, {
            "tumour_normal_designation": "normal",
            "specimen_type": "normal"
        })
    ],
    [
        'Normal Designation with Normal Tissue Adj',
        true,
        loadObjects(sampleReg, {
            "tumour_normal_designation": "normal",
            "specimen_type": "Normal - tissue adjacent to primary tumour"
        })
    ],
    [
        'Normal Designation with cell line derived normal',
        true,
        loadObjects(sampleReg, {
            "tumour_normal_designation": "normal",
            "specimen_type": "Cell line - derived from normal"
        })
    ],
    [
        'Normal Designation with recurrent tumour',
        false,
        loadObjects(sampleReg, {
            "tumour_normal_designation": "normal",
            "specimen_type": "Recurrent tumour"
        })
    ],
    [
        'Normal Designation with Metastatic tumour',
        false,
        loadObjects(sampleReg, {
            "tumour_normal_designation": "normal",
            "specimen_type": "Metastatic tumour - metastasis to distant location"
        })
    ],
    [
        'Normal Designation with cell line derived tumour',
        false,
        loadObjects(sampleReg, {
            "tumour_normal_designation": "normal",
            "specimen_type": "Cell line - derived from tumour"
        })
    ],
    [
        'Tumour Designation with cell line derived tumour',
        true,
        loadObjects(sampleReg, {
            "tumour_normal_designation": "tumour",
            "specimen_type": "Cell line - derived from tumour"
        })
    ],
    [
        'Tumour Designation with xenograft derived from tumour',
        true,
        loadObjects(sampleReg, {
            "tumour_normal_designation": "tumour",
            "specimen_type": "Xenograft - derived from primary tumour"
        })
    ],
    [
        'Tumour Designation with normal tissue adj to primary tumour',
        true,
        loadObjects(sampleReg, {
            "tumour_normal_designation": "tumour",
            "specimen_type": "normal - tissue adjacent to primary tumour"
        })
    ],
    [
        'Tumour Designation with normal',
        false,
        loadObjects(sampleReg, {
            "tumour_normal_designation": "tumour",
            "specimen_type": "Normal"
        })
    ],
    [
        'Tumour Designation with cell line derived normal',
        false,
        loadObjects(sampleReg, {
            "tumour_normal_designation": "tumour",
            "specimen_type": "Cell line - derived from normal"
        })
    ],
    [
        'Missing Designation with cell line derived normal',
        true,
        loadObjects(sampleReg, {
            "specimen_type": "Cell line - derived from normal"
        })
    ],
    [
        'Missing specimen type but designation submitted',
        true,
        loadObjects(sampleReg, {
            "tumour_normal_designation": "tumour",
        })
    ]

];


describe("Common Tests",()=>{
    unitTests.forEach(test=>{
        const testIndex = 2;
        const testInputs = test[testIndex];
        universalTest(validation()({ $row: testInputs, $name: name, $field: testInputs[name]}));
    })
})

describe("Unit Tests for Ensure Deceased Validation",()=>{
    test.each(unitTests)('\n Test %# : %s \nExpecting result.valid to be: %s',(description,target,inputs) =>{
        const scriptOutput = validation()({ $row: inputs, $field: inputs[name], $name: name});
        expect(scriptOutput.valid).toBe(target);
    })
})
