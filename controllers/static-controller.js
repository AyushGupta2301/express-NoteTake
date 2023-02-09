const detaDrive = require('../data-access/DetaDrive');
const Buffer = require('buffer').Buffer;

module.exports = new class{
    async get_file(req,res){
        const filename = req.params.rid;
        try{
            const fileBlob = await detaDrive.getFile(filename);
            const fileBufferGen = await fileBlob.arrayBuffer();
            const fileBuffer = Buffer.from(fileBufferGen,'base64');
            // Transfer Encoding is being set to Chunked, maybe that's why the problem
            // That's not the problem
            res.set('Content-type','application/octet-stream');
            res.set('Content-Length', fileBuffer.length);
            // res.setHeader('Transfer-Encoding','chunked');
            // res.send(fileBuffer);
            res.send(fileBuffer);
            // console.log(fileBuffer);
        }catch(err){
            console.log(err);
            res.send("ERROR IN FETCHING RESOURCE");
        }
    }
}