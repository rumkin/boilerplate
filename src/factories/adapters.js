const {camelCase} = require('lodash');

module.exports = function(config, app, adapters) {
    return Object.entries(adapters)
    .reduce((result, [name, ctor]) => {
        const name_ = camelCase(name);
        const options = {
            ...app.config[`${name_}`],
        };

        result.set(name, new ctor(app, options));

        return result;
    }, new Map());
};
