var express = require('express');
var router = express.Router();
const UserNoteCntrl = require('../controllers/user-controller');

/* GET users listing. */

router.use((req,res,next)=>{
  // console.log(req.session.uid);
  if(!req.session.uid){
      res.redirect('/login');
  }
  else{
      next();
  }
});

router.get('/', UserNoteCntrl.user_page_get)
router.get('/:rid', UserNoteCntrl.user_get);
router.post('/', UserNoteCntrl.user_post);

module.exports = router;
