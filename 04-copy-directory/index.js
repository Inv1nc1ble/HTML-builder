const path = require('path');
const { readdir, copyFile, mkdir, rm } = require('fs').promises;


const pathIn = path.join(__dirname, 'files-copy');
const pathOut = path.join(__dirname, 'files');


async function copyDir(pathWhere, pathFrom) {
  await delDir(pathWhere);
  
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

async function delDir(dir) {
  await rm(dir, {recursive: true, force: true});
  await mkdir(pathIn, {recursive: true});
}


copyDir(pathIn, pathOut);

module.exports = copyDir;