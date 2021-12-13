const router = require('express').Router();
const {
    Memory_cache,
    checkPerson,
    Validate_Request
} = require('../middleware');

const { ChartController } = require('../controller');

router.get(
    '/',
    ChartController.getAll
)

router.get(
    '/refresh',
    ChartController.getAll
)

router.post(
    '/',
    checkPerson.validate('create-person'),
    Validate_Request,
    ChartController.create
)

module.exports = router;