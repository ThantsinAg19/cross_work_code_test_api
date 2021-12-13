let mcache = require('memory-cache');
let { StatusCodes } = require('http-status-codes')

module.exports = (duration) => {
    return (req, res, next) => {
        let key = '__express_' + req.originalUrl || req.url
        let cacheBody = mcache.get(key);

        if (cacheBody) return res.status(StatusCodes.OK).send(cacheBody)

        else {
            res.sendResponse = res.send
            res.send = (body) => {
                mcache.put(key, body, duration * 1000) // in milliseconds
                res.sendResponse(body)
            };
            next();
        }
    }
}