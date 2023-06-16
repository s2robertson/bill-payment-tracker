
const router = require('express').Router();
const { Payment, User, Bill } = require('../../models');
const withAuth = require('../../utils/auth');
var Sequelize = require('sequelize');
const {Op} = require('sequelize');




// router.get('/', async (req, res) => {
//     try {
//       const startDate = new Date(req.body.startDate);
//       const endDate = new Date(req.body.endDate);
//       if (!(startDate) || !(endDate)) {
//         return res.status(400).json({ error: 'Invalid date range' });
//       }
//       const dbPaymentData = await Payment.findAll({
//         where: {
//           payment_date: { [op.between]: [startDate, endDate] }
//         }
//       });
  
//       res.json(dbPaymentData);
  
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   });


// router.get('/', async (req, res) => {
//   try {
//     const startDate = new Date(req.query.startDate);
//     const endDate = new Date(req.query.endDate);
//     if (!startDate || !endDate) {
//       return res.status(400).json({ error: 'Invalid date range' });
//     }

//     const dbPaymentData = await Payment.findAll({
//       where: {
//         payment_date: { [Op.between]: [startDate, endDate] },
//       },
//     });

//     res.json(dbPaymentData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get('/:id/:startDate/:endDate', async (req, res) => {
    try {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(req.body.endDate);
      if (!(startDate) || !(endDate)) {
        return res.status(400).json({ error: 'Invalid date range' });
      }
      const dbPaymentData = await Bill.findAll({
        where: {
            id: req.params.id,
          },
          include: {
            model: Payment,
            where: {
                payment_date: {[Op.between]: [startDate, endDate]}
            }
          },
          include: {
            model: User
          },

      });
  
      res.json(dbPaymentData);
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });




  module.exports = router;