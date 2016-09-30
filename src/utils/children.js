var extend = require('./extend');

module.exports = {
    /**
     * @param {Object[]|Object} [children]
     * @returns {Object[]} children
     */
    toArray: function (children) {
        var childrenArray = toArray(children);

        var result = [];

        var i = childrenArray.length;
        while (--i >= 0) {
            result[i] = extend({key: i}, childrenArray[i]);
        }

        return result;
    },

    /**
     * @param {Object[]|Object} [children]
     * @returns {Number} count
     */
    count: function (children) {
        return Array.isArray(children) ? children.length : (children ? 1 : 0);
    },

    /**
     * @param {Object[]|Object} [children]
     * @returns {Object|null} children
     */
    only: function (children) {
        return !Array.isArray(children) ? children : null;
    },

    /**
     * @param {Object[]|Object} [children]
     * @param {Function} callback
     * @param {Function} [thisArg]
     * @returns {*} result
     */
    map: function (children, callback, thisArg) {
        if (!children) {
            return children;
        }

        var childrenArray = toArray(children);

        var result = [];

        var i = childrenArray.length;
        while (--i >= 0) {
            result[i] = callback.call(thisArg || this, childrenArray[i], i);
        }

        return result;
    },

    /**
     * @param {Object[]|Object} [children]
     * @param {Function} callback
     * @param {Function} [thisArg]
     */
    forEach: function (children, callback, thisArg) {
        if (!children) {
            return children;
        }

        var childrenArray = toArray(children);

        var i = childrenArray.length;
        while (--i >= 0) {
            callback.call(thisArg || this, childrenArray[i], i);
        }
    }
};

/**
 * @param {Object[]|Object} [children]
 * @returns {Object[]} children
 */
function toArray(children) {
    return Array.isArray(children) ? children : (children ? [children] : []);
}
