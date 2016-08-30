var uuid = require('uuid');

var extend = require('./utils/extend');
var elementToString = require('./render');

/**
 * @typedef {Object} RenderElement
 * @property {Function|String} element.component Renderer function or name of tag.
 * @property {Object} element.props Properties list.
 * @property {String[]|String[][]|Number[]|Number[][]} element.children Children.
 */

module.exports = {
    /**
     * @param {Object} decl React component declaration.
     * @returns {Function} render
     */
    createClass: function (decl) {
        var mixins = Array.isArray(decl.mixins) ? decl.mixins : [];
        var blank = extend.apply(this, mixins.concat([decl]));

        blank.props = blank.getDefaultProps ? blank.getDefaultProps() : {};
        blank.state = blank.getInitialState ? blank.getInitialState() : {};

        blank.setState = function (data) {
            this.state = extend(this.state, data);
        };

        var hasCache = typeof decl.getCacheKey === 'function';
        var cachePrefix = (decl.displayName || uuid.v1()) + '_';

        /**
         * @param {Object} [props] Properties list.
         * @param {Object} [options]
         * @param {ICache} [options.cache] Cache instance.
         * @param {Object} [options.context] Render context.
         * @returns {String} html
         */
        return function (props, options) {
            var instance = extend(blank);

            instance.props = extend(instance.props, props);
            instance.context = (options && options.context) || {};

            if (instance.componentWillMount) {
                instance.componentWillMount();
            }

            var cache = options.cache;
            var cacheKey = cache && hasCache ? cachePrefix + instance.getCacheKey() : null;

            if (cacheKey && cache.has(cacheKey)) {
                return cache.get(cacheKey);
            }

            var html = elementToString(instance.render(), {
                cache: cache,
                context: typeof instance.getChildContext === 'function' ?
                    extend(instance.context, instance.getChildContext()) : instance.context
            });

            if (cacheKey) {
                cache.set(cacheKey, html);
            }

            return html;
        };
    },

    /**
     * @param {Function|String} component Renderer function or name of tag.
     * @param {Object} [props] Properties list.
     * @param {String} [child] Child.
     * @returns {RenderElement} element
     */
    createElement: function (component, props, child) {
        var children = [];

        var i = arguments.length;
        while (i-- > 2) {
            children[i - 2] = arguments[i];
        }

        return {
            component: component,

            props: props || {},
            children: children
        };
    },

    /**
     * @param {RenderElement} element
     * @param {ICache} [cache]
     * @returns {String} html
     */
    renderToString: function (element, cache) {
        return elementToString(element, {cache: cache});
    }
};
