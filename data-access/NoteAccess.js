const Models = require('../models');

module.exports = new class NoteAccess{
    // async getAllNotes(){
    //     const allNotes = await Models.NoteModel.find();
    //     return allNotes;
    // }

    // async getAllUsers(){
    //     const allUsers = await Models.UserModel.find();
    //     return allUsers;
    // }

    async getAllUserNotes(UserID){
        return await Models.NoteModel.find({userid: UserID});
    }

    async getNote(NoteID){
        return await Models.NoteModel.find({_id: NoteID});
    }

    async getUser(UserID){
        return await Models.UserModel.find({_id: UserID});
    }

    async getunameUser(Username){
        return await Models.UserModel.find({username: Username});
    }

    async createNote(UserID, Note){
        const newNote = new Models.NoteModel({
            timestamp: String(new Date()),
            userid: UserID,
            title: Note.title,
            note: Note.note
        });
        return await newNote.save(); 
    }

    async createUser(User){
        const newUser = new Models.UserModel({
            name: User.name,
            username: User.username,
            password: User.password
        });
        return await newUser.save();
    }

    async updateNote(NoteID,Note){
        const newNote = {
            timestamp: new Date(),
            title: Note.title,
            note: Note.note
        }
        return await Models.NoteModel.updateOne({_id: NoteID},{$set: newNote});
    }

    async updateUser(UserID, User){
        const newUser = {
            id: User.id,
            name: User.name,
            username: User.username,
            password: User.password
        }
        return await Models.UserModel.updateOne({_id:UserID}, { $set: newUser});
    }

    async deleteNote(NoteID){
        return await Models.NoteModel.deleteOne({_id:NoteID});
    }

    async deleteUser(UserID){
        return await Models.UserModel.deleteOne({_id:UserID});
    }
}