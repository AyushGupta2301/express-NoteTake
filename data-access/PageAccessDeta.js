const { Deta } = require('deta');
require('dotenv').config();

const deta = Deta(process.env.detaProjectKey);
const db = deta.Base("pagesDB");

// DEFAULT TESTS
// (async () => {
//     const db = deta.Base("notesDB");
//     const pdb = deta.Base("pagesDB");
//     const allData = await db.fetch();
//     (allData.items).forEach(async note => {
//         if (note.userid) {
//             const newPage = {
//                 data: note.note,
//                 pno: 1,
//                 parent: note.key
//             }
//             const insertStatus = await pdb.put(newPage, note.key + "1");
//             console.log(insertStatus);
//         }

//     });

// })();

module.exports = new class{
    async create(Page){
        const newPage = {
            pno: Number(Page.pno),
            data: Page.data,
            parent: Page.parent
        }
        return await db.put(newPage,Page.key);
    }

    async get(PageKey){
        return (await db.fetch({key: PageKey})).items;        
    }

    getPageStream(ParentKey){
        return (async function* (){
            var nextChunk = await db.fetch({parent: ParentKey},{limit: 1});
            var currLast = nextChunk.last;
            while(currLast){
                yield Buffer.from(nextChunk.items[0].data);
                yield Buffer.from("\n");
                nextChunk = await db.fetch({parent: ParentKey},{limit: 1, last: currLast});
                currLast = nextChunk.last;
            }
            yield Buffer.from(nextChunk.items[0].data);
            yield Buffer.from("\n");
        });
    }    

    async update(PageKey, Page){
        const newPage = {
            pno: Number(Page.pno),
            parent: Page.parent,
            data: Page.data
        }
        return (await db.put(newPage,PageKey));
    }

    async del(PageKey){
        return await db.delete(PageKey);
    }
}