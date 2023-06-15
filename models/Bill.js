const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bill extends Model {}

Bill.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
      },
    minimum_due: {
        type: DataTypes.DECIMAL,
      },
    total_due: {
        type: DataTypes.DECIMAL,
      },
      due_date: {
        type: DataTypes.DATE,
      },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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