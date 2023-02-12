const { Readable } = require('stream');
const PageAccessDeta = require('../data-access/PageAccessDeta');
const NoteMetaAccessDeta = require('../data-access/NoteMetaAccessDeta');
module.exports = new class{
    // async export_note(req,res){
    //     const noteKey = req.params.rid;
    //     try{
    //         const note = await NoteAccessDeta.getNote(noteKey);
    //         res.setHeader('Content-type','application/octet-stream');
    //         res.setHeader('Content-disposition','attachment; filename='+note[0].title+'.txt');
    //         res.send(Buffer.from(note[0].note));
    //     }catch(err){
    //         console.log(err);
    //         res.send("CANNOT EXPORT FILE");
    //     }        
    // }

    // async export_all_notes(req,res){ // Not Used Yet
    //     const userKey = req.session.uid;
    //     try{
    //         const notesIterable = NoteAccessDeta.getAllUserNotesGen()(userKey);
    //         res.setHeader('Content-type','application/octet-stream');
    //         res.setHeader('Content-disposition','attachment; filename=notes.txt');
    //         Readable.from(notesIterable).pipe(res);
    //     }catch(err){
    //         console.log(err);
    //         res.send("ERROR WHILE EXPORTING NOTES");
    //     }
    // }

    async export_all_pages(req,res){
        const NoteKey = req.params.rid;
        try{
            const Meta = await NoteMetaAccessDeta.get({key: NoteKey});
            const pagesIterable = PageAccessDeta.getPageStream(NoteKey)();
            res.setHeader('Content-type','application/octet-stream');
            res.setHeader('Content-disposition','attachment; filename='+ Meta[0].title +'.txt');
            Readable.from(pagesIterable).pipe(res);           
        }catch(err){
            console.log(err);
            res.status(400).send("ERROR IN EXPORTING NOTE");
        }
    }
}