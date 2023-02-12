const NoteMetaAccessDeta = require('../data-access/NoteMetaAccessDeta');
const PageAccessDeta = require('../data-access/PageAccessDeta');


module.exports = new class{
    async import_note(req,res){
        const NoteData = req.body;
        const UserKey = req.session.uid;
        try{
            const Note = {title: NoteData.filename, note: NoteData.data};
            const newMeta = {
                title: Note.title,
                userid: UserKey
            };
            const metainsertStatus = await NoteMetaAccessDeta.create(newMeta);
            const newPage = {
                key: metainsertStatus.key + "1",
                parent: metainsertStatus.key,
                pno: 1,
                data: Note.note
            };
            const pageInsertStatus = await PageAccessDeta.create(newPage);
            res.redirect("/users/"+ UserKey);
        }catch(err){
            console.log(err);
            res.status(400).send("ERROR WHILE IMPORTING FILE");
        }
    }
}
