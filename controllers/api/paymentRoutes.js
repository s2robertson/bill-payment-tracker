const router = require('express').Router();
const { Payment, Bill } = require('../../models');
const { withApiAuth } = require('../../utils/auth');
const handleSequelizeError = require('../../utils/sequelizeErrorHandler');

router.get('/', withApiAuth, async (req, res) => {
  try {
    const dbPaymentData = await Payment.findAll({
      include: {
        model: Bill,
        attributes: ['id'],
        where: {
          user_id: req.session.user_id
        }
      }
    });
    res.json(dbPaymentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', withApiAuth, async (req, res) => {
  try {
    const dbPaymentData = await Payment.findByPk(req.params.id, {
      include: {
        model: Bill,
        attributes: ['id'],
        where: {
          user_id: req.session.user_id
        }
      }
    });
    res.json(dbPaymentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



router.post('/', withApiAuth, async (req, res) => {    //no WithAuth to test
  try {
    const bill = await Bill.findByPk(req.body.bill_id, {
      where: {
        user_id: req.session.user_id
      }
    });
    if (!bill) {
      return res.status(403).json({ message: 'Invalid bill_id' });
    }

    const dbPaymentData = await Payment.create({
      payment_date: req.body.payment_date || new Date(),
      paid_amount: req.body.paid_amount,
      bill_id: req.body.bill_id,
      user_id: req.session.user_id,    ///to test user_id: req.body.user_id

    });
    res.json(dbPaymentData);
  } catch (err) {
    console.log(err);
    const message = handleSequelizeError(err);
    if (message) {
      res.status(400).json({ message });
    } else {
      res.status(500).json(err);
    }
  }
});


router.put('/:id', withApiAuth, async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: {
        model: Bill,
        where: {
          user_id: req.session.user_id
        }
      }
    });
    if (!payment) {
      return res.status(403).json({ message: 'Invalid payment id' });
    }

    payment.paid_amount = req.body.paid_amount;
    await payment.save();
    res.json(payment);
  } catch (err) {
    console.log(err);
    const message = handleSequelizeError(err);
    if (message) {
      res.status(400).json({ message });
    } else {
      res.status(500).json(err);
    }
  }
});


router.delete('/:id', withApiAuth, async (req, res) => { //no WithAuth to test
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: {
        model: Bill,
        where: {
          user_id: req.session.user_id
        }
      }
    });
    if (!payment) {
      return res.status(403).json({ message: 'Invalid payment id' });
    }
    const dbPostData = await payment.destroy();

    if (!dbPostData) {
      res.status(404).json({ message: 'No payment found with this id' });
      return;
    }

    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    const message = handleSequelizeError(err);
    if (message) {
      res.status(400).json({ message });
    } else {
      res.status(500).json(err);
    }
  }
});







module.exports = router;
