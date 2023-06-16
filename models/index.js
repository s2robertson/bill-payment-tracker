const User = require('./User');
const Bill = require('./Bill');
const Payment = require('./Payment')



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


Payment.belongsTo(User, {
  through: Bill,
  foreignKey: 'user_id',
  });


module.exports = { User, Bill, Payment };
