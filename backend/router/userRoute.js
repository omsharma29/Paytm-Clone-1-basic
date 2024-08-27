const express = require('express')
const router = express.Router()
const zod = require("zod")
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const {User, Account} = require('../db')
const {auth} = require('../middleware/authentication')


// to signUp
const SignUpSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(8, 'Password must contain 8 characters'),
})

router.post('/signup', async (req, res) => {
    console.log('Received request body:', req.body);
    const { success } = SignUpSchema.safeParse(req.body);
    console.log('Validation result:', success);

    if (!success) {
        return res.json({ message: 'incorrect inputs' });
    }

    try {
        const dbUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        const userId = dbUser.id;

        await Account.create({
            userId,
            balance: 1 + Math.random() * 1000
        });

        const token = jwt.sign({ userId }, JWT_SECRET);
        res.json({
            message: 'User created successfully',
            token: token
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// to signIn

const SignInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async (req, res) => {
    const body = req.body 
    const {success} = SignInSchema.safeParse(body)
    console.log('Parse result:', success);
    if (!success) {
        return res.json({ message: 'input validation', errors: success.error });
    }


    const user = await User.findOne({username: body.username, password : body.password})
    if(user){
        const token = jwt.sign({
            userID : user._id}
        , JWT_SECRET)
        return res.status(200).json({
            message: 'login susessfull',
            token
        })
    }
    res.status(411).json({
        message: "Error while logging in"
    })
})


// to update information 

const updateSchema = zod.object({
    username : zod.string().email(),
    firstname : zod.string(),
    password : zod.string().min(8, 'Please enter minimum 8 character')
})

router.put('/', auth, async (req, res) => { // Correct order: (req, res)
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: 'Error while Updating'
        });
    }

    try {
        await User.updateOne({ _id: req.userId }, req.body);

        res.json({
            message: "Updated successfully"
        });
    } catch (error) {
        throw new Error('Internal server error: ' + error.message)
        res.status(500).json({
            message: "Internal server error"
        });
    }
});



// to filter 

router.get('/bulk', async(req, res)=>{
    const filter = req.query.filter || ""

    const user = await User.find({
        $or:[ {firstName:{ $regex: filter, $options: 'i' }},
             {lastName :{ $regex: filter, $options: 'i' }},]
    })

    res.json({
        user : user.map(user => ({
            username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
        }))
    })
})


module.exports = router


