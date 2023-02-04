const express = require('express');
const router = express.Router();
const exportCntrl = require('../controllers/export-controller');


router.use('/:rid',exportCntrl.export_note);


module.exports = router;