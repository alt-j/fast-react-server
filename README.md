# React Server [![Build Status](https://travis-ci.org/alt-j/fast-react-server.svg?branch=master)](https://travis-ci.org/alt-j/react-server)

It's high speed react mock for server rendering.
You can use it with [fast react render](https://github.com/alt-j/fast-react-render), in that case render will be **15 times as fast** (see [benchmarks](https://github.com/alt-j/react-server-benchmark)) as [traditional react rendering](https://facebook.github.io/react/docs/environments.html) (in production mode).

## Quick start
```sh
npm install fast-react-render
npm install fast-react-server
```

```js
var React = require('fast-react-server');
var ReactRender = require('fast-react-render');

var element = React.createElement(
    React.createClass({
        render: function () {
            return React.createElement('div', {}, this.props.text);
        }
    }),
    {text: 'some text'}
);
console.log(ReactRender.elementToString(element));
```

If you want use it, you must remember:

1. each component, which you want render, you must declared with this mock (configure you build system for that);
2. all propTypes must be removed (in case of babel, you can use [transform-react-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types) for this).

See examples of using: [examples](examples/).

## Cache
Fast react server support cache for component which implement in [fast react render](https://github.com/alt-j/fast-react-render).
See how it use [here](https://github.com/alt-j/fast-react-render#cache).

## Future
Today we doesn't support [ES6 classes](https://facebook.github.io/react/docs/reusable-components.html#es6-classes) and [Stateless Functions](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions), but we'll do it [soon](issues/10).
