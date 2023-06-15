const router = require('express').Router();
const { User, Bill, Payment } = require('../models');
const withAuth = require('../utils/auth');


// / DASHBOARD
  router.get('/dashboard', async (req, res) => {
    try {
      const dbBillData = await Bill.findAll({
        attributes: ['id', 'description', 'minimum_due', 'total_due', 'due_date', 'user_id'],
        include: [
          {
            model: Payment,
            attributes: ['id', 'paid_amount', 'payment_date', 'bill_id'],
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
  
      const bills = dbBillData.map((bill) => bill.get({ plain: true }));
      res.render('dashboard', { bills });//, logged_in: req.session.logged_in
      console.log(bills)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


  
  

  router.get('/bill/:id', async (req, res) => {
    try {
      const dbBillData = await Bill.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'description', 'minimum_due', 'total_due', 'due_date'],
        include: [
          {
            model: Payment,
            attributes: ['id', 'description', 'paid_amount', 'payment_date', 'bill_id'],
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
  
      const bills = dbBillData.get({ plain: true });
      res.render('bill', { ...bills}); ///logged_in: true
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


  module.exports = router;