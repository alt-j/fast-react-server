var REACT_MARK = '<!---->';
var REACT_MARK_PATTERN = new RegExp(REACT_MARK, 'g');

var ATTRS_TYPES = ['string', 'boolean', 'number'];

var extend = require('./utils/extend');

var escapeHtml = require('./utils/escape/html');
var escapeAttr = require('./utils/escape/attr');

var dasherize = require('./utils/dasherize');

module.exports = {
    /**
     * @param {Object} decl React component declaration.
     * @returns {Function} render
     */
    createClass: function (decl) {
        var executedDecl = {
            props: decl.getDefaultProps ? decl.getDefaultProps() : {},
            state: decl.getInitialState ? decl.getInitialState() : {},
            context: {},

            setState: function (data) {
                this.state = extend(this.state, data);
            }
        };

        var mixins = Array.isArray(decl.mixins) ? decl.mixins : [];
        var instanceBlank = extend.apply(this, mixins.concat([decl, executedDecl]));

        /**
         * @param {Object} [props] Properties list.
         * @returns {String} html
         */
        return function (props) {
            var instance = extend(instanceBlank);

            instance.props = extend(instance.props, props);

            if (instance.componentWillMount) {
                instance.componentWillMount();
            }

            return instance.render() || '';
        };
    },

    /**
     * @param {Function|String} element Renderer function or name of tag.
     * @param {Object} [props] Properties list.
     * @param {String} [child] Child.
     * @returns {String} html
     */
    createElement: function (element, props, child) {
        props = props || {};

        if (typeof element === 'string') {
            var content = '';
            if (props.dangerouslySetInnerHTML) {
                content = props.dangerouslySetInnerHTML.__html;
            } else if (child) {
                var children = [];

                var i = arguments.length;
                while (i-- > 2) {
                    children[i] = arguments[i];
                }

                content = renderChildren(children);
            }

            return REACT_MARK + '<' + element + renderAttrs(props) + '>' + content + '</' + element + '>';
        } else if (typeof element === 'function') {
            var params = extend(props);
            params.children = child;

            return element && element(params);
        }

        return '';
    },

    /**
     * @param {String} html
     * @returns {String} html Code without extra symbols, which use during the rendering.
     */
    cleanHtml: function (html) {
        return html.replace(REACT_MARK_PATTERN, '');
    }
};

/**
 * @param {String[]|String[][]} children
 * @returns {String} html
 */
function renderChildren(children) {
    var str = '';

    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (typeof child === 'string') {
            str += child.indexOf(REACT_MARK) === 0 ? child : escapeHtml(child);
        } else if (Array.isArray(child)) {
            str += renderChildren(child);
        } else if (typeof child === 'number') {
            str += child;
        }
    }

    return str;
}

/**
 * @param {Object} attrs
 * @returns {String} str
 */
function renderAttrs(attrs) {
    var str = '';

    for (var key in attrs) {
        var value = key === 'style' ? styleToString(attrs[key]) : attrs[key];

        if (!value ||
            key === 'key' ||
            ATTRS_TYPES.indexOf(typeof value) === -1
        ) {
            continue;
        }

        var attr = key;
        if (key === 'htmlFor') {
            attr = 'for';
        } else if (key === 'className') {
            attr = 'class';
        }

        str += ' ' + attr;

        if (typeof value !== 'boolean') {
            str += '="' + (typeof value === 'string' ? escapeAttr(value) : value) + '"';
        }
    }

    return str;
}

/**
 * @param {Object} style
 * @returns {String} result
 */
function styleToString(style) {
    var str = '';
    for (var property in style) {
        str += dasherize(property) + ': ' + style[property] + ';';
    }
    return str;
}
