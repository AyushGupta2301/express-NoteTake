// const models = require('../models');
const { Deta } = require('deta');
require('dotenv').config();

const deta = Deta("sdfd");
const db = deta.Base("notesDB");

// Test
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

    getAllUserNotesGen(){
        return (async function*(UserKey){
            var nextChunk = await db.fetch({userid: UserKey},{limit: 1});
            var currLast = nextChunk.last;
            while(currLast){
                yield Buffer.from(nextChunk.items[0].note);
                nextChunk = await db.fetch({userid: UserKey},{limit: 1, last: currLast});
                currLast = nextChunk.last;
            }
            yield Buffer.from(nextChunk.items[0].note);
        });
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

    async updateNote(NoteKey,UserKey,Note){
        const newNote = {
            key: NoteKey,
            timestamp: String(new Date()),
            title: Note.title,
            userid: UserKey,
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