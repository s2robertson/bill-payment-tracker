const router = require('express').Router();
const userRoutes = require('./userRoutes');
const creditRoutes = require('./creditRoutes');
const billRoutes = require('./billRoutes');
const paymentRoutes = require('./paymentRoutes');


router.use('/users', userRoutes);
router.use('/credits', creditRoutes);
router.use('/bills', billRoutes);
router.use('/payments', paymentRoutes);



module.exports = router;
