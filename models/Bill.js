const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bill extends Model {}

Bill.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company: {
        type: DataTypes.STRING,
    
    },
    account_number: {
        type: DataTypes.STRING,
      },
    next_payment_day: {
        type: DataTypes.DATE,
      },
    total_owing: {
        type: DataTypes.DECIMAL,
      },
    minimum_due: {
        type: DataTypes.DECIMAL,
      },
    total_due: {
        type: DataTypes.DECIMAL,
      },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'bill'
});

module.exports = Bill;