var chai = require('chai');
var expect = chai.expect;
var React = require('../index');

var Component = React.createClass({
    getDefaultProps: function () {
        return {
            content: function (id) {
                return 'Some <b>' + id + '</b> text';
            }
        };
    },

    getInitialState: function () {
        return {
            ids: ['one', 'two', 'three']
        };
    },

    render: function () {
        var items = this.state.ids.map(function (id, index) {
            return React.createElement(
                'div',
                {
                    key: id
                },
                React.createElement('label', {
                    htmlFor: id,
                    dangerouslySetInnerHTML: {__html: this.props.content(id)}
                }),
                React.createElement('input', {
                    type: 'text',
                    maxLength: index + 5,
                    readOnly: true,
                    id: id,
                    value: 'text'
                })
            );
        }, this);
        return React.createElement(
            'div',
            {
                className: 'items',
                style: {
                    backgroundColor: 'red',
                    position: 'relative'
                }
            },
            items,
            React.createElement('div', {}, '<a href="/">Main</a>'),
            'simple string'
        );
    }
});

describe('React', function () {
    describe('cleanHtml', function () {
        it('should be a function', function () {
            expect(React.cleanHtml).to.be.a('function');
        });

        it('should clean rendered string', function () {
            expect(React.cleanHtml('<!----><a>link</a>')).to.equal('<a>link</a>');
        });
    });

    describe('createClass', function () {
        it('should be a function', function () {
            expect(React.createClass).to.be.a('function');
        });

        it('should return a function', function () {
            expect(React.createClass({})).to.be.a('function');
        });
    });

    describe('createElement', function () {
        it('should be a function', function () {
            expect(React.createElement).to.be.a('function');
        });

        it('should render div as string', function () {
            expect(React.createElement('div')).to.equal('<!----><div></div>');
        });

        it('should render null object', function () {
            expect(React.createElement(null)).to.equal('');
        });

        it('should render big component', function () {
            var html = React.createElement(Component);
            var expectedString = '<div class="items" style="background-color: red;position: relative;">' +
                '<div><label for="one">Some <b>one</b> text</label>' +
                '<input type="text" maxlength="5" readonly id="one" value="text"></input></div>' +
                '<div><label for="two">Some <b>two</b> text</label>' +
                '<input type="text" maxlength="6" readonly id="two" value="text"></input></div>' +
                '<div><label for="three">Some <b>three</b> text</label>' +
                '<input type="text" maxlength="7" readonly id="three" value="text"></input></div>' +
                '<div>&lt;a href="/"&gt;Main&lt;/a&gt;</div>' +
                'simple string' +
                '</div>';
            expect(React.cleanHtml(html)).to.equal(expectedString);
        });
    });
});
