const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Credit extends Model {}

Credit.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    financial_institution: {
        type: DataTypes.STRING,
    
    },
    last_4_digits: {
        type: DataTypes.INTEGER,
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
    modelName: 'credit'
});

module.exports = Credit;