const router = require('express').Router();
const { Payment } = require('../../models');
const withAuth = require('../../utils/auth');
const Sequelize = require('sequelize');

router.get('/', async (req, res) => {
  console.log('normal')
  try {
    const dbPaymentData = await Payment.findAll({});
    res.json(dbPaymentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  console.log('id')
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



router.post('/', withAuth, async (req, res) => {    //no WithAuth to test

  if (req.session) {                             /// req.session to test
    try {
      const dbPaymentData = await Payment.create({
        payment_date: req.body.payment_date,
        paid_amount: req.body.paid_amount,
        bill_id: req.body.bill_id,
        user_id: req.session.user_id,    ///to test user_id: req.body.user_id

      });
      res.json(dbPaymentData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
});


router.delete('/:id', withAuth, async (req, res) => { //no WithAuth to test
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
