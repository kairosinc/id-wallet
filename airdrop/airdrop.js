const BigNumber = require('bignumber.js');
const fs = require('fs');
const fastCsv = require('fast-csv');
const web3utils = require('web3-utils');

function prepareTransfers(instance, filePath) {
  return new Promise((resolve, reject) => {
    const transfers = [];
    const fastCsvStream = fastCsv()
      .on("data", function(data) {
        let address = data[0], value = data[1];
        if (web3utils.isAddress(address) && address != null && address != "" && value > 0) {
          transfers.push({ address, value });
        }
      })
      .on("end", function() {
        return resolve({ instance, transfers });
      });
    fs.createReadStream(filePath).pipe(fastCsvStream);
  });
}

function checkBalances(instance, transfers) {
  let balances = transfers.map(transfer => checkBalance(instance, transfer));
  return new Promise((resolve, reject) => {
    Promise.all(balances)
    .then((transfers) => resolve({ instance, transfers }))
    .catch((error) => reject(error));
  });
}

function checkBalance(instance, transfer) {
  return new Promise((resolve, reject) => {
    instance.balanceOf(transfer.address)
    .then((balance) => resolve({ address: transfer.address, value: transfer.value, current: balance.toNumber() }))
    .catch((error) => reject(error));
  });
}

function filterAccounts(instance, transfers) {
  return { instance, transfers: transfers.filter(entry => entry.current === 0) };
}

function promiseSerial(funcs) {
  return funcs.reduce((promise, func) =>
    promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([])
  )
}

function makeTransactions(instance, account, transfers) {
  let airdrops = transfers.map(transfer => makeTransaction(instance, account, transfer));

  return promiseSerial(airdrops)
  .catch(console.error.bind(console))
}

function makeTransaction(instance, account, entry) {
  return function() {
    return new Promise((resolve, reject) => {
      const decimals = new BigNumber(10).exponentiatedBy(18);
      const bigValue = new BigNumber(entry.value).times(decimals);
      return instance.transfer(entry.address, bigValue.toString())
      .then((response) => resolve(response))
      .catch((error) => reject(error));
    });
  };
}

module.exports = { prepareTransfers, checkBalances, filterAccounts, makeTransactions };
