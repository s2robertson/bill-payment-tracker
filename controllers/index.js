const router = require('express').Router();
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes');
const paymentR = require('./paymentRoutes');

// make user_id available to all templates
router.use((req, res, next) => {
    if (req.session.user_id) {
        res.locals.user_id = req.session.user_id;
    }
    next();
})

router.use('/', dashboardRoutes);
router.use('/', paymentR);
router.use('/api', apiRoutes);


// router.use('/', homeRoutes);

module.exports = router;
