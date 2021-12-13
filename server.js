const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const base_auth = require('express-basic-auth');

const db = require('./app/v1/src/config/config.db');


const app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(cors());
app.use(base_auth({
    users: {
        [process.env.auth_username] : process.env.auth_password
    }
}))

/**
 * db config
 */
db.sequelize.sync({
    force: false
}).then(() => {
    console.log('conneted to db successfully');
}).catch(err => {
    console.error(`Error: ${err.message || err}`)
});

const Route = require('./app/v1/src/route');
/**
 * routes
 */
app.use('/chart',Route.Chart);
app.use('/pie',Route.Pie);
app.use('/bar',Route.Bar);

const port = process.env.PORT || 4500;

app.listen(port, function () {
    console.log('server is starting at port :', port);
    /**
     * for build insert processing
     */
    const chartController = require('./app/v1/src/controller/chart');

    chartController.bulkCreate();
})

