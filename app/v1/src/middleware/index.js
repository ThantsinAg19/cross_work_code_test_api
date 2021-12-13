const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

exports.Memory_cache = require('./memory-cache');
exports.checkPerson = require('./checkperson');

/**
 * This will be execute as middleware after the validation middleware are done.
 * If there is error found in data-validation. 
 * Response will be status 400.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.Validate_Request = (req, res, next) => {

    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).send(error)
    }
    else
        next();
}