const router = require('express').Router();
const userRoutes = require('./userRoutes');
const billRoutes = require('./billRoutes');
const paymentRoutes = require('./paymentRoutes');
const queryRoutes = require('./query');


router.use('/users', userRoutes);
router.use('/bills', billRoutes);
router.use('/payments', paymentRoutes);
router.use('/query', queryRoutes);



module.exports = router;
