const express = require('express');
const router = express.Router();
const importCntrl = require('../controllers/import-controller');


router.use('/',importCntrl.import_note);


module.exports = router;