require('dotenv').config();

const listener = require('./blockListener');

console.log('Listening...');

listener.start(data => {
  const avg = data.gasUsed / data.transactions.length;
  console.log('block', data.number, avg, "gas/transaction");
});
