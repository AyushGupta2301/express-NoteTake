const fs = require('fs');

module.exports = new class{
    writeAsText(filename, blob){
        const outputstream = fs.createWriteStream('./Downloads/'+filename+'.txt');
        if(outputstream.write(blob)){
            return true;
        }
        return false;
    }
}