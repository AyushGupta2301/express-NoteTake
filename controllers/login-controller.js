const NoteDataAccess = require('../data-access/NoteAccessDeta');

module.exports = new class{
    async login_get(req,res){
        try{
            res.render('login', {message: ""});
        }catch(err){
            res.status(400).send("INTERNAL SERVER ERROR");
        }
    }

    async login_post(req,res){
        const queryUser = req.body;
        try{
            const User = await NoteDataAccess.getunameUser(queryUser.username);
            // console.log(User);
            if(User.length && User[0].password === queryUser.password){
                req.session.uid = User[0].key;
                
                res.redirect('/users/'+ User[0].key);
                res.end();
            }
            else{
                res.render('login',{message: "Username or Password Incorrect"});
            }
        }catch(err){
            console.log(err);
            res.status(400).send("INTERNAL SERVER ERROR");
        }
    }
}