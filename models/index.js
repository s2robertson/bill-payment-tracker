const User = require('./User');
const Bill = require('./Bill');
const Credit = require('./Credit')
const Payment = require('./Payment')


User.hasMany(Credit, {
  foreignKey: 'user_id',
});

Credit.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Bill, {
  foreignKey: 'user_id',
});

Bill.belongsTo(User, {
  foreignKey: 'user_id',
});

Credit.hasMany(Payment, {
  foreignKey: 'credit_id',
}),

Payment.belongsTo(Credit, {
  foreignKey: 'credit_id',
});

Bill.hasMany(Payment, {
  foreignKey: 'bill_id',
}),

Payment.belongsTo(Bill, {
  foreignKey: 'bill_id',
});



module.exports = { User, Bill, Credit, Payment };
