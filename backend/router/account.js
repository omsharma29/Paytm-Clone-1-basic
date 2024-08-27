// backend/routes/account.js
const express = require('express');
const { auth } = require('../middleware/authentication');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const router = express.Router();


router.get('/balance', auth, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.json({ balance: account.balance });
        console.log(account.balance)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// transfer amount 

router.post('/transfer', auth, async(req,res)=>{
    const session = await mongoose.startSession()

    session.startTransaction()
    const {amount, to} = req.body

    const account = await Account.findOne({userId : req.userId}).session(session)

    if(!account || account.balance < amount){
       await session.abortTransaction()
       res.json({
        message: 'Insufficient Balance'
       })
    }

    const toAccount =  Account.findOne({userId: to}).session(session)
    console.log(toAccount);
    if(!toAccount){
        await session.abortTransaction()
        res.json({
            message: 'Invalid Account'
        })
    }

    await Account.updateOne({userId: req.userId}, {$inc: {balance : -amount}}).session(session)
    await Account.updateOne({userId: to}, {$inc: {balance : amount}}).session(session)

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });

    session.endSession();
})



module.exports = router;