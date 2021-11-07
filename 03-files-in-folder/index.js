const { readdir } = require('fs').promises;
const path = require('path');
const { stat } = require('fs');

async function getAllFiles() {
  try {
    const files = await readdir(path.join(__dirname, 'secret-folder'), {
      withFileTypes: true
    });
    for (const file of files) {
      if (file.isFile()) {
        let p = path.join(__dirname, 'secret-folder', file.name);
        
        await stat(p, async (err, stats) => {
          
          console.log(file.name);
          console.log(path.extname(p));
          console.log(`${(stats.size/1024)}kb`);
          console.log('-------------');
        });
      }
      
    }
      
  } catch (err) {
    console.error(err);
  }
}
console.log('List of files from secret dir');
getAllFiles();