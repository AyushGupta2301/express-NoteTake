var express = require('express');
var router = express.Router();
const UserNoteCntrl = require('../controllers/note-controller');

router.use((req,res,next)=>{
    // console.log(req.session.uid);
    if(!req.session.uid){
        res.redirect('/login');
    }
    else{
        next();
    }
  });

router.get('/:rid',UserNoteCntrl.note_get);
router.post('/:rid',UserNoteCntrl.note_update);
router.post('/',UserNoteCntrl.note_post);
router.get('/',UserNoteCntrl.note_page_get);
router.get('/delete/:rid',UserNoteCntrl.note_delete);
router.get('/export/:rid',UserNoteCntrl.export_note);

module.exports = router;