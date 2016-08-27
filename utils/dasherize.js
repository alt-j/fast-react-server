var PATTERN = /([^A-Z]+)([A-Z])/g;

/**
 * @param {String} str
 * @returns {String} result
 */
module.exports = function (str) {
    return str.replace(PATTERN, '$1-$2').toLowerCase();
};
