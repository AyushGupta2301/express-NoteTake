const NoteDataAccess = require('../data-access/NoteAccessDeta');

module.exports = new class{
    async signup_post(req, res){
        const signUpUser = req.body;
        if(signUpUser.password !== signUpUser.cnfpassword){
            res.render('signup',{message: "Passwords don't match", pageTitle: "Create new account"});
            res.end();
        } 
        else{
            await NoteDataAccess.createUser(signUpUser);
            res.redirect('/login');
        }  
    }

    signup_get(req,res){
        res.render('signup',{message: "", pageTitle: "Create new account"});
    }
}