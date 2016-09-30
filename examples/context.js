/* eslint-disable no-console */

var React = require('../src/index');
var ReactRender = require('fast-react-render');

// Transform all es6 to es5 and jsx to js, before execution.
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
            content: 'Chain: '
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
            this.props.content + this.context.counter + ', ',
            React.createElement(Component)
        );
    }
});

console.log(
    ReactRender.elementToString(
        React.createElement(ComponentWrapper),
        {
            context: {
                counter: 0
            }
        }
    )
);
