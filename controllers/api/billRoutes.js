const router = require('express').Router();
const {Bill}  = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbBillData = await Bill.findAll({});
        res.json(dbBillData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const dbBillData = await Bill.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(dbBillData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {    //no WithAuth to test
    if (req.session) {                             /// req.session to test
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
            res.status(400).json(err);
        }
    }
});


router.put('/:id', withAuth, async (req, res) => { //no WithAuth to test
    try {                                         /// maybe  before try if (req.session) 
        const dbBillData = await Bill.update(
            {
                description: req.body.description,
                total_owing: req.body.total_owing,
                due_date: req.body.due_date,
            },
            {
                where: {
                    id: req.params.id
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
        res.status(500).json(err);
    }
});



  
  module.exports = router;
  