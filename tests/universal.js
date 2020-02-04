// This file performs checks which are common to every validation function


const commonScriptValidation = function(returnedValue){
    describe("Validate the Returned Object", () => {

        test('Check that return value is an object', () => {
            expect(returnedValue).toBeDefined();
            expect(typeof returnedValue).toBe('object');
        })

        test('Check that return value has a "valid" property, which is a boolean', () => {
            expect(returnedValue).toHaveProperty('valid');
            expect(typeof returnedValue.valid).toBe('boolean');
        })

        test('Check that return value has a "message" property, which is a string', () => {
            expect(returnedValue).toHaveProperty('message');
            expect(typeof returnedValue.message).toBe('string');
        })

    })
};

module.exports = commonScriptValidation;

