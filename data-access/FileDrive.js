const Deta = require('deta').Deta;
const deta = Deta("d0wpxns6_c2HAWHsQD8c3dKenNJjPpSYghjWNX8jJ");

const files = deta.Drive("sample_folder");

// Testing
(async ()=>{
    await files.put("somepdf.pdf",{path: "./RGCS.pdf"});
    // console.log(await files.list());
    const filesList = await files.list()
    console.log(await files.get((filesList.names[0])));
})();

module.exports = new class{
    async list_all(){
        // here the folders should be user's keys, but shared space issue
    }
}