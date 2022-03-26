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
        lineData = actions.reduce(runModifier(), lineData);
    }
    return lineData;

    function runModifier() {
        return (lineData, action) => {
            const patternMatch = lineData.lineRest.match(action.pattern);
            if (!patternMatch) return lineData;

            let lineDataNew = { ...lineData };
            const valueFormModifyer = { [action.propertyName]: action.modify({ patternMatch }) };
            if (!lineData[action.propertyName]) {
                lineDataNew = { ...lineDataNew, ...valueFormModifyer };
            }
            lineDataNew.lineRest = lineDataNew.lineRest.replace(action.pattern, '').trim();

            return lineDataNew;
        };
    }
};
