/* eslint-disable no-console */

var React = require('../src/index');
var ReactRender = require('fast-react-render');

var LRU = require('lru-cache');
var cache = LRU({
    max: 500,
    maxAge: 60 * 60
});

// Transform all es6 to es5 and jsx to js, before execution.
// Also you must remove all propTypes (in case of babel, you can use transform-react-remove-prop-types).
var Component = React.createClass({
    displayName: 'Component',

    getDefaultProps: function () {
        return {
            content: 'Some <b>bold</b> text'
        };
    },

    getCacheKey: function () {
        return this.props.content;
    },

    render: function () {
        return React.createElement('div', {
            className: 'text',
            dangerouslySetInnerHTML: {__html: this.props.content}
        });
    }
});

console.log(
    ReactRender.elementToString(
        React.createElement(Component),
        {cache: cache}
    )
);

// Render from cache
console.log(
    ReactRender.elementToString(
        React.createElement(Component, {content: 'Some <b>bold</b> text'}),
        {cache: cache}
    )
);
