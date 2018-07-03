import * as types from './ActionTypes';
const BigNumber = require('bignumber.js');

import { formatTimestamp } from '../utils/language';

export const TransactionFilters = {
  SHOW_ALL : 'SHOW_ALL',
  SHOW_SENT : 'SHOW_SENT',
  SHOW_RECEIVED : 'SHOW_RECEIVED'
};

const setTransactionFilterAction = filter => ({
  type: types.SET_TRANSACTION_FILTER,
  filter
});

export const setTransactionFilter = filter => {
  return (dispatch) => dispatch(setTransactionFilterAction(filter));
}

export const setTransactions = payload => ({
  type: types.SET_TRANSACTIONS, payload
});

const getTransactionType = (log, account) => {
  switch (account) {
    case log.args.from:
      return "Sent";
    case log.args.to:
      return "Received";
    default:
      return undefined;
  }
}

const getTimestamp = (web3, blockNumber) => {
  return new Promise((resolve, reject) => {
    web3.eth.getBlock(blockNumber, (error, block) => {
      if (error) reject(error)
      else resolve(formatTimestamp(block.timestamp));
    });
  });
}

const logsWithTimestamps = (logs, web3) => {
  return logs.map(log => {
    return getTimestamp(web3, log.blockNumber).then(timestamp => {
      log.timestamp = timestamp;
      return log;
    });
  })
}

const craftTxs = (account, resolve) => {
  return (logs) => {
    const decimals = 18;
    const transactions = logs.map(log => {
      const divisor = BigNumber("10").exponentiatedBy(decimals);
      const numericalValue = log.args.value.dividedBy(divisor).toNumber();
      return {
        hash: log.transactionHash,
        value: numericalValue,
        timestamp: log.timestamp,
        type: getTransactionType(log, account),
        blockNumber: log.blockNumber,
        to: log.args.to,
        from: log.args.from
      }
    });
    resolve(transactions);
  }
}

const getRelatedVerifications = (token, transactions, confidenceLimit) => {
  const verificationEvent = token.VerifyUser({ success: true }, { fromBlock: 0, toBlock: 'latest' });
  return new Promise((resolve, reject) => {
    verificationEvent.get(function (error, logs) {
      if (error) reject(error);
      else {
        const transactionHashes = transactions.map(tran => tran.hash);
        resolve(logs.reduce((vers, log) => {
          let confidenceLevel;
          const { transactionHash, args } = log;
          if (transactionHashes.includes(transactionHash)) {
            confidenceLevel = args.confidenceResult.dividedBy(confidenceLimit).toNumber();
            return Object.assign({[transactionHash]: confidenceLevel}, vers);
          } else return vers;
        }, {}));
      }
    });
  });
}

const matchVerificationsToTransactions = (verifications, transactions) => {
  transactions.forEach(tran => {
    if (verifications[tran.hash] !== undefined) {
      tran.verified = true;
      tran.confidence = verifications[tran.hash];
    } else {
      tran.verified = false;
      tran.confidence = 0;
    }
  });
  return transactions;
}

const getDataFromEventLogs = (transferEvent, web3, account) => {
  return new Promise((resolve, reject) => {
    transferEvent.get(function (error, logs) {
      if (error) reject(error);
      else Promise.all(logsWithTimestamps(logs, web3)).then(craftTxs(account, resolve));
    });
  });
}

const fetchTransactionDatasets = (web3, token, account) => {
  const transferEventFromAccount = token.Transfer({ from: account }, { fromBlock: 0, toBlock: 'latest' });
  const transferEventToAccount = token.Transfer({ to: account }, { fromBlock: 0, toBlock: 'latest' });
  return Promise.all([
    getDataFromEventLogs(transferEventFromAccount, web3, account),
    getDataFromEventLogs(transferEventToAccount, web3, account)
  ]);
}

export const getTransactions = (web3, token, account, confidenceLimit) => {
  if (account === null) return [];
  return fetchTransactionDatasets(web3, token, account).then(transactionDatasets => {
    let transactions = transactionDatasets.reduce((transactions, dataset) => {
      return transactions.concat(dataset);
    }, []);
    return getRelatedVerifications(token, transactions, confidenceLimit).then(verifications => {
      transactions = matchVerificationsToTransactions(verifications, transactions);
      transactions.sort((a, b) => b.blockNumber - a.blockNumber);
      return transactions;
    });
  });
}

const listen = (dispatch, web3, token, account, confidenceLimit, filter, getBalance, setBalance) => {
  token.Transfer(filter, (error) => {
    if (error) console.error(error);
    else {
      getBalance(token, account)
        .then(balance => dispatch(setBalance(balance)));
      getTransactions(web3, token, account, confidenceLimit)
        .then(transactions => dispatch(setTransactions(transactions)));
    }
  });
}

export const transactionListener = (dispatch, web3, token, account, confidenceLimit, getBalance, setBalance) => {
  listen(dispatch, web3, token, account, confidenceLimit, { to: account }, getBalance, setBalance);
  listen(dispatch, web3, token, account, confidenceLimit, { from: account }, getBalance, setBalance);
}
