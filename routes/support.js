const express = require('express');
const router = express.Router();
const SupportController = require('../controller/supportController');
const SignController = require('../controller/signController');

// Support mail sending.
router.post('/supportEmail', SupportController.email);

//router.get('/emailReply/:emailId', SupportController.emailReply);
router.post('/emailReply/:emailId', SupportController.emailReplyPost);

router.get('/display/:emailId', SupportController.displayReply);

router.get('/support',SignController.valid, SupportController.start);

router.post('/supportMail',SignController.valid ,SupportController.mail);

router.get('/emails/:emailId' ,SignController.valid, SupportController.message);

router.post('/reply',SignController.valid, SupportController.reply);

router.get('/ticketClose/:emailId',SignController.valid, SupportController.ticket);

router.get('/mail/:emailId', SupportController.query);

module.exports = router;