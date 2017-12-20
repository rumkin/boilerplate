exports.http = {
    // Internal network options
    host: '0.0.0.0',
    port: process.env.PORT || 8080,
    // Fontend options
    frontHost: null, // *Get from request
    frontPort: null, // *Get from request

    // Maximum body size
    maxBody: '100Kb',
    sessionSecret: 'session-secret-string',
};

exports.sessionStore = {
    expire: 10 * 60 * 1e3,
};
