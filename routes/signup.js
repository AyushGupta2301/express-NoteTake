const express = require('express');
const router = express.Router();
const signupCntrl = require('../controllers/signup-controller');

router.get('/',signupCntrl.signup_get);
router.post('/',signupCntrl.signup_post);



module.exports = router;