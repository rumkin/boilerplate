const fs = require('fs');
const path = require('path');

const root = path.join('ui', 'src', 'containers');

module.exports = {
    description: 'Generate container file',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'UserPage',
        validate: (name) => {
            if (! (/^[A-Z0-9][A-Za-z0-9_-]+$/).test(name)) {
                return `Bad name "${name}"`;
            }

            if (fs.existsSync(path.join(root, name))) {
                return `Container "${name}" already exists`;
            }

            return true;
        },
    }, {
        type: 'confirm',
        name: 'style',
        message: 'Create style.css?',
    }],
    actions(params) {
        const actions = [];

        actions.push({
            type: 'add',
            path: path.join('..', root, '{{name}}', 'index.js'),
            templateFile: 'container/container.js.hbs',
        });

        if (params.style) {
            actions.push({
                type: 'add',
                path: path.join('..', root, '{{name}}', 'style.css'),
                templateFile: 'container/style.css.hbs',
            });
        }

        return actions;
    },
};
