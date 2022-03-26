const moment = require('moment');


exports.lineReducers = {
    date: [
        {
        propertyName: 'date',
        pattern: /\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}:\d{3}\]/gm,
        modify: ({ patternMatch } = {}) => {
            if (!patternMatch) return null;
            const timeString = patternMatch[0].replace(/\[|\]/g, '')
            const dateInMiliSec = moment(timeString, 'YYYY-MM-DD HH:mm:ss:SSS').format('x');//?
            if(dateInMiliSec && dateInMiliSec !== 'Invalid date'){
                return dateInMiliSec;
            }
            return null
        }
    },
    {
        propertyName: 'date',
        pattern: /\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\]/gm,
        modify: ({ patternMatch } = {}) => {
            if (!patternMatch) return null;
            const timeString = patternMatch[0].replace(/\[|\]/g, '')
            const dateInSec = moment(timeString, 'YYYY-MM-DD HH:mm:ss').format('x');
            if(dateInSec && dateInSec !== 'Invalid date'){
                return dateInSec;
            }
            return null
        }
    }],
    logLevel: [
        {
        propertyName: 'logLevel',
        pattern: /(TRACE|DEBUG|INFO|NOTICE|WARN|WARNING|ERROR|SEVERE|FATAL)/gm,
        modify: ({ patternMatch } = {}) => {
            if (!patternMatch?.[0] ) return null;
            return patternMatch[0];//?
        }
    }]
}
