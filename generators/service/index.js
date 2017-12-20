const fs = require('fs');
const path = require('path');

module.exports = {
    description: 'Generate service file',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'user',
        validate: (name) => {
            if (! (/^[a-z0-9_-]+$/).test(name)) {
                return `Bad name "${name}"`;
            }

            if (fs.existsSync(path.join('src', 'services', `${name}-service.js`))) {
                return `Service "${name}" already exists`;
            }

            return true;
        },
    }],
    actions() {
        const actions = [];

        actions.push({
            type: 'add',
            path: '../src/services/{{name}}-service.js',
            templateFile: 'service/service.js.hbs',
        });

        return actions;
    },
};
