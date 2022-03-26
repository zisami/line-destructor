const { test, expect } = require('@jest/globals');
const { lineDestructor } = require('../src/line-destructor');
const { mockLine } = require('../mock/line.Mock');
const { mockActions } = require('../mock/actions.Mock');

mockActions; //?
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
describe('run destructuring commands', () => {
    describe('original Line', () => {
        test('RETURNS original GIVEN line but no actions', () => {
            expect(lineDestructor({ lineInput: mockLine.line })).toEqual(expect.objectContaining({ original: mockLine.line }));
        });

        test('RETURNS original GIVEN line as Object', () => {
            const input = { abc: 123 };
            expect(lineDestructor({ lineInput: input })).toEqual(expect.objectContaining({ original: JSON.stringify(input) }));
        });
    });
    describe('Date', () => {
        test('RETURNS property date as unix time in millisecons GIVEN  line with valid date', () => {
            expect(lineDestructor({ lineInput: '[2022-03-29 20:59:43:300]', actions: mockActions.date })).toEqual(expect.objectContaining({ date: '1648580383300' }));
            //expect(lineDestructor({ lineInput: '[2022-03-29 20:59:43:500]', actions: mockActions.date })).toEqual(expect.objectContaining({ date: '1648580383500' }));
            //expect(lineDestructor({ lineInput: '[2022-03-29 20:59:43]', actions: mockActions.date })).toEqual(expect.objectContaining({ date: '1648580383000' }));
        });
        test('RETURNS property date as unix time in millisecons GIVEN  line with valid date', () => {
            expect(lineDestructor({ lineInput: '[2022-03-29 20:59:43:300]', actions: mockActions.date })).toEqual(expect.objectContaining({ date: '1648580383300' }));
            expect(lineDestructor({ lineInput: '[2022-03-29 20:59:43:500]', actions: mockActions.date })).toEqual(expect.objectContaining({ date: '1648580383500' }));
            expect(lineDestructor({ lineInput: '[2022-03-29 20:59:43]', actions: mockActions.date })).toEqual(expect.objectContaining({ date: '1648580383000' }));
        });
        test('RETURNS property date as null GIVEN  line with invalid date', () => {
            expect(lineDestructor({ lineInput: '[2022-03-32 20:59:43]', actions: mockActions.date })).toEqual(expect.objectContaining({ date: null }));
            expect(lineDestructor({ lineInput: '[2022-13-29 20:59:43:123]', actions: mockActions.date })).toEqual(expect.objectContaining({ date: null }));
        });
    });
});
