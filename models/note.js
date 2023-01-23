const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserModel = require('./user');

const noteSchema = Schema({
    timestamp: {
        type: Date,
        required: true
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: UserModel
    },
    title:{
        type: String,
        required: true
    },
    note:{
        type: String,
        required: true
    }
}); 

module.exports = Note = mongoose.model("Note", noteSchema); 