var React = require('../src/index');

var LRU = require('lru-cache');
var cache = LRU({
    max: 500,
    maxAge: 60 * 60
});

// All declarations must be transformed from jsx to js.
// Also you must remove all propTypes (in case of babel, you can use transform-react-remove-prop-types).
var component = React.createClass({
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
})

console.log(
    React.renderToString(
        React.createElement(component),
        cache
    )
);

// Render from cache
console.log(
    React.renderToString(
        React.createElement(
            component,
            {content: 'Some <b>bold</b> text'}
        ),
        cache
    )
);
