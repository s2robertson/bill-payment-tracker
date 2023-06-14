const router = require('express').Router();
const userRoutes = require('./userRoutes');
const creditRoutes = require('./creditRoutes');


router.use('/users', userRoutes);
router.use('/credits', creditRoutes);



module.exports = router;
