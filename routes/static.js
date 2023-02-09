const express = require('express');
const router = express.Router();
const staticCntrl = require('../controllers/static-controller');

router.get('/:rid',staticCntrl.get_file);

module.exports = router;