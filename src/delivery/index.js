const {and, Router} = require('@plant/plant');

module.exports = function createApi(app, logger) {
    const router = new Router();

    router.route('/api/v1', async function({res}) {
        res.json(true);
    });

    return and(
        router.handler()
    );
};
