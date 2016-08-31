var extend = require('./utils/extend');

module.exports = {
    /**
     * @param {Object} decl React component declaration.
     * @returns {Function}
     */
    createClass: function (decl) {
        var mixins = Array.isArray(decl.mixins) ? decl.mixins : [];
        var blank = extend.apply(this, mixins.concat([decl]));

        blank.props = blank.getDefaultProps ? blank.getDefaultProps() : {};
        blank.state = blank.getInitialState ? blank.getInitialState() : {};

        blank.setState = function (data) {
            this.state = extend(this.state, data);
        };

        /**
         * @param {Object} [props]
         * @param {Object} [context]
         * @returns {Function}
         */
        return function (props, context) {
            var instance = extend(blank);

            instance.props = extend(instance.props, props);
            instance.context = context;

            if (instance.componentWillMount) {
                instance.componentWillMount();
            }

            return instance;
        };
    },

    /**
     * @param {Function|String} type
     * @param {Object} [props]
     * @param {...String} [child]
     * @returns {RenderElement} element
     */
    createElement: function (type, props, child) {
        var children = [];

        var i = arguments.length;
        while (i-- > 2) {
            children[i - 2] = arguments[i];
        }

        return {
            type: type,
            props: extend(props, {children: children})
        };
    }
};
