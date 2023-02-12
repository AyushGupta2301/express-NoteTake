const UserAccessDeta = require('../data-access/UserAccessDeta');
const NoteMetaAccessDeta = require('../data-access/NoteMetaAccessDeta');

module.exports = function(){
    const sortLogic = function(note1,note2){
        return (note1.title).localeCompare(note2.title);
    }
    return new class{
        async user_get(req,res){
            const UserKey = req.params.rid;
            try{
                if(UserKey !== req.session.uid){
                    throw new Error("Authorization failure");
                }
                const User = await UserAccessDeta.get("key", UserKey);
                const NoteList = await NoteMetaAccessDeta.get({userid: UserKey});
                NoteList.sort(sortLogic);
                var welcomeMsgs = ["Good Day, ", "Looking Productive, ", "Welcome Back, ", "Hey ", "Glad to help, ", "Glad to see you again, ", "Did you eat, ", "How've you been, ","I've got you, ","Can I help, "];
                res.render('usermain',{titleMsg: welcomeMsgs[Math.floor(Math.random()*welcomeMsgs.length)] + User[0].name, noteList: NoteList, pageTitle: User[0].name + "'s notes"});
            }
            catch(err){
                console.log(err);
                res.status(400).send("INTERNAL SERVER ERROR");
            }
        }
    
        async user_page_get(req,res){
            const UserKey = req.session.uid;
            try{
                res.redirect("/users/"+UserKey);
                // const User = await NoteDataAccess.getUser(UserID);
                // const NoteList = await NoteDataAccess.getAllUserNotes(User[0].key);
                // NoteList.sort(sortLogic);
                // res.render('usermain',{titleMsg: "Welcome " + User[0].name, noteList: NoteList});
            }catch(err){
                console.log(err);
                res.status(400).send("INTERNAL SERVER ERROR");
            }
        }
    
        // async user_post(req,res){
        //     const User = req.body;
        //     try{
        //         const newUser = await UserAccessDeta.create(User);
        //         res.json({message: "NEW USER INSERTED", uid: newUser.key});
        //         res.end();
        //     }
        //     catch(err){
        //         console.log(err);
        //         res.status(400).send("INTERNAL SERVER ERROR");
        //     }
        // }
    }
}();

