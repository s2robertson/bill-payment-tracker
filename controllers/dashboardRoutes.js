const router = require('express').Router();
const { User, Bill, Payment } = require('../models');
const { withPageAuth } = require('../utils/auth');

// home/login
router.get('/', (req, res) => {
  if (req.session.user_id) {
    res.redirect('/dashboard');
  } else {
    res.render('home');
  }
});

// register
router.get('/register', (req, res) => {
  if (req.session.user_id) {
    res.redirect('/dashboard');
  } else {
    res.render('register');
  }
})

// / DASHBOARD
router.get('/dashboard', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password']
      },
      include: {
        model: Bill,
        order: [['due_date', 'DESC']],
        include: {
          model: Payment,
          order: [['payment_date', 'DESC']]
        }
      }
    });

    if (!userData) {
      return res.redirect('/');
    }
    const user = userData.get({ plain: true });
    /* // split the bills into upcoming and past bills
    const today = new Date();
    let sliceIndex = user.bills.findIndex(bill => bill.due_date < today);
    if (sliceIndex == -1) {
      sliceIndex = user.bills.length;
    }
    user.upcomingBills = user.bills.slice(0, sliceIndex);
    user.pastBills = user.bills.slice(sliceIndex);
    */

   // console.log(user)
    res.render('dashboard', { user });//, logged_in: req.session.logged_in
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/bill/new', withPageAuth, (req, res) => {
  res.render('editBill');
});
  
router.get('/bill/:id', withPageAuth, async (req, res) => {
  try {
    const billData = await Bill.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id'],
          where: {
            id: req.session.user_id
          }
        }
      ]
    });
    if (!billData) {
      res.redirect('/dashboard');
    }

    const bill = billData.get({ plain: true });
    res.render('editBill', { bill }); ///logged_in: true
  } catch (err) {
    console.log(err);
    res.redirect('/dashboard');
  }
});


  module.exports = router;