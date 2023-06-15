const sequelize = require('../config/connection');
const { User, Payment, Bill } = require('../models');

const userData = require('./userData.json');
const billData = require('./billData.json');
const paymentData = require('./paymentData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    for (const bill of billData) {
      await Bill.create({
        ...bill,
        // user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }


    for (const payment of paymentData) {
      await Payment.create({
        ...payment,
        // user_id: users[Math.floor(Math.random() * users.length)].id,
        // post_id: Math.floor(Math.random() * billData.length) + 1,
      });
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();