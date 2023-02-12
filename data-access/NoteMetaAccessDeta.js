const { Deta } = require('deta');
require('dotenv').config();

const deta = Deta(process.env.detaProjectKey);
const db = deta.Base("notesmetaDB");


module.exports = new class{
    async get(queryObj){
        return (await db.fetch(queryObj)).items;
    }

    async create(Notemeta){
        const newNoteMeta = {
            title: Notemeta.title,
            userid: Notemeta.userid,
            timestamp: String(new Date()),
            pages: 1
        }
        return await db.put(newNoteMeta);
    }

    async update(MetaKey, Notemeta){
        const newNoteMeta = {
            title: Notemeta.title,
            userid: Notemeta.userid,
            timestamp: String(new Date()),
            pages: Notemeta.pages
        }
        return await db.put(newNoteMeta, MetaKey);
    }

    async del(MetaKey){
        return await db.delete(MetaKey);
    }
}
