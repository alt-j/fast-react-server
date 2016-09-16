/* eslint-disable no-console */

import React from  '../src/index';
import ReactRender from 'fast-react-render';

// Transform all es6 to es5 and jsx to js, before execution.
// Also you must remove all propTypes (in case of babel, you can use transform-react-remove-prop-types).
class Text extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: this.props.text};
    }

    static defaultProps = {
        text: 'some text here'
    }

    render() {
        return <div>{this.state.text}</div>;
    }
}

const element = React.createElement(Text, {text: 'test'});
console.log(ReactRender.elementToString(element));

