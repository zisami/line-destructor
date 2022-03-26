const { test, expect } = require('@jest/globals');
const { lineDestructor } = require('../src/line-destructor');
const { lineReducers } = require('../src/line-reducers');
const { mockLine } = require('../mock/line.Mock');

lineReducers; //?
mockLine; //?
describe('missing arguments and error cases', () => {
    test('RETURNS null GIVEN no arguments', () => {
        expect(lineDestructor()).toBe(null);
    });

    test('RETURNS null GIVEN no line or actions', () => {
        //expect(lineDestructor(mockLine)).objectContaining({original:expect(mockLine)});
        expect(lineDestructor({})).toBe(null);
    });
});
describe('run default destructuring', () => {
    describe('original Line', () => {
        test('RETURNS original GIVEN line but no actions', () => {
            expect(lineDestructor({ lineInput: mockLine.line })).toEqual(expect.objectContaining({ lineOrig: mockLine.line }));
        });

        test('RETURNS lineOrigg GIVEN line as Object', () => {
            const input = { abc: 123 };
            expect(lineDestructor({ lineInput: input })).toEqual(expect.objectContaining({ lineOrig: JSON.stringify(input) }));
        });
    });
});
