    const importBtn = document.getElementById('importBtn');
    importBtn.addEventListener('click',()=>{
    let file = document.getElementById("importFile").files[0];
    console.log(file);
    let reader = new FileReader();
    reader.readAsText(file);
    var filePath = document.getElementById("importFile").value;
    var fileName = filePath.substr(filePath.lastIndexOf("\\")+1);
    var fileNameabs = fileName.substr(0,fileName.lastIndexOf(".")); 
    reader.onload = ()=>{
        let url = "/import";
        let options = {
        method: "POST",
        body: JSON.stringify({data: reader.result, filename: fileNameabs}),
        headers: {
                "Content-type": "application/json"
            }
        }
        fetch(url,options).then((res)=>{
            window.location.reload();
        });
    } 
    });