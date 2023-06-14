const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Payment extends Model {}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paid_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
    },
    payment_method: {
      type: DataTypes.STRING,
    },
    credit_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'credit',
        key: 'id',
      },
    },
    bill_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'bill',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'payment',
  }
);

module.exports = Payment;
