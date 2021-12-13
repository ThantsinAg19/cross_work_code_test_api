const env = {
    database: process.env.DATABASE,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
}

module.exports = env;