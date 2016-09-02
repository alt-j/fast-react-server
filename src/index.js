var extend = require('./utils/extend');

module.exports = {
    Component: function (props, context) {
        this.props = props;
        this.context = context;
    },

    /**
     * @param {Object} decl React component declaration.
     * @returns {Function}
     */
    createClass: function (decl) {
        var mixins = Array.isArray(decl.mixins) ? decl.mixins : [];
        var proto = extend.apply(this, mixins.concat([decl]));

        proto.setState = function (data) {
            this.state = extend(this.state, data);
        };

        var defaultProps = proto.getDefaultProps ? proto.getDefaultProps() : {};

        var Component = function (props, context) {
            this.props = extend(defaultProps, props);
            this.state = this.getInitialState ? this.getInitialState() : {};
            this.context = context;
        };

        Component.prototype = extend(proto);

        return Component;
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
            props: extend(type && type.defaultProps, props, {children: children})
        };
    }
};
