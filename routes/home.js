const express = require('express');
const router = express.Router();
const HomeController = require('../controller/homeController');
const SignController = require('../controller/signController');

router.get('/user/:userId',SignController.valid, HomeController.user);

router.post('/slipUpload', SignController.valid, HomeController.upload);

// last user slip
router.get('/slip/:userId', HomeController.slip);

// All of the user
router.get('/slipAllMonth/:userId', HomeController.slipAll);

module.exports = router;