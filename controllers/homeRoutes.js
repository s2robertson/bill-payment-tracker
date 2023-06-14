const router = require('express').Router();
const { User, Credit, Bill, Payment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('home');
})

router.get('/', async (req, res) => {
    try {
      const dbCreditData = await Credit.findAll({
        attributes: [],
        include: [
          {
            model: Payment,
            attributes: ['id', 'description', 'paid_amount', 'payment_day', 'payment_method', 'credit_id'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
  
      const credits = dbCreditData.map(credit => credit.get({ plain: true }));
      res.render('homepage', { credits, logged_in: req.session.logged_in });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/', async (req, res) => {
    try {
      const dbBillData = await Bill.findAll({
        attributes: [],
        include: [
          {
            model: Payment,
            attributes: ['id', 'description', 'paid_amount', 'payment_day', 'payment_method', 'bill_id'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
  
      const bills = dbBillData.map(bill => bill.get({ plain: true }));
      res.render('homepage', { bills, logged_in: req.session.logged_in });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  
  router.get('/', async (req, res) => {
    try {
      const dbPaymentData = await Payment.findAll({
        attributes: [],
        include: [
          {
            model: Credit,
            attributes: ['id', 'financial_institution', 'last_4_digit', 'user_id'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
  
      const payments = dbPaymentData.map(payment => payment.get({ plain: true }));
      res.render('homepage', { payments, logged_in: req.session.logged_in });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });




  router.get('/credit/:id', async (req, res) => {
    try {
      const dbCreditData = await Credit.findByPk({
        attributes: [],
        include: [
          {
            model: Payment,
            attributes: ['id', 'description', 'paid_amount', 'payment_day', 'payment_method', 'credit_id'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
  
      const credits = dbCreditData.map(credit => credit.get({ plain: true }));
      res.render('homepage', { credits, logged_in: req.session.logged_in });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/bill/:id', async (req, res) => {
    try {
      const dbBillData = await Bill.findAll({
        attributes: [],
        include: [
          {
            model: Payment,
            attributes: ['id', 'description', 'paid_amount', 'payment_day', 'payment_method', 'bill_id'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
  
      const bills = dbBillData.map(bill => bill.get({ plain: true }));
      res.render('homepage', { bills, logged_in: req.session.logged_in });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  
  router.get('/payment/:id', async (req, res) => {
    try {
      const dbPaymentData = await Payment.findAll({
        attributes: [],
        include: [
          {
            model: Credit,
            attributes: ['id', 'financial_institution', 'last_4_digit', 'user_id'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
  
      const payments = dbPaymentData.map(payment => payment.get({ plain: true }));
      res.render('homepage', { payments, logged_in: req.session.logged_in });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  module.exports = router;