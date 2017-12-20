const fs = require('fs');
const path = require('path');

module.exports = {
    description: 'Generate factory file',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'user',
        validate: (name) => {
            if (! (/^[a-z0-9_-]+$/).test(name)) {
                return `Bad name "${name}"`;
            }

            if (fs.existsSync(path.join('src', 'factories', `${name}.js`))) {
                return `Factory "${name}" already exists`;
            }

            return true;
        },
    }],
    actions() {
        const actions = [];

        actions.push({
            type: 'add',
            path: '../src/factories/{{name}}.js',
            templateFile: 'factory/factory.js.hbs',
        });

        return actions;
    },
};
