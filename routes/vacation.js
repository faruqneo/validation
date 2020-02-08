const express = require('express');
const router = express.Router();
const { apply, list, vacation, response } = require('../controller/vacationController');
const SignController = require('../controller/signController');

router.post('/vacation', apply);
router.get('/vacation',SignController.valid, list);
router.get('/vacation/:vacationId',SignController.valid, vacation);
router.post('/vacationResponse',SignController.valid, response);

module.exports = router;