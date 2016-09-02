var React = require('../src/index');
var ReactRender = require('fast-react-render');

// Transform all es6 to es5 and jsx to js, before execution.
// Also you must remove all propTypes (in case of babel, you can use transform-react-remove-prop-types).
var ComponentBase = {
    getDefaultProps: function () {
        return {
            text: 'Some <b>bold</b> text'
        };
    },

    renderText: function () {
        return React.createElement('div', {
            className: 'text',
            dangerouslySetInnerHTML: {__html: this.props.text}
        });
    }
};

var Component = React.createClass({
    mixins: [ComponentBase],

    render: function () {
        return React.createElement('div', null, this.renderText());
    }
});

var element = React.createElement(Component);
console.log(ReactRender.elementToString(element));
