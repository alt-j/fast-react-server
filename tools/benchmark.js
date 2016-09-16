var run = require('fast-react-benchmark/run');
var tests = require('fast-react-benchmark/tests');

var ReactRender = require('fast-react-render');
var ReactServer = require('../src/index');

run({
    'FastReactServer + FastReactRender': tests['FastReactServer + FastReactRender'],

    'This + FastReactRender': {
        engine: ReactServer,
        run: function (listView, dataSet) {
            var element = ReactServer.createElement(listView, dataSet);
            return ReactRender.elementToString(element);
        }
    }
}, process.env.CHILDREN_COUNT || 100);
