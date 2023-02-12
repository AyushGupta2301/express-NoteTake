const UserAccessDeta = require('../data-access/UserAccessDeta');

module.exports = new class{
    async signup_post(req, res){
        const signUpUser = req.body;
        if(signUpUser.password !== signUpUser.cnfpassword){
            res.render('signup',{message: "Passwords don't match", pageTitle: "Create new account"});
            res.end();
        } 
        else{
            const insertStatus = await UserAccessDeta.create(signUpUser);
            req.session.uid = insertStatus.key; 
            res.redirect('/users/'+insertStatus.key);
        }  
    }

    signup_get(req,res){
        res.render('signup',{message: "", pageTitle: "Create new account"});
    }
}