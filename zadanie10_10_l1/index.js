const fs = require('fs');

function generateNumbers() {
  const numbers = [];
  for (let i = 0; i < 20; i++) {
    numbers.push(Math.floor(Math.random() * (2137 - (-420) + 1)) - 420);
  }
  return numbers;
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
