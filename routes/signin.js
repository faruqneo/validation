const express = require('express');
const router = express.Router();
const SignController = require('../controller/signController');
//const authController = require('../controller/authController')

// user signin
router.post('/signin' ,SignController.singin);

// user signup
router.post('/signup', SignController.singup);

// checking jwt token and retrive user data
//router.get('/users',passport.authenticate('jwt', { session: false }), SignController.user);

// showing dashboard
router.get('/dashboard',SignController.valid ,SignController.dashboard);

// delete token
router.get('/delete',SignController.valid ,SignController.logout);

module.exports = router;