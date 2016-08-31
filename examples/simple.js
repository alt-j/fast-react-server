var React = require('../src/index');
var ReactRender = require('fast-react-render');

// All declarations must be transformed from jsx to js.
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
