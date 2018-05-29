const Web3 = require('web3');
const sslListener = require('./wssListener');
const httpListener = require('./httpListener');

const method = process.env.CONNECTION_METHOD;
const url = process.env.CONNECTION_STRING;

const web3 = new Web3(url);

const start = handler => {
  console.log('Method:', method);
  if (method === 'wss') {
    return sslListener.start(web3, handler);
  }

  return httpListener.start(web3, handler);
};

module.exports = {
  start
};
