var React = require('../src/index');
var ReactRender = require('fast-react-render');

// Transform all es6 to es5 and jsx to js, before execution.
// Also you must remove all propTypes (in case of babel, you can use transform-react-remove-prop-types).
var Component = React.createClass({
    getDefaultProps: function () {
        return {
            content: 'Some <b>bold</b> text'
        };
    },

    render: function () {
        return React.createElement('div', {
            className: 'text',
            dangerouslySetInnerHTML: {__html: this.props.content}
        });
    }
});

var element = React.createElement(Component);
console.log(ReactRender.elementToString(element));
