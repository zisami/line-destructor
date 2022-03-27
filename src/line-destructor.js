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
        return (lineData, reducer) => {
            const patternMatch = lineData.lineRest.match(reducer.pattern);
            if (!patternMatch) return lineData;
            let lineDataNew = { ...lineData };
            const valueFormModifyer = { [reducer.propertyName]: reducer.modify?.({patternMatch, lineDataNew,...reducer }) };
            if (!lineData[reducer.propertyName]) {
                lineDataNew = { ...lineDataNew, ...valueFormModifyer };
            }
            lineDataNew.lineRest = lineDataNew.lineRest.replace(reducer.pattern, '').trim();

            return lineDataNew;
        };
    }
};
