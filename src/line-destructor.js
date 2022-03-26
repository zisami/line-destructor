exports.lineDestructor = function ({ lineInput, actions } = {}) {
    if (!lineInput || typeof lineInput === 'number' || typeof lineInput === 'boolean') return null;
    if (typeof lineInput !== 'string') {
        lineInput = JSON.stringify(lineInput);
    }
    let lineData = {
        original: lineInput,
    };
    if (actions) {
        actions.map(runAction(lineInput)).forEach((actionvalue) => {
            if (!lineData[Object.keys(actionvalue)[0]]) {
                lineData = {...lineData, ...actionvalue}
            }
        });
    } 
    return lineData; //?

    function runAction(lineInput) {
        return (action) => {
            const valueFromAction = {};
            valueFromAction[action.paramName] = action.modify({ patternMatch: lineInput.trim().match(action.pattern) });
            return valueFromAction;
        };
    }
};
