/**
 * @param {String} value
 * @returns {String} result
 */
module.exports = function (value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};
