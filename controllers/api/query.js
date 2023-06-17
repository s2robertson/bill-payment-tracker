
const router = require('express').Router();
const { Payment, User, Bill } = require('../../models');
const { withApiAuth } = require('../../utils/auth');
// var Sequelize = require('sequelize');
const {Op} = require('sequelize');



router.get('/:id/:startDate/:endDate', withApiAuth, async (req, res) => {  /// CHANGE /1/ for :id
    try {
      const startDate = new Date(req.params.startDate);
      const endDate = new Date(req.params.endDate);
      const id =  req.session.id;
      console.log(endDate, startDate)
      if (!(startDate) || !(endDate)) {
        return res.status(400).json({ error: 'Invalid date range' });
      }
      const dbPaymentData = await Payment.findAndCountAll({
        where: {
              payment_date: {[Op.between]: [startDate, endDate]}
          },
          include : {
            model: Bill,
            where: {
              user_id: req.session.user_id
            }
          },
          // // include: {
          // //   model: User,
          // //   where: {
          // //     id: req.params.id,
          //   // },
          // },
      });
  
      res.json(dbPaymentData);
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });




  module.exports = router;