const models = require('../models');
const { Deta } = require('deta');

const deta = Deta("d0wpxns6_c2HAWHsQD8c3dKenNJjPpSYghjWNX8jJ");
const db = deta.Base("notesDB");
// (async ()=>{
//     const newNote = {
//         timestamp: String(new Date()),
//         userid: "63ca2f19b46f9de4e5466",
//         title: "Note.title",
//         note: "Note.note"
//     };
//     const validation = await models.NoteModel.validate(newNote);
//     console.log(validation._message);
    
// })();

module.exports = new class{
    async getAllUserNotes(UserKey){
        return (await db.fetch({userid: UserKey})).items;
    }

    async getNote(NoteKey){
        return (await db.fetch({key: NoteKey})).items; 
    }
    async getUser(UserKey){
        return (await db.fetch({key: UserKey})).items;
    }

    async getunameUser(Username){
        return (await db.fetch({username: Username})).items;
    }

    async createNote(UserKey, Note){
        const newNote = {
            timestamp: String(new Date()),
            userid: UserKey,
            title: Note.title,
            note: Note.note
        };
        // const validation = await models.NoteModel.validate(newNote);
        return await db.put(newNote); 
    }

    async createUser(User){
        const newUser = {
            name: User.name,
            username: User.username,
            password: User.password
        };
        return await db.put(newUser);
    }

    async updateNote(NoteKey,Note){
        const newNote = {
            key: NoteKey,
            timestamp: String(new Date()),
            title: Note.title,
            note: Note.note
        }
        return await db.put(newNote);
    }

    async updateUser(UserKey, User){
        const newUser = {
            key: UserKey,
            name: User.name,
            username: User.username,
            password: User.password
        }
        return await db.put(newUser);
    }

    async deleteNote(NoteKey){
        return await db.delete(NoteKey);
    }

    async deleteUser(UserKey){
        return await db.delete(UserKey);
    }
}   