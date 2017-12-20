// Call function in the next tick
const delay = typeof setImmediate === 'function'
    ? setImmediate
    : setTimeout;

function defer(...args) {
    const fn = args.pop();
    return new Promise((resolve, reject) => {
        delay(() => {
            try {
                resolve(fn(...args));
            }
            catch (err) {
                reject(err);
            }
        });
    });
};

module.exports = defer;
