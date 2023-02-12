const { Deta } = require('deta');
require('dotenv').config();

const deta = Deta(process.env.detaProjectKey);
const db = deta.Base("usersDB");


module.exports = new class{
    async get(type, UserSpec){
        var queryObj;
        switch(type){
            case "key":
                queryObj = {key: UserSpec};
                break;
            case "username":
                queryObj = {username: UserSpec};
                break;
        }
        return (await db.fetch(queryObj)).items;
    }

    async create(User){
        const newUser = {
            name: User.name,
            username: User.username,
            password: User.password,
        }
        return await db.put(newUser);
    }

    async update(UserKey, User){
        const newUser = {
            name: User.name,
            username: User.username,
            password: User.password,
        }
        return await db.put(newUser,UserKey);
    }

    async del(UserKey){
        return await db.delete(UserKey);
    }
}