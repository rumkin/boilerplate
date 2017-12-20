module.exports = function(plop) {
    plop.setGenerator('adapter', require('./adapter'));
    plop.setGenerator('component', require('./component'));
    plop.setGenerator('container', require('./container'));
    plop.setGenerator('factory', require('./factory'));
    plop.setGenerator('model', require('./model'));
    plop.setGenerator('service', require('./service'));
    plop.setGenerator('store', require('./store'));
};
