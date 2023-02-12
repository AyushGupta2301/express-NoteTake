window.onload = function(){
    document.getElementById('newpage').addEventListener('click',()=>{
        document.getElementById('newpage').setAttribute('hidden','true');
        document.getElementById('deletepage').setAttribute('hidden','true');
        const parent = document.getElementById("parentid").value;
        const pno = document.getElementById("pno").value;
        console.log(parent, pno);
        const url = "/page/createpage";
        const options = {
            method: 'POST',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                parent: parent,
                pno: pno
            }) 
        };
        fetch(url,options).then((res)=>{
            if(res.status === 200){
                const currKey = parent + String(pno);
                const url = "/notes/"+currKey
                const title = document.getElementById("title").value;
                const note = document.getElementById("note").value;
                const pages = document.getElementById("pages").value;
                const options = {
                    method: 'POST',
                    headers: {
                        "Content-type":"application/json"
                    },
                    body: JSON.stringify({
                        ajax: true,
                        title: title,
                        note: note,
                        pno: pno,
                        parentid: parent,
                        noteid: currKey,
                        pages: Number(pages) + 1
                    })
                };
                fetch(url,options).then((res)=>{
                    if(res.status === 200){
                        const link = document.createElement("a");
                        link.setAttribute('href','/notes/'+parent+String(Number(pno)+1));
                        link.click();
                    }
                });
            }
        });
    });

    document.getElementById('deletepage').addEventListener('click', ()=>{
        document.getElementById('newpage').setAttribute('hidden','true');
        document.getElementById('deletepage').setAttribute('hidden','true');
        const parent = document.getElementById("parentid").value;
        const pno = document.getElementById("pno").value;
        const url = "/page/deletepage";
        const options = {
            method: 'POST',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                parent: parent,
                pno: pno
            }) 
        };
        fetch(url,options).then((res)=>{
            if(res.status === 200){
                const link = document.createElement("a");
                link.setAttribute('href','/notes/'+parent+String(Number(pno)-1));
                link.click();
            }
        });
    })

}