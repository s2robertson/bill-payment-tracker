const router = require('express').Router();

const apiRoutes = require('./api');
const pageRoutes = require('./pageRoutes');
// const homeRoutes = require('./homeRoutes');
// const dashboardRoutes = require('./dashboardRoutes');

// router.use('/', dashboardRoutes);
// router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/', pageRoutes);

module.exports = router;
