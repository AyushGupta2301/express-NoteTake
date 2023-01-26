// The cmodule is based on the Session Store Implementation guide present in the express-session documentation given below
// https://www.npmjs.com/package/express-session

const Deta = require('deta').Deta;
const session = require('express-session');

    class DetaSessionStore extends session.Store{
        constructor(obj){
            super();
            this.deta = Deta(obj.projectKey);
            this.db = this.deta.Base(obj.dbName);
        }

        static create(obj){
            return new DetaSessionStore(obj);
        }

        async set(sid,session,callback){
            const newSession = {
                key : sid,
                session: JSON.stringify(session)
            }
            try{
                const insertedSession = await this.db.put(newSession);
                callback();
            }catch(err){
                callback(err);
            }
        }   

        async get(sid,callback){
            try{
                const querySession = (await this.db.fetch({key: sid}));
                if(querySession.count !== 0){
                    const session = JSON.parse(querySession.items[0].session);

                    callback(null, session);
                }
                else{
                    callback(undefined, undefined);
                }
            }catch(err){
                if(err.code === "ENONET"){
                    callback(null,null);
                }
                else{
                    callback(err,undefined);
                }

            }
        }   

        async destroy(sid,callback){
            try{
                const deleteStatus = await this.db.delete(String(sid));
                callback(undefined);
            }catch(err){
                callback(err);
            }
        }
    }

module.exports = DetaSessionStore;
