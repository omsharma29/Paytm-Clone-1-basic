const mongoose = require('mongoose');
const {Account} = require('../backend/db')


const transferfunds = async(fromAccountId, toAccountId, amount)=>{
    const session  = mongoose.startSession();
    (await session).startTransaction()

    try {
        
        // amount decrease from sender 
        const fromAccount=  await Account.findByIdAndUpdate(
            fromAccountId, {$inc : {balance: -amount}},
            {new : true, session}
        )

        if(fromAccount < 0 ){
            throw new Error('Insufficient Balance')
        }

        // amount increase to sender
        const toAccount = await Account.findByIdAndUpdate(
            toAccountId, {$inc : {balance : amount}}, {new:true,session}
        )

        if (!toAccount) {
            throw new Error('Invalid Receiver Account');
        }

        // end of the session
        (await session).commitTransaction();
        (await session).endSession()


    } catch (error) {
        (await session).abortTransaction()
        ;(await session).endSession()

        throw new Error({
            message: 'Transaction failed due to some Technical Glitch'
        })
    }
}

module.exports = transferfunds