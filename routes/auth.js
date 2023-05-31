const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/manufacturer-login', authController.getLoginManufacturer)

router.post('/manufacturer-login', authController.postLoginManufacturer)

router.get('/transporter-login', authController.getLoginTransporter)

router.post('/transporter-login', authController.postLoginTransporter)

router.get('/manufacturer-signup', authController.getSignupManufacturer)

router.post('/manufacturer-signup', authController.postSignupManufacturer)

router.get('/transporter-signup', authController.getSignupTransporter)

router.post('/transporter-signup', authController.postSignupTransporter)

module.exports = router;

