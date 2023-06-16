const withPageAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/');
  } else {
    next();
  }
};

const withApiAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.status(401).json({ message: 'Log in to access this content' });
  } else {
    next();
  }
}

module.exports = { withPageAuth, withApiAuth };