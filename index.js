const program = require('commander');

program.version('1.0.0')
.usage('<command> [options]');

program.command('server')
.option('-H,--host <hostname>')
.option('-p,--port <number>')
.option('-e,--env <environment>')
.action((cmd) => {
    const env = cmd.env || 'dev';
    const config = require(`./config/${env}/config.js`);

    if (cmd.port) {
        config.http.port = cmd.port;
    }

    if (cmd.host) {
        config.http.host = cmd.host;
    }

    require('./src/index.js')(config)
    .catch((error) => {
        console.error('%s', error.stack);
        process.exit(1);
    });
});

program.parse(process.argv);
