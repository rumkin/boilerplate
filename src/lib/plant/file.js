const mime = require('mime');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');

const stat = promisify(fs.stat);
const exists = promisify(fs.exists);

// Get file or index file from directory
async function getFileInfo(filepath, index = 'index.html') {
    if (! await exists(filepath)) {
        return;
    }

    const filestat = await stat(filepath);

    if (filestat.isFile()) {
        return {
            path: filepath,
            size: filestat.size,
        };
    }
    else {
        return getFileInfo(path.join(filepath, index));
    }
}

module.exports = function({root = './'} = {}) {
    return async function({req, res}, next) {

        const requestPath = path.join(root, path.resolve('/', req.url));
        const result = await getFileInfo(requestPath);

        if (! result) {
            await next();
            return;
        }

        res.setHeader('content-type', mime.getType(result.path));
        res.setHeader('content-size', result.size);

        res.send(fs.createReadStream(result.path));
    };
};
