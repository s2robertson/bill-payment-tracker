const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const { Reminder, User, Bill } = require('../models');

let mailUser = process.env.EMAIL_USER;
let mailPassword = process.env.EMAIL_PASSWORD;
let mailHost = process.env.EMAIL_HOST;
let mailPort = process.env.EMAIL_PORT;
let transporter;

(async function onStartup() {
    if (!(mailUser && mailPassword && mailHost && mailPort)) {
        // a real system should probably throw here, but let's be flexible
        const testAccount = await nodemailer.createTestAccount();
        mailUser = testAccount.user;
        mailPassword = testAccount.pass;
        mailHost = testAccount.smtp;
        mailPort = 587;
    }
    transporter  = nodemailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: mailPort == 465,
        auth: {
            user: mailUser,
            pass: mailPassword
        }
    });

    // load pre-existing reminders
    const reminders = await Reminder.findAll();
    const now = new Date();
    reminders.forEach(reminder => {
        if (reminder.scheduled_date < now) {
            sendReminder(reminder.id);
        } else {
            schedule.scheduleJob(reminder.scheduled_date, () => sendReminder(reminder.id));
        }
    });
})();

async function sendReminder(reminderId) {
    try {
        const reminder = await Reminder.findByPk(reminderId, {
            include: {
                model: Bill,
                include: User
            }
        });
        if (!reminder) {
            throw new Error(`Failed to send reminder ${reminderId}`);
        }
        const bill = reminder.bill;
        const user = bill.user;
        const emailText = 'This is a friendly reminder that you have a bill coming due soon.\n\n'
            + 'Description: ' + bill.description + '\nTotal Due: ' + bill.total_due + '\nMinimum Payment: '
            + bill.minimum_due + '\nDue Date:' + bill.due_date.toLocaleDateString() + '\n';

        const info = await transporter.sendMail({
            from: '"Bill Payment Reminders" <no-reply@example.com>',
            to: user.email,
            subject: 'Upcoming Bill Payment',
            text: emailText
        });
        console.log(`Message sent: ${info.messageId}`);
        console.log(mailHost);
        if (mailHost == 'smtp.ethereal.email') {
            console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        }

        // delete the reminder afterward
        await reminder.destroy();
    } catch (err) {
        console.log(err);
    }
}

module.exports.scheduleReminder = async function(user_id, bill_id, scheduled_date) {
    try {
        const bill = await Bill.findByPk(bill_id, {
            where: {
                user_id
            }
        });
        if (!bill) {
            return null;
        }
        const reminder = await Reminder.create({ bill_id, scheduled_date });
        schedule.scheduleJob(reminder.scheduled_date, () => sendReminder(reminder.id));
        return reminder;
    } catch (err) {
        console.log(err);
    }
}