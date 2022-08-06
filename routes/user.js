const express = require('express')

const router = express.Router()

const userController = require('../controllers/userController')
const auth = require('../middleware/auth')

// Register User

router.post('/register', userController.registerUser)

// Login User

router.post('/login', userController.loginUser )

// Verificar token

router.get('/verify', userController.verifiedUser)

module.exports = router
