const crypto = require('crypto');
const signature = require('cookie-signature');
const {isEqual} = require('lodash');

module.exports = function({key = 'sid', store, secret = null}) {
    return async function({req, res}, next) {
        let id = req.cookie[key];
        let session = {};

        const run = async (session = {}) => {
            // Update requst and response objects
            req.session =
            res.session = {...session};

            let dropSession = false;

            res.dropSession = function() {
                dropSession = true;
                return this;
            };

            // Run internal handlers
            await next();

            // After request is complete
            if (dropSession) {
                // Drop session
                await store.delete(id);
            }
            else if (! isEqual(session, req.session)) {
                // Save session
                await store.set(id, res.session);
            }
        };

        if (id) {
            if (secret) {
                // Check session ID is signed with secret. Get session ID
                id = signature.unsign(id, secret);
                if (! id) {
                    // Run with no session if id is not valid
                    await run();
                    return;
                }
            }

            const storedSession = await store.get(id);

            if (storedSession) {
                session = storedSession;
            }
        }
        else {
            // Generate session ID
            id = crypto.randomBytes(64).toString('hex');
            let cookie;
            if (secret) {
                // Sign session with HMAC signature
                cookie = signature.sign(id, secret);
            }
            else {
                cookie = id;
            }

            res.setCookie(key, cookie, {
                httpOnly: true,
                path: '/',
                maxAge: 24 * 7 * 60 * 60,
            });
        }

        await run(session);
    };
};
