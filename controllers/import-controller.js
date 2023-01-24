const NoteDataAccess = require('../data-access/NoteAccessDeta');


module.exports = new class{
    async import_note(req,res){
        const NoteData = req.body;
        const UserID = req.session.uid;
        try{
            const newNote = {title: NoteData.filename, note: NoteData.data};
            const insertStatus = await NoteDataAccess.createNote(UserID, newNote);
            res.redirect("/users/"+ UserID);
        }catch(err){
            console.log(err);
            res.status(400).send("ERROR WHILE IMPORTING FILE");
        }
    }
}
