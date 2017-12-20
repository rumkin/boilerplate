module.exports = async function({req, res}, next) {
    const authorization = req.headers.get('authorization');
    if (! authorization) {
        req.auth = {
            type: null,
            payload: '',
        };
    }
    else {
        const [type, ...payload] = authorization.split(' ');

        if (payload.length) {
            req.auth = {
                type: type.toLowerCase(),
                payload: payload.join(' '),
            };
        }
        else {
            req.auth = {
                type: 'unknown',
                value: type,
            };
        }
    }

    await next();
};
