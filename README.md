# Bill Payment Tracker

## Description
This bill payment tracker app allows users to enter and view information about bills and payments for them, and to schedule reminders for bills that are due soon.

## Installation
Before running, `db/schema.sql` should be run to initialize a (MySQL) database, and `npm run seed` used to insert sample data.  Environment variables need to be set for database name (`DB_NAME`), database user (`DB_USER`), database password (`DB_PASSWORD`), and session secret (`EXPRESS_SESSION_SECRET`).  Optionally, environment variables can be set for an email server (`EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, and `EMAIL_PASSWORD`).  These values will be picked up automatically if they are stored in a `.env` file in the project's root.  See [dotenv](https://www.npmjs.com/package/dotenv) for more details.

## Usage
The front page has a form for users to log in, and links to another form for them to register.  The dashboard shows a list of bills, and has options to add new bills, edit bills, add and edit payments, and set reminders (sent by email).  The payments page shows a list of past and future payments, and allows you to search by date.

## GitHub Repository
The source code for this app is available on GitHub. You can find the repository at:

[GitHub Repository](https://github.com/s2robertson/bill-payment-tracker)

## Accessing the App
You can access the deployed app by visiting the following URL:
[Payment Tracker](https://s2robertson-payment-tracker-2c1497a835bb.herokuapp.com/)


## Credits
In addition to the packages listed in `package.json`, the bill payment tracker uses [Bootstrap](https://getbootstrap.com/), [Date Range Picker](https://www.npmjs.com/package/daterangepicker), [Font Awesome](https://fontawesome.com/), and [jQueryUI](https://jqueryui.com/).  The email functionality was tested with [Ethereal](https://ethereal.email/).

## Screenshots
![A screenshot of the login page](./Payment-Tracker-login-ss.png)
![A screenshot of the dashboard](./Payment-Tracker-bills-ss.png)