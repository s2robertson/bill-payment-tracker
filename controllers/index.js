const router = require('express').Router();
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes');
const paymentR = require('./paymentRoutes');


router.use('/', dashboardRoutes);
router.use('/', paymentR);
router.use('/api', apiRoutes);

// router.use('/', homeRoutes);

module.exports = router;
