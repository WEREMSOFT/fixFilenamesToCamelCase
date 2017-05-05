const fs = require('fs');
const path = require('path');
const camelCase = require('uppercamelcase');


function renameFilesRecursive(dir) {

  fs.readdirSync(dir).forEach(it => {
    const itsPath = path.resolve(dir, it);
    const itsStat = fs.statSync(itsPath);

    if (itsStat.isDirectory()) {
      renameFilesRecursive(itsPath)
    } else {
      if(it.indexOf('Msg_') == 0){
        let filename = camelCase(it.split('.')[0]) + '.' + it.split('.')[1];
        let newName = path.resolve(dir, filename);
        try{
          fs.renameSync(itsPath, newName);  
          console.log('renaming : ' + it + ' => ' + filename);  
        }catch(e){
          console.log('ERROR: renaming : ' + it + ' => ' + filename); 
        }
       }
    }
  })
}

renameFilesRecursive('./testFiles');