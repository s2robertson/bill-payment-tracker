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
                company: req.body.company,
                account_number: req.body.account_number,
                next_payment_day: req.body.next_payment_day, 
                total_owing: req.body.total_owing,
                minimum_due: req.body.minimum_due,
                total_due: req.body.total_due,
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
                next_payment_day: req.body.next_payment_day,
                total_owing: req.body.total_owing,
                minimum_due: req.body.minimum_due,
                total_due: req.body.total_due,
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
  