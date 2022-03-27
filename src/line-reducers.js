const moment = require('moment');

exports.lineReducers = {
    date: [
        {
            propertyName: 'date',
            pattern: /\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}:\d{3}\]/gm,
            modify: ({ patternMatch } = {}) => {
                if (!patternMatch) return null;
                const timeString = patternMatch[0].replace(/\[|\]/g, '');
                const dateInMiliSec = moment(timeString, 'YYYY-MM-DD HH:mm:ss:SSS').format('x'); //?
                if (dateInMiliSec && dateInMiliSec !== 'Invalid date') {
                    return dateInMiliSec;
                }
                return null;
            },
        },
        {
            propertyName: 'date',
            pattern: /\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\]/gm,
            modify: ({ patternMatch } = {}) => {
                if (!patternMatch) return null;
                const timeString = patternMatch[0].replace(/\[|\]/g, '');
                const dateInSec = moment(timeString, 'YYYY-MM-DD HH:mm:ss').format('x');
                if (dateInSec && dateInSec !== 'Invalid date') {
                    return dateInSec;
                }
                return null;
            },
        },
    ],
    dateTime: [
        {
            propertyName: 'dateTime',
            pattern: /(?<year>[1-2][0-9][0-9][0-9])\W(?<month>0[1-9]|1[0-2])\W(?<day>[0-2][1-9]|3[0-1])\W(?<hour>[0-1][0-9]|2[0-4])\W(?<minute>[0-5][0-9])\W(?<second>[0-5][0-9])\W?(?<millisecond>[0-9][0-9][0-9])?\W?(?<microsecond>[0-9][0-9][0-9])?\W?(?<nanosecond>[0-9])?/gm,
            modify: ({ patternMatch, pattern, lineDataNew } = {}) => {
                if (!patternMatch) return null;
                const {
                    groups: { year, month, day, hour, minute, second, millisecond, microsecond, nanosecond },
                } = pattern.exec(lineDataNew.lineRest);
                const dateTime = { year, month, day, hour, minute, second, millisecond, microsecond, nanosecond };
                for (const timeUnit in dateTime) {
                    if (Object.hasOwnProperty.call(dateTime, timeUnit)) {
                        dateTime[timeUnit] = parseInt(dateTime[timeUnit]) || 0;
                        if(timeUnit === 'nanosecond' && dateTime[timeUnit] > 0 && dateTime[timeUnit] <= 9 ){
                            dateTime[timeUnit] *= 100;
                        }
                    }
                }
                return dateTime || null;
            },
        },
    ],
    logLevel: [
        {
            propertyName: 'logLevel',
            pattern: /(TRACE|DEBUG|INFO|NOTICE|WARN|WARNING|ERROR|SEVERE|FATAL)/gm,
            modify: ({ patternMatch } = {}) => {
                if (!patternMatch?.[0]) return null;
                return patternMatch[0]; //?
            },
        },
    ],
};
