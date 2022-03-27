const { test, expect } = require('@jest/globals');
const { lineDestructor } = require('../src/line-destructor');
const { lineReducers } = require('../src/line-reducers');
const { mockLine } = require('../mock/line.Mock');

describe('run destructuring commands', () => {
    describe('missing arguments and error cases', () => {
        test('All modifiers RETURN null GIVEN  no patternMatch', () => {
            function runAllReducersWith(lineReducers) {
                return Object.keys(lineReducers).some((reducerSet) => {
                    return lineReducers[reducerSet].some((reducer) => reducer.modify({}));
                });
            }
            expect(runAllReducersWith(lineReducers)).toEqual(false);
        });
    });
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
    describe('Date Time Object', () => {
        test('RETURNS property dateTime as object with time units as numbers GIVEN  line with valid date', () => {
            expect(lineDestructor({ lineInput: '[2022-03-29 20:59:43:300]', actions: lineReducers.dateTime })).toEqual(
                expect.objectContaining({
                    dateTime: expect.objectContaining({
                        year: 2022,
                        month: 3,
                        day: 29,
                        hour: 20,
                        minute: 59,
                        second: 43,
                        millisecond: 300,
                        microsecond: 0,
                        nanosecond: 0
                    }),
                })
            );
        });
        test('RETURNS property dateTime.nanosecond * 100 GIVEN  line with valid 1 digit nanoocond', () => {
            expect(lineDestructor({ lineInput: '[1979-04-30 12:12:12.1234567]', actions: lineReducers.dateTime })).toEqual(
                expect.objectContaining({
                    dateTime: expect.objectContaining({
                        millisecond: 123,
                        microsecond: 456,
                        nanosecond: 700,
                    }),
                })
            );
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
