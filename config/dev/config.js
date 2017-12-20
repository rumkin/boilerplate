exports.http = {
    // Internal network options
    host: '0.0.0.0',
    port: process.env.PORT || 8080,
    // Fontend options
    frontHost: 'localhost',
    frontPort: 4000,

    // Maximum body size
    maxBody: '100Kb',
    sessionSecret: 'very-very-secret-string',
};

exports.sessionStore = {
    expire: 10 * 60 * 1e3,
};
