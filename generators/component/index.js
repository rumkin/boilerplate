const fs = require('fs');
const path = require('path');

const root = path.join('ui', 'src', 'components');

module.exports = {
    description: 'Generate component file',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'user',
        validate: (name) => {
            if (! (/^[A-Z0-9][A-Za-z0-9_-]+$/).test(name)) {
                return `Bad name "${name}"`;
            }

            if (fs.existsSync(path.join(root, name, `${name}.js`))) {
                return `Controller "${name}" already exists`;
            }

            return true;
        },
    }],
    actions() {
        const actions = [];

        actions.push({
            type: 'add',
            path: path.join('..', root, '{{name}}', 'index.js'),
            templateFile: 'component/component.js.hbs',
        });

        return actions;
    },
};
