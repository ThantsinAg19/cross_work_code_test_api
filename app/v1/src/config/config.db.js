const {
    host,
    database,
    dialect,
    pool,

    username,
    password,
} = require('./env');

const Sequelize = require('sequelize');
const config = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
    operatorsAliases: false,
    pool: {
        max: pool.max,
        min: pool.min,
        acquire: pool.acquire,
        idle: pool.idle
    }
})

const db = {};
db.sequelize = config;
db.Sequelize = Sequelize;

db.chart = require('../model/chart')(config,Sequelize);

module.exports = db;