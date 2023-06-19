const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const fs = require('fs');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const secret = process.env.EXPRESS_SESSION_SECRET;
if (!secret) {
  console.log('Missing EXPRESS_SESSION_SECRET');
  process.exit(1);
}

const sess = {
  secret,
  cookie: {
    maxAge: 600000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static("images"));




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use("/images", express.static(path.join(__dirname, "/public/images")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
