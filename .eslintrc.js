module.exports = {
    extends: 'loris/es5',
    root: true,
    env: {
        node: true,
        mocha: true
    },
    rules: {
        strict: 'off',
        'no-unused-vars': ['error', {args: 'none'}],
        'no-console': ['warn']
    }
};
