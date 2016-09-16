var run = require('fast-react-benchmark/run');

var ReactRender = require('fast-react-render');
var ReactServer = require('../src/index');

run({
    'FastReactServer + FastReactRender': {
        engine: ReactServer,
        run: function (listView, dataSet) {
            var element = ReactServer.createElement(listView, dataSet);
            return ReactRender.elementToString(element);
        }
    }
}, process.env.CHILDREN_COUNT || 100);
