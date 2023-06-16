const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reminder extends Model {}

Reminder.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bill_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'bill',
                key: 'id'
            }
        },
        scheduled_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'reminder'
    }
);

module.exports = Reminder;