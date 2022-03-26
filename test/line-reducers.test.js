const { test, expect } = require('@jest/globals');
const { lineDestructor } = require('../src/line-destructor');
const { lineReducers } = require('../src/line-reducers')
const { mockLine } = require('../mock/line.Mock');

describe('run destructuring commands', () => {
    describe('Date', () => {
        test('RETURNS property date as unix time in millisecons GIVEN  line with valid date', () => {
            expect(lineDestructor({ lineInput: '[2022-03-29 20:59:43:300]', actions: lineReducers.date })).toEqual(expect.objectContaining({ date: '1648580383300' }));
            expect(lineDestructor({ lineInput: '[2022-03-29 20:59:43:500]', actions: lineReducers.date })).toEqual(expect.objectContaining({ date: '1648580383500' }));
            expect(lineDestructor({ lineInput: '[2022-03-29 20:59:43]', actions: lineReducers.date })).toEqual(expect.objectContaining({ date: '1648580383000' }));
        });
        test('RETURNS property date as unix time in millisecons GIVEN  line with valid date', () => {
            expect(lineDestructor({ lineInput: '[2022-03-29 20:59:43:300]', actions: lineReducers.date })).toEqual(expect.objectContaining({ date: '1648580383300' }));
            expect(lineDestructor({ lineInput: '[2022-03-29 20:59:43:500]', actions: lineReducers.date })).toEqual(expect.objectContaining({ date: '1648580383500' }));
            expect(lineDestructor({ lineInput: '[2022-03-29 20:59:43]', actions: lineReducers.date })).toEqual(expect.objectContaining({ date: '1648580383000' }));
        });
        test('RETURNS property date as null GIVEN  line with invalid date', () => {
            expect(lineDestructor({ lineInput: '[2022-03-32 20:59:43]', actions: lineReducers.date })).toEqual(expect.objectContaining({ date: null }));
            expect(lineDestructor({ lineInput: '[2022-13-29 20:59:43:123]', actions: lineReducers.date })).toEqual(expect.objectContaining({ date: null }));
        });
    });
    describe('logLevel', () => {
        test('RETURNS property logLevel GIVEN  line with valid  Log level', () => {
            expect(lineDestructor({ lineInput: '[2022-03-29 20:59:43:300] INFO', actions: lineReducers.logLevel })).toEqual(expect.objectContaining({ logLevel: 'INFO' }));
            expect(lineDestructor({ lineInput: 'ERROR', actions: lineReducers.logLevel })).toEqual(expect.objectContaining({ logLevel: 'ERROR' }));
        });
        test('RETURNS property logLevel as null GIVEN  line with no  Log level', () => {
            expect(lineDestructor({ lineInput: '[2022-03-29 20:59:43]', actions: lineReducers.logLevel })).toEqual(expect.not.objectContaining({ logLevel: null }));
        });
    });
});
