/* eslint-disable no-console */

var React = require('../src/index');
var ReactRender = require('fast-react-render');

// Transform all es6 to es5 and jsx to js, before execution.
function Text(props) {
    return React.createElement('div', {className: 'text'}, props.text);
}

var element = React.createElement(Text, {text: 'test'});
console.log(ReactRender.elementToString(element));
