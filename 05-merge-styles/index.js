const path = require('path');
const fs = require('fs');
const { readdir } = require('fs').promises;

const pathIn = path.join(__dirname, 'project-dist', 'bundle.css');
const pathOut = path.join(__dirname, 'styles');

async function mergeStyles(pathFrom, pathWhere) {

  

  try {

    const files = await readdir(pathFrom, {withFileTypes: true});
    const result = fs.createWriteStream(pathWhere);
    files.forEach(file => {
      
      const p = path.join(pathFrom, file.name);
      if (file.isFile() && path.extname(p) == '.css') {
        
        const readStream = fs.createReadStream(p, 'utf-8');

        readStream.on('data', chunk => {
          result.write(chunk + '\n');
        });
      }
      
    });

  } 

  catch (err) {
    console.error(err);
  }
}

mergeStyles(pathOut, pathIn);

module.exports = mergeStyles;