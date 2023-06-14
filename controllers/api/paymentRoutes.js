const router = require('express').Router();
const {Payment}  = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbPaymentData = await Payment.findAll({});
        res.json(dbPaymentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const dbPaymentData = await Payment.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(dbPaymentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/credits', withAuth, async (req, res) => {    //no WithAuth to test
    if (req.session) {                             /// req.session to test
        try {
            const dbPaymentData = await Payment.create({
                description: req.body.description,
                paid_amount: req.body.paid_amount,
                payment_date: req.body.payment_date, 
                payment_method: req.body.payment_method,
                credit_id: req.body.credit_id,    ////CONFIGURE to pick data from the user info
                user_id: req.session.user_id,    ///to test user_id: req.body.user_id
                 
            });
            res.json(dbPaymentData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
});


router.post('/bills', withAuth, async (req, res) => {    //no WithAuth to test
    if (req.session) {                             /// req.session to test
        try {
            const dbPaymentData = await Payment.create({
                description: req.body.description,
                paid_amount: req.body.paid_amount,
                payment_date: req.body.payment_date, 
                payment_method: req.body.payment_method,
                bill_id: req.body.bill_id,        ////CONFIGURE to pick data from the user info
                user_id: req.session.user_id,    ///to test user_id: req.body.user_id
                 
            });
            res.json(dbPaymentData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
});


router.delete('/:id',  async (req, res) => { //no WithAuth to test
    try {
      const dbPostData = await Payment.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!dbPostData) {
        res.status(404).json({ message: 'No payment found with this id' });
        return;
      }
  
      res.json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  

  
  module.exports = router;
  