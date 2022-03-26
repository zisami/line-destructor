exports.lineDestructor = function ({ lineInput, actions } = {}) {
    if (!lineInput || typeof lineInput === 'number' || typeof lineInput === 'boolean') return null;
    if (typeof lineInput !== 'string') {
        lineInput = JSON.stringify(lineInput);
    }
    let lineData = {
        original: lineInput,
    };
    if (actions) {
        lineData = actions.reduce(runAction(), lineData);
    }
    return lineData;

    function runAction() {
        return (lineData, action) => {
            let lineDataNew = { ...lineData };
            const patternMatch = lineData.original.match(action.pattern);
            if (patternMatch) {
                const valueFormModifyer = { [action.paramName]: action.modify({ patternMatch }) };
                if (!lineData[action.paramName]) {
                    lineDataNew = { ...lineDataNew, ...valueFormModifyer };
                }
            }
            return lineDataNew;
        };
    }
};
