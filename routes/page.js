const express = require('express');
const router = express.Router();
const UserNoteCntrl = require('../controllers/note-controller');

router.post('/createpage',UserNoteCntrl.page_create);
router.post('/deletepage',UserNoteCntrl.page_delete);

module.exports = router;