const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');

// const rl = readline.createInterface({stdin, stdout});
const rl = readline.createInterface({input: process.stdin, output : process.stdout});

const file = fs.createWriteStream(path.join(__dirname, 'result.txt'));

console.log('Shoot your message!');

rl.on('line', (input) => {
  writeMessage(input);
});


process.on('exit', sayBye);

function writeMessage(value) {

  if (value.trim() === 'exit') {
    process.exit();
  }

  file.write(value);
}

function sayBye() {
  console.log('See you!');
}