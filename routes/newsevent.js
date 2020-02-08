const express = require('express');
const router = express.Router();

const SignController = require('../controller/signController');
const NewsEventController = require('../controller/newsEventsController');

router.get('/newsevent',SignController.valid, NewsEventController.newsevent);
router.post('/newseventpost',SignController.valid, NewsEventController.postnewsevents);

router.get('/deleteEvent/:eventID', SignController.valid, NewsEventController.deleteEvent);
router.get('/news&event/:eventID', SignController.valid, NewsEventController.editEvent);

router.post('/news&EventEdit', SignController.valid, NewsEventController.editEventPost);

module.exports = router;