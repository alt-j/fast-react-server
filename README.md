# React Server

[![Build Status](https://travis-ci.org/alt-j/react-server.svg?branch=master)](https://travis-ci.org/alt-j/react-server)
[![dependencies Status](https://david-dm.org/alt-j/react-server/status.svg)](https://david-dm.org/alt-j/react-server)
[![devDependencies Status](https://david-dm.org/alt-j/react-server/dev-status.svg)](https://david-dm.org/alt-j/react-server?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/alt-j/react-server/badge.svg?branch=master)](https://coveralls.io/github/alt-j/react-server?branch=master)

The module for rendering react-element in the server **15 times as fast** (see [benchmarks](https://github.com/alt-j/react-server-benchmark)) as [traditional react rendering](https://facebook.github.io/react/docs/environments.html) (in production mode).

## Quick start
```sh
npm install fast-react-server
```

```js
var React = require('fast-react-server');

var element = React.createElement(Component, {property: 'value'});
console.log(React.renderToString(element));
```

See examples of using: [examples](examples/).

## Cache

React server rendering support cache for component.

First of all, you must choose cache system. It can be any system, which implement ICache interface ([interface](src/interfaces/i-cache.js)).
For caching, component must implement ICacheableComponent interface ([interface](src/interfaces/i-cacheable-component.js)).

Example with using LRU cache: [render with LRU cache](examples/cache-render.js) (install `lru-cache` package first).

## What's inside?
High speed mock for react, which doesn't use any abstraction and transform all of your declarations to html (string) generators.
