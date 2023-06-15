const schedule = require('node-schedule');
const { Reminder, User, Bill } = require('../models');

// on startup, load all reminders
Reminder.findAll().then(reminders => {
    const now = new Date();
    reminders.forEach(reminder => {
        if (reminder.scheduled_date < now) {
            sendReminder(reminder.id);
        } else {
            schedule.scheduleJob(reminder.scheduled_date, () => sendReminder(reminder.id));
        }
    })
});

async function sendReminder(reminderId) {
    try {
        const reminder = await Reminder.findByPk(reminderId, {
            include: {
                model: Bill,
                include: User
            }
        });
        if (!reminder) {
            throw new Error(`Missing reminder ${reminderId}`);
        }
        const user = reminder.bill.user;
        console.log(user.toJSON());
        await reminder.destroy();
        // delete the reminder afterward
    } catch (err) {
        console.log(err);
    }
}

module.exports.scheduleReminder = async function(bill_id, scheduled_date) {
    try {
        const reminder = Reminder.create({ bill_id, scheduled_date });
        schedule.scheduleJob(reminder.scheduled_date, () => sendReminder(reminder.id));
        return reminder;
    } catch (err) {
        console.log(err);
    }
}