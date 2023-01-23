const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}); 

Note = mongoose.model("User", userSchema);

module.exports = Note; 