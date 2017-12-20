const fs = require('fs');
const path = require('path');

module.exports = {
    description: 'Generate UI model file',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'user',
        validate: (name) => {
            if (! (/^[A-Z][a-z0-9_-]+$/).test(name)) {
                return `Bad name "${name}"`;
            }

            if (fs.existsSync(path.join('ui', 'src', 'models', `${name}.js`))) {
                return `Model "${name}" already exists`;
            }

            return true;
        },
    }],
    actions() {
        const actions = [];

        actions.push({
            type: 'add',
            path: '../ui/src/models/{{ name}}.js',
            templateFile: 'ui-model/ui-model.js.hbs',
        });

        return actions;
    },
};
