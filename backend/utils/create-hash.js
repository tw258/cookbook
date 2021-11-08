// npm run hash -- myText

const args = process.argv.slice(2);

let text = 'default';
if (args.length > 0) {
  text = args[0];
}

const hashPassword = require('./crypto');
const msg = `SHA256("${text}") = ${hashPassword(text)}`;
console.log(msg);
