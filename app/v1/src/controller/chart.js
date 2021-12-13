const { StatusCodes } = require('http-status-codes');
const {
    chart,
    sequelize,
    Sequelize
} = require('../config/config.db');

const DataList = require('../util/data');

/**
 * inserting constant data into database table when system init
 */
exports.bulkCreate = () => {
    chart.bulkCreate(DataList.people)
        .then(data => {
            if (data && Array.isArray(data))
                console.log(`Inserted ${data.length} records.`)
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getAll = (req, res) => {
    chart.findAll({
        limit: 100,
        order: [
            ['createdAt','DESC']
        ]
    })
        .then(data => {
            return res.status(StatusCodes.OK).json(data)
        })
        .catch(error => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || error,
            })
        })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getGenderRatio = (req, res) => {
    try {
        chart.findAll({
            group: ['gender'],
            attributes: [
                'gender',
                [Sequelize.fn('COUNT', 'id'), 'total']
            ]
        }).then(data => {
            return res.status(StatusCodes.OK).json(data);
        }).catch(error => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message
            });
        })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || error,
        })
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getPeoplebyAgeGroup = async (req, res) => {
    try {
        const young_ad = `when age between 0 and 35 then 'Young Adult'`;
        const adult = `when age between 35 and 50 then 'Adult'`;
        const senior = `when age > 50 then 'Seniors'`;

        const query = `
        select case 
        ${young_ad}
        ${adult}
        ${senior}
        else 'Seniors' end as age_group,
        count(id) as total_age from chart 
        group by case 
        ${young_ad}
        ${adult}
        ${senior}
        else 'Seniors' end;`

        const result = await sequelize.query(query, {
            type: Sequelize.QueryTypes.SELECT
        })

        let labels = []
        data = []
        if (result && Array.isArray(result)) {
            result.forEach((r) => {
                labels.push(r.age_group)
                data.push(r.total_age)
            })
        }

        return res.status(StatusCodes.OK).json({
            labels: labels,
            datasets: [
                {
                    label: 'Number of people by age group',
                    data: data,
                    backgroundColor: `rgba(255, 99, 152, 0.8)`,
                }
            ]
        })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || error,
        })
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.create = async (req, res) => {
    try {
        const {
            name,
            age,
            gender
        } = req.body

        const person = await chart.create({
            name: name,
            age: age,
            gender: gender
        })

        if (person)
            return res.status(StatusCodes.CREATED).json({
                message: 'New record is successfully created!',
                data: person
            })

        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Some data is missing in type or value.'
        })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || error,
        })
    }
}