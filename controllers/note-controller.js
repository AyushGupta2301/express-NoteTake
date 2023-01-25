const path  = require('path');
const NoteDataAccess = require('../data-access/NoteAccessDeta');
const NoteExports = require('../io/note-exporter');

module.exports = new class{
    async note_get(req,res){
        const NoteID = req.params.rid;
        try{
            const Note = await NoteDataAccess.getNote(NoteID);
            const Noteobj = {timestamp: Note[0].timestamp, title: Note[0].title, note: Note[0].note, key: Note[0].key}
            // console.log(Noteobj.timestamp);
        
            res.render('noteview', {note: Noteobj});
        }
        catch(err){
            res.status(400).send("INTERNAL SERVER ERROR");
        }
    }

    async export_note(req,res){
        const NoteID = req.params.rid;
        try{
            const Note = await NoteDataAccess.getNote(NoteID);
            const NoteData = Note[0].note;
            if(!NoteExports.writeAsText(Note[0].title,String(NoteData))){
                // res.sendFile('temp.txt',{root: './public/exports'});
                throw new Error("Exporting error");
            }
        }catch(err){
            console.log(err);
            res.status(400).send("ERROR WHILE EXPORTING THE NOTE");
        }
    }

    async import_note(req,res){
        const FileData = req.body;
        const FileBlobStr = FileData.blob;
        const FileName = FileData.filename;
        try{
            const newNote = {title: FileData.filename, timestamp: FileData.lastmodified, note: FileData.note};
        }catch(err){
            console.log(err);
            res.status(400).send("ERROR WHILE EXPORTING THE NOTE");
        }
    }

    async note_page_get(req,res){
        res.render('noteenter');
    }

    async note_update(req,res){
        const Note = req.body;
        const UserKey = req.session.uid;
        const updatedNote = {title: Note.title, note:Note.note};
        try{
            const updateStatus = await NoteDataAccess.updateNote(Note.noteid,UserKey,updatedNote);
            res.redirect('/notes/'+Note.noteid);
        } catch(err){
            res.status(400).send("ERROR WHILE UPDATING NOTE");
        }

    }

    async note_delete(req,res){
        const NoteID = req.params.rid;
        try{
            const deleteStatus = NoteDataAccess.deleteNote(NoteID);
            res.redirect('/users/'+ req.session.uid);
        }catch(err){
            res.status(400).send("ERROR WHILE DELETEING THE NOTE");
        }
    }

    async note_post(req,res){
        const UserID = req.session.uid;
        const Note = req.body;
        try{
            const newNote = await NoteDataAccess.createNote(UserID, Note);
            res.redirect('/users/'+ req.session.uid);
        }catch(err){
            console.log(err);
            res.status(400).send("INTERNAL SERVER ERROR");
        }
    }
}