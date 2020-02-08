const express = require('express');
const router = express.Router();
const { calendar } = require('../controller/calendar');


router.get('/calendar/event', calendar);

module.exports = router;