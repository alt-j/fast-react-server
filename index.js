var extend = require('node.extend');

var REACT_MARK = '<!---->';
var ATTRS_TYPES = ['string', 'boolean', 'number'];

module.exports = {
    /**
     * @param {Object} decl React component declaration.
     * @returns {Function} render
     */
    createClass: function (decl) {
        var instanceBlank = extend({}, decl, {
            props: extend({}, decl.getDefaultProps ? decl.getDefaultProps() : {}),
            state: decl.getInitialState ? decl.getInitialState() : {},
            context: {},

            setState: function (data) {
                extend(this.state, data);
            }
        });

        /**
         * @param {Object} [props] Properties list.
         */
        return function (props) {
            var instance = extend({}, instanceBlank);

            extend(instance.props, props);
            instance.setState = instance.setState.bind(instance);

            if (instance.componentWillMount) {
                instance.componentWillMount();
            }

            return instance.render() || '';
        };
    },

    /**
     * @param {Function|String} element Renderer function or name of tag.
     * @param {Object} [props] Properties list.
     * @param {String} [children] Children.
     * @returns {String} html
     */
    createElement: function (element, props, children) {
        props = props || {};

        if (typeof element !== 'string') {
            var params = extend({children: children}, props);
            return element && element(params);
        }

        var content = '';
        if (children) {
            content = [].slice.call(arguments, 2).map(function (part) {
                return part.indexOf(REACT_MARK) !== 0 ? escapeHtml(part) : part;
            }).join('');
        } else if (props.dangerouslySetInnerHTML) {
            content = props.dangerouslySetInnerHTML.__html;
        }

        return REACT_MARK + '<' + element + renderAttrs(props) + '>' + content + '</' + element + '>';
    },

    /**
     * @param {String} html
     * @returns {String} html Code without extra symbols, which use during the rendering.
     */
    cleanHtml: function (html) {
        return html.replace(new RegExp(REACT_MARK, 'g'), '');
    }
};

/**
 * @param {Object} attrs
 * @returns {String} str
 */
function renderAttrs(attrs) {
    var str = '';

    Object.keys(attrs).forEach(function (key) {
        var value = attrs[key];

        if (!value ||
            key === 'key' ||
            ATTRS_TYPES.indexOf(typeof value) === -1
        ) {
            return;
        }

        var attr = key;
        if (key === 'htmlFor') {
            attr = 'for';
        } else if (key === 'className') {
            attr = 'class';
        }

        str += ' ' + attr.toLowerCase();

        if (typeof value !== 'boolean') {
            str += '="' + escapeAttr(value) + '"';
        }
    });

    return str;
}

/**
 * @param {String} value
 * @returns {String} result
 */
function escapeAttr(value) {
    if (value.indexOf('&') !== -1) {
        value = value.replace(/&/g, '&amp;');
    }
    if (value.indexOf('"') !== -1) {
        value = value.replace(/"/g, '&quot;');
    }
    return value;
}

/**
 * @param {String} value
 * @returns {String} result
 */
function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}
