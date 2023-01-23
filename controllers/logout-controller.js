module.exports = new class{
    logout(req,res){
        req.session.destroy((err)=>{
            if(err) res.send("ERROR LOGGING OUT");
            res.redirect('/login');
        });
    }
}