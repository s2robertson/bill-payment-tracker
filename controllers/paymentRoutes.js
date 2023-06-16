const router = require('express').Router();
const { User, Bill, Payment } = require('../models');
const withAuth = require('../utils/auth');
const moment = require('moment');
const {Op} = require('sequelize');



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
      res.render('payment', {payments}); ///logged_in: true
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });



  router.get('/query/:startDate/:endDate', async (req, res) => {
    try {
      const startDate = new Date(req.query.startDate);
      const endDate = new Date(req.query.endDate);
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Invalid date range' });
      }
  
      const dbPaymentData = await Payment.findAll({
        where: {
          payment_date: { [Op.between]: [startDate, endDate] },
        },
      });
  
      const payments = dbPaymentData.get({ plain: true });
      res.render('paymentFilter', {payments}); ///logged_in: true
      console.log (payments)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  
  module.exports = router;