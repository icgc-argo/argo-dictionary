// This file performs checks which are common to every function


const commonScriptValidation = function(returnedValue){
    describe("Validate the Returned Object", () => {
    
        test('Check that return value is an object', () => {
            expect(returnedValue).toBeDefined();
            expect(typeof returnedValue).toBe('object');
        })

        test('Check that return value has a "valid" property', () => {
            expect(returnedValue).toHaveProperty('valid');
        })

        test('Check that the "valid" property is a boolean', () => {
            expect(typeof returnedValue.valid).toBe('boolean');
        })

        test('Check that return value has a "message" property', () => {
            expect(returnedValue).toHaveProperty('message');
        })

        test('Check that the "message" property is a string', () => {
            expect(typeof returnedValue.message).toBe('string');
        })
    })
};

module.exports = commonScriptValidation;

