const { body } = require('express-validator');

exports.validate = (method) => {
    switch (method) {
        case 'create-person':
            return [
                body('name')
                    .exists()
                    .trim()
                    .escape()
                    .isString()
                    .isLength({ min: 1 }),
                body('age')
                    .exists()
                    .isNumeric()
                    .custom(value => {
                        if (value < 1 || value > 120)
                            throw new Error('Age must be integer between 1 and 120;')
                        else return true
                    }),
                body('gender')
                    .exists()
                    .trim()
                    .escape()
                    .isString()
                    .isLength({ min: 1, max: 1 })
                    .custom(value => {
                        if (!['M', 'F', 'O'].includes(value))
                            throw new Error('Gender must be of [M,F,O] for male, female or other.');

                        else return true
                    })
            ]

        default:
            break;
    }
}