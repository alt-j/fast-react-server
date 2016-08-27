var PATTERN = /[&<>]/;

/**
 * @param {String} value
 * @returns {String} result
 */
module.exports = function (value) {
    if (!PATTERN.test(value)) {
        return value;
    }

    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};
