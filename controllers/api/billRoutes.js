const router = require('express').Router();
const {Bill}  = require('../../models');
const { withApiAuth } = require('../../utils/auth');
const handleSequelizeError = require('../../utils/sequelizeErrorHandler');

router.get('/', withApiAuth, async (req, res) => {
    try {
        const dbBillData = await Bill.findAll({
            where: {
                user_id: req.session.user_id
            }
        });
        res.json(dbBillData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', withApiAuth, async (req, res) => {
    try {
        const dbBillData = await Bill.findByPk(req.params.id, {
            where: {
                user_id: req.session.user_id
            }
        });
        res.json(dbBillData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', withApiAuth, async (req, res) => {
    try {
        const dbBillData = await Bill.create({
            description: req.body.description,
            minimum_due: req.body.minimum_due,
            total_due: req.body. total_due, 
            due_date: req.body.due_date,
            user_id: req.session.user_id,    ///to test user_id: req.body.user_id
                
        });
        res.json(dbBillData);
    } catch (err) {
        console.log(err);
        const message = handleSequelizeError(err);
        if (message) {
            res.status(400).json({ message });
        } else {
            res.status(500).json(err);
        }
    }
});


router.put('/:id', withApiAuth, async (req, res) => { //no WithAuth to test
    try {                                         /// maybe  before try if (req.session) 
        const dbBillData = await Bill.update(
            {
                description: req.body.description,
                total_due: req.body.total_due,
                due_date: req.body.due_date,
                minimum_due: req.body.minimum_due
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                }
            }
        );
        if (dbBillData[0] === 0) {
            res.status(404).json({ message: 'No bill found with this id' });
            return;
        }
        res.json(dbBillData);
    } catch (err) {
        console.log(err);
        const message = handleSequelizeError(err);
        if (message) {
            res.status(400).json({ message });
        } else {
            res.status(500).json(err);
        }
    }
});

router.delete('/:id', withApiAuth, async (req, res) => {
    try {
        const rowsDeleted = await Bill.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        if (rowsDeleted === 0) {
            res.status(404).json({ message: 'No bill found with this id' });
        } else {
            res.json(rowsDeleted);
        }
    } catch (err) {
        console.log(err);
        const message = handleSequelizeError(err);
        if (message) {
            res.status(400).json({ message });
        } else {
            res.status(500).json(err);
        }
    }
})

  
  module.exports = router;
  