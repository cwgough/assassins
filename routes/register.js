const express = require('express')
const router = express.Router()
const registerController = require('../controllers/registerController')
//to select all and change to ctrl + d 
router.post('/', registerController.handleRegister)

module.exports = router