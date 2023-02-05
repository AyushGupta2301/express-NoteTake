const Deta = require('deta').Deta;
require('dotenv').config();
const deta = Deta(process.env.detaProjectKey);
const files = deta.Drive("sample_folder");

// Testing
// (async ()=>{
//     await files.put("somepdf.pdf",{path: "./RGCS.pdf"});
//     // console.log(await files.list());
//     const filesList = await files.list()
//     console.log(await files.get((filesList.names[0])));
// })();

module.exports = new class{
    async list_all(){
        return await files.list();
    }
    async getFile(filename){
        return await files.get(filename);
    }
    async putFile(filename, data){
        const uploadStatus = await files.put(filename, {data: data, contentType: "text/plain"});
        return uploadStatus;
    }
    async deleteFile(filename){
        return await files.delete(filename);
    }
}