const fs = require('fs');
const path = require('path');

module.exports = {
    description: 'Generate adapter file',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'user',
        validate: (name) => {
            if (! (/^[a-z0-9_-]+$/).test(name)) {
                return `Bad name "${name}"`;
            }

            if (fs.existsSync(path.join('src', 'adapters', `${name}-adapter.js`))) {
                return `Adapter "${name}" already exists`;
            }

            return true;
        },
    }],
    actions() {
        const actions = [];

        actions.push({
            type: 'add',
            path: '../src/adapters/{{name}}-adapter.js',
            templateFile: 'adapter/adapter.js.hbs',
        });

        return actions;
    },
};
