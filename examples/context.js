var React = require('../src/index');

// All declarations must be transformed from jsx to js.
// Also you must remove all propTypes (in case of babel, you can use transform-react-remove-prop-types).
var Component = React.createClass({
    render: function () {
        return React.createElement('div', {
            className: 'text',
            dangerouslySetInnerHTML: {__html: this.context.content}
        });
    }
});

var ComponentWrapper = React.createClass({
    getDefaultProps: function () {
        return {
            content: 'Some <b>bold</b> text'
        };
    },

    getChildContext: function () {
        return {
            content: this.props.content
        };
    },

    render: function () {
        return React.createElement(Component);
    }
});

var element = React.createElement(ComponentWrapper);
console.log(React.renderToString(element));
