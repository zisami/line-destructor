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

        test('RETURNS lineOrig GIVEN line as Object', () => {
            const input = { abc: 123 };
            expect(lineDestructor({ lineInput: input })).toEqual(expect.objectContaining({ lineOrig: JSON.stringify(input) }));
        });
    });
    describe('Rest of Line that is left over after removeing pattern match ', () => {
        test('RETURNS lineRest propperty GIVEN line but no actions', () => {
            expect(lineDestructor({ lineInput: mockLine.line })).toEqual(expect.objectContaining({ lineRest: mockLine.line }));
        });

        test('RETURNS lineRest = line without date GIVEN line and action', () => {
            const rest = 'this is the rest of the Line';
            expect(lineDestructor({lineInput: `[2022-03-29 20:59:43:300] ${rest}`, actions: lineReducers.date })).toEqual(expect.objectContaining({ lineRest: rest }));
        });
    });
});
