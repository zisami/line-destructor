const moment = require('moment');


exports.mockActions = {
    date: [
        {
        paramName: 'date',
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
        paramName: 'date',
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
};
