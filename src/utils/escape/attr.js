/**
 * @param {String} value
 * @returns {String} result
 */
module.exports = function (value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;');
};
