const NoteAccessDeta = require('../data-access/NoteAccessDeta');
const { Readable } = require('stream');
module.exports = new class{
    async export_note(req,res){
        const noteKey = req.params.rid;
        try{
            const note = await NoteAccessDeta.getNote(noteKey);
            res.setHeader('Content-type','application/octet-stream');
            res.setHeader('Content-disposition','attachment; filename='+note[0].title+'.txt');
            res.send(Buffer.from(note[0].note));
        }catch(err){
            console.log(err);
            res.send("CANNOT EXPORT FILE");
        }        
    }

    async export_all(req,res){
        const userKey = req.session.uid;
        try{
            const notesIterable = NoteAccessDeta.getAllUserNotesGen()(userKey);
            res.setHeader('Content-type','application/octet-stream');
            res.setHeader('Content-disposition','attachment; filename=notes.txt');
            Readable.from(notesIterable).pipe(res);
        }catch(err){
            console.log(err);
            res.send("ERROR WHILE EXPORTING NOTES");
        }
    }
}