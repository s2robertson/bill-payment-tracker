const router = require('express').Router();
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes');
const paymentR = require('./paymentRoutes');

<<<<<<< HEAD

router.use('/', dashboardRoutes);
router.use('/', paymentR);
=======
// router.use('/', dashboardRoutes);
>>>>>>> ce06fec0fd0a665648f0481dbdf69e717beff336
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;
