const express = require('express');

// controller functions
const { loginUser, signupUser } = require('../controllers/userController');

// creates an instance of a Router
const router = express.Router();

// test route
router.get('/test', (req, res) => res.json({ mssg: 'This is testing route' }));

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

module.exports = router;
