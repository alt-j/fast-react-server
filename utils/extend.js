/**
 * @param {...Object} source
 * @returns {Object} result
 */
module.exports = function (source) {
    var result = {};

    var i = 0;
    while (i < arguments.length) {
        var source = arguments[i++];

        for (var key in source) {
            result[key] = source[key];
        }
    }

    return result;
};
