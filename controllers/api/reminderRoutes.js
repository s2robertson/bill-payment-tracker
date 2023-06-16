const router = require('express').Router();
const { Bill } = require('../../models');
const { scheduleReminder } = require('../scheduler');
const { withApiAuth } = require('../../utils/auth');

router.post('/', withApiAuth, async (req, res) => {
    try {
        const reminder = await scheduleReminder(req.session.user_id, req.body.bill_id, req.body.scheduled_date);
        if (!reminder) {
            return res.status(403).json({ message: 'Invalid bill_id' });
        }
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;