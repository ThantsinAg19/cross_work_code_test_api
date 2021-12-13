const router = require('express').Router();
const { ChartController } = require('../controller');

/**
 * for pie chart
 */
 router.get(
    '/',
    ChartController.getPeoplebyAgeGroup
)

module.exports = router;