const validation = require('./../../references/validationFunctions/sample_registration/specimentypeDesignation.js');
const universalTest = require('../universal');
const loadObjects = require('../loadObjects');

// load in all fields with entries prepopulated to null
const sampleReg = require('../dummyData/sample_registration.json');

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
    ]
];


describe("Common Tests",()=>{
    unitTests.forEach(test=>{
        const testIndex = 2;
        const testInputs = test[testIndex];
        universalTest(validation(testInputs,name,testInputs[name]));
    })
})

describe("Unit Tests for Ensure Deceased Validation",()=>{
    test.each(unitTests)('\n Test %# : %s \nExpecting result.valid to be: %s',(description,target,inputs) =>{
        const scriptOutput = validation(inputs, inputs[name], inputs[inputs.name]);
        expect(scriptOutput.valid).toBe(target);
    })
})