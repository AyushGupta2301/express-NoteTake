const NoteDataAccess = require('../data-access/NoteAccessDeta');

module.exports = new class{
    async user_get(req,res){
        const UserID = req.params.rid;
        try{
            const User = await NoteDataAccess.getUser(UserID);
            // console.log(User);
            const NoteList = await NoteDataAccess.getAllUserNotes(User[0].key);
            var welcomeMsgs = ["Good Day, ", "Looking Productive, ", "Welcome Back, ", "Hey ", "Glad to help, ", "Glad to see you again, ", "Did you eat, ", "How've you been, ","I've got you, ","Can I help, "];
            res.render('usermain',{titleMsg: welcomeMsgs[Math.floor(Math.random()*welcomeMsgs.length)] + User[0].name, noteList: NoteList});
        }
        catch(err){
            console.log(err);
            res.status(400).send("INTERNAL SERVER ERROR");
        }
    }

    async user_page_get(req,res){
        const UserID = req.session.uid;
        try{
            const User = await NoteDataAccess.getUser(UserID);
            const NoteList = await NoteDataAccess.getAllUserNotes(User[0]._id);
            res.render('usermain',{titleMsg: "Welcome " + User[0].name, noteList: NoteList});
        }catch(err){
            console.log(err);
            res.status(400).send("INTERNAL SERVER ERROR");
        }
    }

    async user_post(req,res){
        const User = req.body;
        try{
            const newUser = await NoteDataAccess.createUser(User);
            res.json({message: "NEW USER INSERTED", uid: newUser._id});
            res.end();
        }
        catch(err){
            console.log(err);
            res.status(400).send("INTERNAL SERVER ERROR");
        }
    }
}