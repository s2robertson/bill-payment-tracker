const User = require('./User');
const Bill = require('./Bill');
const Payment = require('./Payment')
const Reminder = require('./Reminder');

User.hasMany(Bill, {
  foreignKey: 'user_id',
});

Bill.belongsTo(User, {
  foreignKey: 'user_id',
});

Bill.hasMany(Payment, {
  foreignKey: 'bill_id',
}),

Payment.belongsTo(Bill, {
  foreignKey: 'bill_id',
});

Bill.hasMany(Reminder, {
  foreignKey: 'bill_id'
});

Reminder.belongsTo(Bill, {
  foreignKey: 'bill_id'
});

module.exports = { User, Bill, Payment, Reminder };
