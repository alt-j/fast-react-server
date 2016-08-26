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

        if (typeof element !== 'string') {
            var params = extend({children: child}, props);
            return element && element(params);
        }

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
 * @param {String[]|String[][]} children
 * @returns {String} html
 */
function renderChildren(children) {
    var str = '';

    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (Array.isArray(child)) {
            str += renderChildren(child);
        } else if (typeof child === 'number') {
            str += child;
        } else if (typeof child === 'string') {
            str += child.indexOf(REACT_MARK) === 0 ? child : escapeHtml(child);
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

    var keys = Object.keys(attrs);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = (key === 'style' && typeof attrs[key] === 'object') ?
            hashToString(attrs[key]) : attrs[key];

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
            str += '="' + escapeAttr(value) + '"';
        }
    }

    return str;
}

/**
 * @param {Object} hash
 * @returns {String} result
 */
function hashToString(hash) {
    var str = '';

    var keys = Object.keys(hash);
    for (var i = 0; i < keys.length; i++) {
        str += keys[i] + ': ' + hash[keys[i]] + ';';
    }

    return str;
}

/**
 * @param {String} value
 * @returns {String} result
 */
function escapeAttr(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;');
}

/**
 * @param {String} value
 * @returns {String} result
 */
function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
