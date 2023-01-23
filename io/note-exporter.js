const fs = require('fs');

module.exports = new class{
    writeAsText(filename, blob){
        const outputstream = fs.createWriteStream('./public/exports/temp.txt');
        if(outputstream.write(blob)){
            return true;
        }
        return false;
    }
}