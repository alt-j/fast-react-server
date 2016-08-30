var React = require('../src/index');

// All declarations must be transformed from jsx to js.
// Also you must remove all propTypes (in case of babel, you can use transform-react-remove-prop-types).
var ComponentInner = React.createClass({
    render: function () {
        return React.createElement('span', {className: 'final'}, this.context.counter);
    }
});

var Component = React.createClass({
    getChildContext: function () {
        return {
            counter: this.context.counter + 1
        };
    },

    render: function () {
        return React.createElement(
            'span',
            null,
            this.context.counter + ', ',
            React.createElement(ComponentInner)
        );
    }
});

var ComponentWrapper = React.createClass({
    getDefaultProps: function () {
        return {
            content: 'Chain: 0, '
        };
    },

    getChildContext: function () {
        return {
            counter: 1
        };
    },

    render: function () {
        return React.createElement(
            'div',
            {},
            this.props.content,
            React.createElement(Component)
        );
    }
});

var element = React.createElement(ComponentWrapper);
console.log(React.renderToString(element));
