exports.lineDestructor = function ({ lineInput, actions } = {}) {
    if (!lineInput || typeof lineInput === 'number' || typeof lineInput === 'boolean') return null;
    if (typeof lineInput !== 'string') {
        lineInput = JSON.stringify(lineInput);
    }
    let lineData = {
        lineOrig: lineInput,
        lineRest: lineInput,
    };
    if (actions) {
        lineData = actions.reduce(runAction(), lineData);
    }
    return lineData;

    function runAction() {
        return (lineData, action) => {
            const patternMatch = lineData.lineRest.match(action.pattern);
            let lineDataNew = { ...lineData };
            if (patternMatch) {
                const valueFormModifyer = { [action.paramName]: action.modify({ patternMatch }) };
                if (!lineData[action.paramName]) {
                    lineDataNew = { ...lineDataNew, ...valueFormModifyer };
                }
                lineDataNew.lineRest = lineDataNew.lineRest.replace(action.pattern,'').trim();
            }

            return lineDataNew;
        };
    }
};


