const POLL_WAIT_SECONDS = parseInt(process.env.POLL_WAIT_SECONDS, 10) || 30;
const POLL_WAIT_MS = POLL_WAIT_SECONDS * 1000;
const _ = require('lodash');
let w3;
let latestBlockNumber;

const getLatestBlock = () => w3.eth.getBlock('latest');

const processNewBlocks = (result, handler) => {
  if (result.number === latestBlockNumber) return;

  const blockNumbers = [];
  if (result.number > latestBlockNumber) {
    for(let i = latestBlockNumber + 1; i <= result.number; i++) { blockNumbers.push(i); }
  }

  const promises = blockNumbers.map(x => w3.eth.getBlock(x).then(handler));

  latestBlockNumber = _.max(blockNumbers);
  return promises;
};

const start = (web3, handler) => {
  w3 = web3;

  getLatestBlock()
    .then(result => {
      latestBlockNumber = result.number;
    })
    .then(() => {
      setInterval(() => {
        getLatestBlock().then(res => processNewBlocks(res, handler));
      }, POLL_WAIT_MS);
    });
};


module.exports = {
  start
};
