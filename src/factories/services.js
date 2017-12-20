const {camelCase} = require('lodash');

module.exports = function(config, app, services) {
    return Object.entries(services)
    .reduce((result, [name, ctor]) => {
        const name_ = camelCase(name);
        const options = app.config[`${name_}Service`];

        result.set(name, new ctor(app, options));

        return result;
    }, new Map());
};
