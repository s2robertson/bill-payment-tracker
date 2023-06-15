const router = require('express').Router();
const userRoutes = require('./userRoutes');
const billRoutes = require('./billRoutes');
const paymentRoutes = require('./paymentRoutes');


router.use('/users', userRoutes);
router.use('/bills', billRoutes);
router.use('/payments', paymentRoutes);



module.exports = router;
