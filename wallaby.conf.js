module.exports = function () {
    return {
        files: ['src/**/*.js'],

        tests: ['test/**/*Spec.js'],
        filesWithNoCoverageCalculated: ['mock/**/*Mock.js'],
    };
};
