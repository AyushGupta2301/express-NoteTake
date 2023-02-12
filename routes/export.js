const express = require('express');
const router = express.Router();
const exportCntrl = require('../controllers/export-controller');


router.get('/:rid',exportCntrl.export_all_pages);
// router.get('/all',exportCntrl.export_all); // will add export all later


module.exports = router;