var express = require('express');
var router = express.Router();
const loginCntrl = require('../controllers/login-controller');

router.get('/',loginCntrl.login_get);
router.post('/', loginCntrl.login_post);

module.exports = router;