const e = require('express');
const NoteMetaAccessDeta = require('../data-access/NoteMetaAccessDeta');
const PageAccessDeta = require('../data-access/PageAccessDeta');

// const NoteExports = require('../io/note-exporter');

module.exports = new class {
    async note_get(req, res) { // GET call
        const PageKey = req.params.rid;
        try {
            const Page = await PageAccessDeta.get(PageKey);
            const NoteMeta = await NoteMetaAccessDeta.get({ key: Page[0].parent });
            if (NoteMeta[0].userid !== req.session.uid) {
                throw new Error("Unauthorized User");
            }
            const Noteobj = {
                title: NoteMeta[0].title,
                timestamp: NoteMeta[0].timestamp,
                note: Page[0].data,
                pno: Page[0].pno,
                pages: NoteMeta[0].pages,
                key: Page[0].key,
                parent: Page[0].parent
            };
            res.render('noteview', { note: Noteobj });
        }
        catch (err) {
            console.log(err);
            res.status(400).send("ERROR GETTING NOTE");
        }
    }

    async note_enter(req, res) {
        res.render('noteenter', { pageTitle: "Enter Note" });
    }

    async page_update(req, res) { // forms submit and ajax
        const newPage = req.body;
        try {
            const UserKey = req.session.uid;
            const updatedMeta = {
                title: newPage.title,
                userid: UserKey,
                pages: newPage.pages
            };

            const updatedPage = {
                data: newPage.note,
                pno: newPage.pno,
                parent: newPage.parentid
            };

            const updateMetaStatus = await NoteMetaAccessDeta.update(newPage.parentid, updatedMeta);
            const updatePageStatus = await PageAccessDeta.update(newPage.noteid, updatedPage);
            if(req.body.ajax){
                res.send("SUCCESS");
            }
            else{
                res.redirect("/notes/" + newPage.noteid);
            }
        } catch (err) {
            console.log(err);
            res.status(400).send("ERROR WHILE UPDATING NOTE");
        }

    }

    async page_create(req, res) { // ajax call
        // cannot insert pages in the middle
        const newPageDet = req.body;
        const newPageKey = newPageDet.parent + String(Number(newPageDet.pno) + 1);
        try {
            const newPage = {
                pno: Number(newPageDet.pno) + 1,
                parent: newPageDet.parent,
                key: newPageKey
            }
            const insertStatus = await PageAccessDeta.create(newPage);
            const oldMeta = await NoteMetaAccessDeta.get({ key: newPageDet.parent });
            const newMeta = oldMeta[0];
            newMeta.pages = Number(newMeta.pages) + 1;
            const metainsertStatus = await NoteMetaAccessDeta.update(newPageDet.parent, newMeta);
            res.send("SUCCESS");
        } catch (err) {
            console.log(err);
            res.status(400).send("ERROR CREATING PAGE");
        }
    }

    async page_delete(req, res) { // ajax call
        const delPage = req.body;
        delPage.pno = Number(delPage.pno);
        try {
            const Meta = await NoteMetaAccessDeta.get({ key: delPage.parent });
            if (Number(delPage.pno) === Number(Meta[0].pages)) {
                await PageAccessDeta.del(delPage.parent + String(Meta[0].pages));
            }
            else {
                for (let i = delPage.pno + 1; i < Number(Meta[0].pages) + 1; i++) {
                    const oldPage = await PageAccessDeta.get(Meta[0].key + String(i));
                    await PageAccessDeta.del(oldPage[0].key)
                    oldPage[0].pno = Number(oldPage[0].pno) - 1;
                    oldPage[0].key = Meta[0].key + String(i - 1);
                    await PageAccessDeta.update(oldPage[0].key, oldPage[0]);
                }
            }
            Meta[0].pages = Number(Meta[0].pages) - 1;
            await NoteMetaAccessDeta.update(Meta[0].key, Meta[0]);
            res.send("SUCCESS");
            // if its the last page then simply delete.
            // lowering the key and pno from delPage.pno + 1 to Meta.Pages + 1
            // finally update meta
        } catch (err) {
            console.log(err);
            res.status(400).send("ERROR IN DELETING PAGE");
        }
    }

    async note_delete(req, res) { // forms submit
        const NoteKey = req.params.rid;
        try {
            const NoteMeta = await NoteMetaAccessDeta.get({ key: NoteKey });
            const pages = Number(NoteMeta[0].pages);
            const deleteStatus = await NoteMetaAccessDeta.del(NoteKey);
            for (let i = 1; i < pages + 1; i++) {
                const pageDel = await PageAccessDeta.del(NoteKey + String(i));
            }
            res.redirect('/users/' + req.session.uid);
        } catch (err) {
            console.log(err);
            res.status(400).send("ERROR WHILE DELETEING THE NOTE");
        }
    }

    async note_post(req, res) { // forms submit
        const UserKey = req.session.uid;
        const Note = req.body;
        try {
            const newMeta = {
                title: Note.title,
                userid: UserKey
            };
            const metainsertStatus = await NoteMetaAccessDeta.create(newMeta);
            const newPage = {
                key: metainsertStatus.key + "1",
                parent: metainsertStatus.key,
                pno: 1,
                data: Note.note
            };
            const pageInsertStatus = await PageAccessDeta.create(newPage);
            res.redirect('/users/' + req.session.uid);
        } catch (err) {
            console.log(err);
            res.status(400).send("INTERNAL SERVER ERROR");
        }
    }
}