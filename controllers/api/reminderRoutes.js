const router = require('express').Router();
const { Bill } = require('../../models');
const { scheduleReminder } = require('../scheduler');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        await scheduleReminder(req.body.bill_id, req.body.scheduled_date);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;