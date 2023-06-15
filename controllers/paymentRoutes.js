const router = require('express').Router();
const { User, Bill, Payment } = require('../models');
const withAuth = require('../utils/auth');



  router.get('/payments', async (req, res) => {
    try {
      const dbPaymentData = await Payment.findAll({
        attributes: ['id', 'paid_amount', 'payment_date', 'bill_id'],
        include: [
          {
            model: Bill,
            attributes: ['id', 'description', 'total_due', 'user_id', 'due_date']
          },
        ]
      });
  
      const payments = dbPaymentData.map((payment) => payment.get({ plain: true }));
      res.render('payment', {payments});//, logged_in: req.session.logged_in
      console.log(payments)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });



  router.get('/payments/:id', async (req, res) => {
    try {
      const dbPaymentData = await Payment.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'paid_amount', 'payment_date', 'bill_id'],
        include: [
          {
            model: Bill,
            attributes: ['id', 'description', 'minimum_due', 'total_due', 'due_date', 'user_id']
          },
        ]
      });
  
      const payments = dbPaymentData.get({ plain: true });
      res.render('payment', { ...payments}); ///logged_in: true
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  
  module.exports = router;