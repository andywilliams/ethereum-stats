const subscriptionType = 'newBlockHeaders';

const start = (web3, handler) => web3.eth.subscribe(subscriptionType, handler);

module.exports = {
  start
};
