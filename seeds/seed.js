const sequelize = require('../config/connection');
const { User, Payment, Bill } = require('../models');

const userData = require('./userData.json');
const billData = require('./billData.json');
const paymentData = require('./paymentData.json');
const reminderData = require('./reminderData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData);

    await Bill.bulkCreate(billData);

    await Payment.bulkCreate(paymentData);

    await Reminder.bulkCreate(reminderData);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();