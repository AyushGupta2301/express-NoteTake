var express = require('express');
var router = express.Router();
const logoutCntrl = require('../controllers/logout-controller');

router.get('/',logoutCntrl.logout)

module.exports = router;