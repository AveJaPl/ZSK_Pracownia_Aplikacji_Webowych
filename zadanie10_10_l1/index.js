const fs = require('fs');

function* generateNumbersGenerator() {
  for (let i = 0; i < 20; i++) {
    yield Math.floor(Math.random() * (2137 - (-420) + 1)) - 420;
  }
}

function writeNumbersToFile() {
  const numbers = generateNumbers();
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const filename = `random-${timestamp}.txt`;

  const writeStream = fs.createWriteStream(filename);

  numbers.forEach(number => {
    writeStream.write(number + '\n');
  });

  writeStream.end();
}

writeNumbersToFile();
