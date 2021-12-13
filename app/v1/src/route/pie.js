const router = require('express').Router();
const { ChartController } = require('../controller');

/**
 * for pie chart
 */
 router.get(
    '/',
    ChartController.getGenderRatio
)

module.exports = router;