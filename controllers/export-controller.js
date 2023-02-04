const NoteAccessDeta = require('../data-access/NoteAccessDeta');

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
}