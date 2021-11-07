/* eslint-disable no-inner-declarations */
const path = require('path');
const fs = require('fs');
const { readdir, mkdir, copyFile, rmdir, readFile } = require('fs').promises;
const mergeStyles = require('../05-merge-styles');

const pathIn = path.join(__dirname, 'project-dist');


async function mySuperScript(pathWhere) {
  // delete folder
  await rmdir(pathWhere, {recursive: true, force: true});

  // folder created
  await mkdir(pathWhere, {recursive: true});

  // making HTML
  await makeHtml();

  //copying css
  const pathInCss = path.join(__dirname, 'project-dist', 'style.css');
  const pathOutCss = path.join(__dirname, 'styles');

  await mergeStyles(pathOutCss, pathInCss);

 


  // copying assets
  const pathOutAssets = path.join(__dirname, 'assets');
  const pathInAssets = path.join(__dirname, 'project-dist', 'assets');
  try {
    await checkAllDirs(pathOutAssets,  pathInAssets);
  }
  catch(err) {
    console.error(err);
  }

}

async function checkAllDirs(dirToCheck, dirWhereToCopy) {
  await mkdir(dirWhereToCopy, {recursive: true});

  try {
    const files = await readdir(dirToCheck, {
      encoding: 'utf-8',
      withFileTypes: true
    });

    for(let file of files) {
      if (file.isFile()) {
        await copyFile(path.join(dirToCheck, file.name), path.join(dirWhereToCopy, file.name));
      } else if (file.isDirectory()) {
        await mkdir(path.join(dirWhereToCopy, file.name), {recursive: true});

        await checkAllDirs(
          path.join(dirToCheck, file.name),
          path.join(dirWhereToCopy, file.name)
        );
      }
    }
  }
  catch(err) {
    console.error(err);
  }

  
}

async function makeHtml() {
  try {
    
    const pathInHtml = path.join(pathIn, 'index.html');
    const pathComponents = path.join(__dirname, 'components');

    const writeHtml = fs.createWriteStream(pathInHtml, 'utf-8');
    const readHtml = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');

    readHtml.on('data', async (chunk) => {
      async function getHtmlData() {
        let data = chunk.toString();
        const files = await readdir(pathComponents, {withFileTypes: true});
        for (let file of files) {
          let p = path.join(pathComponents, file.name);
          const component = await readFile(p, {encoding: 'utf-8'});

          const element = path.parse(p);
          data = data.replace(`{{${element.name}}}`, `${component}`);
          
        }
        return data;
      }
      let compHtml = await getHtmlData();
      writeHtml.write(compHtml);

    });
  }
  catch (err) {
    console.error(err);
  }
}



mySuperScript(pathIn);