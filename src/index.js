var PropTypes = require('prop-types');

var children = require('./utils/children');
var extend = require('./utils/extend');

var FastReactServer = {
    Component: function (props, context) {
        this.props = props;
        this.context = context;
    },

    Children: children,

    PropTypes: PropTypes,

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

        var Component = function (props, context) {
            this.props = props;
            this.context = context;

            this.state = this.getInitialState ? this.getInitialState() : {};
        };

        Component.defaultProps = proto.getDefaultProps ? proto.getDefaultProps() : {};

        if (decl.statics) {
            for (var method in decl.statics) {
                Component[method] = decl.statics[method];
            }
        }

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
        var children = child;

        var i = arguments.length;
        if (i > 3) {
            children = [];

            while (i-- > 2) {
                children[i - 2] = arguments[i];
            }
        }

        return {
            type: type,
            props: extend(type && type.defaultProps, props, {children: children})
        };
    },

    /**
     * @param {RenderElement} element
     * @param {Object} [props]
     * @param {...String} [child]
     * @returns {RenderElement} newElement
     */
    cloneElement: function (element, props) {
        var newArgs = [element.type, extend(element.props, props)];

        var i = arguments.length;
        while (i-- > 2) {
            newArgs[i] = arguments[i];
        }

        return this.createElement.apply(this, newArgs);
    }
};

FastReactServer.PropTypes.element = FastReactServer.PropTypes.instanceOf(FastReactServer.Component);
FastReactServer.PropTypes.node = FastReactServer.PropTypes.object;

module.exports = FastReactServer;
