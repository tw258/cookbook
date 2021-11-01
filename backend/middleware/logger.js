const chalk = require('chalk');

function logger(req, _, next) {
  console.log(
    `${chalk.italic(parseDate(new Date()))}   ${chalk.bold(chalk.white(req.method))} ${chalk.bold(
      chalk.white(req.originalUrl),
    )}`,
  );

  next();
}

function parseDate(date) {
  return addPadding(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
}

function addPadding(timeString) {
  if (timeString[2] != ':') {
    timeString = insertAt(timeString, '0', 0);
  }
  if (timeString[5] != ':') {
    timeString = insertAt(timeString, '0', 3);
  }
  if (timeString.length < 8) {
    timeString = insertAt(timeString, '0', 6);
  }

  return timeString;
}

function insertAt(text, textToInsert, positionToInsertAt) {
  return text.substr(0, positionToInsertAt) + textToInsert + text.substr(positionToInsertAt);
}

module.exports = logger;
