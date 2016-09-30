# React Server [![Build Status](https://travis-ci.org/alt-j/fast-react-server.svg?branch=master)](https://travis-ci.org/alt-j/react-server) [![Coverage Status](https://coveralls.io/repos/github/alt-j/fast-react-server/badge.svg?branch=master)](https://coveralls.io/github/alt-j/fast-react-server?branch=master)

It's high speed react mock for server rendering.
You can use it with [fast react render](https://github.com/alt-j/fast-react-render), in that case render will be **12 times as fast** (see [benchmarks](https://github.com/alt-j/react-server-benchmark)) as [traditional react rendering](https://facebook.github.io/react/docs/environments.html) (in production mode).

## Quick start
```sh
npm install fast-react-render fast-react-server
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

If you want use it, you must remember: each component, which you want render, you must declared with this mock (configure you build system for that).

Also fast react server support [ES6 classes](https://facebook.github.io/react/docs/reusable-components.html#es6-classes) and [Stateless Functions](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) (see examples: [es6](examples/es6.jsx) and [stateless-function](examples/stateless-function.js)).

More examples:
- tiny [seed project](https://github.com/alt-j/fast-react-seed) (in progress);
- [examples](examples/) for main features.

## Cache
Fast react server support cache for component which implement in [fast react render](https://github.com/alt-j/fast-react-render).
See how it use [here](https://github.com/alt-j/fast-react-render#cache).
