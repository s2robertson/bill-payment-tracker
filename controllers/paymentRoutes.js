const router = require('express').Router();
const { User, Bill, Payment } = require('../models');
const { withPageAuth } = require('../utils/auth');
const moment = require('moment');
const {Op} = require('sequelize');




  router.get('/payments', withPageAuth, async (req, res) => {
    try {
      const dbPaymentData = await Payment.findAll({
        attributes: ['id', 'paid_amount', 'payment_date', 'bill_id'],
        include: [
          {
            model: Bill,
            attributes: ['id', 'description', 'total_due', 'user_id', 'due_date'],
            include: [
              {
                model: User,
      
              }
            ],
            where: {
              user_id: req.session.user_id
            }
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



  router.get('/payments/:id', withPageAuth, async (req, res) => {
    try {
      const dbPaymentData = await Payment.findByPk(req.params.id, {
        attributes: ['id', 'paid_amount', 'payment_date', 'bill_id'],
        include: [
          {
            model: Bill,
            attributes: ['id', 'description', 'minimum_due', 'total_due', 'due_date', 'user_id'],
            where: {
              user_id: req.session.user_id
            }
          },
        ]
      });
  
      const payments = dbPaymentData.map((payment) => payment.get({ plain: true }));
      res.render('payment', {payments}); ///logged_in: true
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


//  id = req.session.id to replace the 1 in the url ////
  router.get('/query/:id/:startDate/:endDate', withPageAuth, async (req, res) => {
    try {
      const startDate = new Date(req.params.startDate);
      const endDate = new Date(req.params.endDate);
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Invalid date range' });
      }
      const id = req.session.user_id;
      
      const dbPaymentData = await Payment.findAll({
        where: {
          payment_date: { [Op.between]: [startDate, endDate] },
        },
        include : {
          model: Bill,
            include: {
              model:User,
            },
          where: {
            user_id: req.session.user_id
          }
        },
      });
  
      const payments = dbPaymentData.map((payment) => payment.toJSON()); 
      res.render('paymentFilter', {payments}); ///logged_in: true
      console.log (payments)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  
  module.exports = router;