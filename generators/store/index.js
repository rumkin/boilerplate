const fs = require('fs');
const path = require('path');

const root = path.join('ui', 'src', 'store');

module.exports = {
    description: 'Generate store file',
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
                return `Store "${name}" already exists`;
            }

            return true;
        },
    }],
    actions() {
        const actions = [];

        actions.push({
            type: 'add',
            path: path.join('..', root, '{{name}}', 'index.js'),
            templateFile: 'store/store.js.hbs',
        });

        actions.push({
            type: 'add',
            path: path.join('..', root, '{{name}}', 'actions.js'),
            templateFile: 'store/actions.js.hbs',
        });

        actions.push({
            type: 'add',
            path: path.join('..', root, '{{name}}', 'sagas.js'),
            templateFile: 'store/sagas.js.hbs',
        });

        actions.push({
            type: 'add',
            path: path.join('..', root, '{{name}}', 'selectors.js'),
            templateFile: 'store/selectors.js.hbs',
        });

        return actions;
    },
};
