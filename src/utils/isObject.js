module.exports = function (object) {
    return object !== null && typeof object === 'object' && !Array.isArray(object);
};
