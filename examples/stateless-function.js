var React = require('../src/index');
var ReactRender = require('fast-react-render');

// Transform all es6 to es5 and jsx to js, before execution.
// Also you must remove all propTypes (in case of babel, you can use transform-react-remove-prop-types).
function Text(props) {
    return React.createElement('div', {className: 'text'}, props.text);
}

var element = React.createElement(Text, {text: 'test'});
console.log(ReactRender.elementToString(element));
