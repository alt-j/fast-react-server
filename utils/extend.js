/**
 * @param {...Object} source
 * @returns {Object} result
 */
module.exports = function (source) {
    var result = {};

    var i = 0;
    while (i < arguments.length) {
        var object = arguments[i++];

        for (var key in object) {
            result[key] = object[key];
        }
    }

    return result;
};
