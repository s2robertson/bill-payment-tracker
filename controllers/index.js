const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./dashboardRoutes');
// const dashboardRoutes = require('./dashboardRoutes');

// router.use('/', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;
