const express = require("express")
const user = require('./userRoute')
const account = require('./account')
const router = express.Router()

router.use('/users', user)
router.use('/account', account)

module.exports = router