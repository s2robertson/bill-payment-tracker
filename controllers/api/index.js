const router = require('express').Router();
const userRoutes = require('./userRoutes');
const billRoutes = require('./billRoutes');
const paymentRoutes = require('./paymentRoutes');
const queryRoutes = require('./query');
const reminderRoutes = require('./reminderRoutes');

router.use('/users', userRoutes);
router.use('/bills', billRoutes);
router.use('/payments', paymentRoutes);
router.use('/query', queryRoutes);
router.use('/reminders', reminderRoutes);

module.exports = router;
