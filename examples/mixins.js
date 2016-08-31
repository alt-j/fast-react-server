var React = require('../src/index');
var ReactRender = require('fast-react-render');

// All declarations must be transformed from jsx to js.
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
