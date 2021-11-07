const path = require('path');
const { readdir, copyFile, mkdir } = require('fs').promises;


const pathIn = path.join(__dirname, 'files-copy');
const pathOut = path.join(__dirname, 'files');
mkdir(pathIn, {recursive: true});
async function copyDir(pathWhere, pathFrom) {
  
  try {
    const files = await readdir(pathFrom, {withFileTypes: true});

    files.forEach(file => {
      copyFile(path.join(pathFrom, file.name),
        path.join(pathWhere, file.name))
        .catch(err => console.log(err));
    });
  }
  catch (err) {
    console.error(err);
  }
}
copyDir(pathIn, pathOut);

module.exports = copyDir;