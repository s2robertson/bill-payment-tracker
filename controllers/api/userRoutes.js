const router = require('express').Router();
const {User}  = require('../../models');
const { withApiAuth } = require('../../utils/auth');
const handleSequelizeError = require('../../utils/sequelizeErrorHandler');

router.get('/', async (req, res) => {
    try {
        const dbUserData = await User.findAll({});
        res.json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const dbUserData = await User.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    if (req.session) {
        try {
            const dbUserData = await User.create({
                username: req.body.username, 
                email: req.body.email,
                password: req.body.password
            });
            req.session.user_id = dbUserData.id;
            req.session.logged_in = true;
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            const sequelizeError = handleSequelizeError(err);
            if (sequelizeError) {
              res.status(400).json({ message: sequelizeError });
            } else {
              res.status(500).json(err);
            }
        }
    }
});


router.put('/:id', withApiAuth, async (req, res) => {
    try {                                         /// maybe  before try if (req.session) 
        const dbUserData = await User.update(
            {
                email: req.body.email,
                password: req.body.password
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        if (dbUserData[0] === 0) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    } catch (err) {
        console.log(err);
        const sequelizeError = handleSequelizeError(err);
        if (sequelizeError) {
          res.status(400).json({ message: sequelizeError });
        } else {
          res.status(500).json(err);
        }
    }
});


router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { username: req.body.username } });
  
      if (!userData) {
        res
          .status(403)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(403)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: 'Login failed (error)' });
    }
  });
  
  router.post('/logout', (req, res) => {
    req.session.destroy(() => {
      res.json({ message: 'You are logged out' });
    });
  });
  
  module.exports = router;
  