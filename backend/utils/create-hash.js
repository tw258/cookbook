// npm run hash -- myText
// sha256("test") = 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08

const args = process.argv.slice(2);

let text = 'default';
if (args.length > 0) {
  text = args[0];
}

const hashPassword = require('./crypto');
const msg = `SHA256("${text}") = ${hashPassword(text)}`;
console.log(msg);
