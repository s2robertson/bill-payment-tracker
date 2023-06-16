const { ValidationError } = require('sequelize');

function handleSequelizeError(err) {
    if (err instanceof ValidationError) {
        let errorMsg = '';
        err.errors.forEach(({ message }) => {
            if (message) {
                errorMsg += message + '.  ';
            }
        });
        return errorMsg;
    } else {
        return false;
    }
}

module.exports = handleSequelizeError;