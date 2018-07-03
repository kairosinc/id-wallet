import * as types from './ActionTypes';

export const setAccount = account => {
  return { type: types.SET_ACCOUNT, account };
}

export const getAccount = web3 => {
  return new Promise((resolve, reject) => {
    return web3.eth.getAccounts((error, accounts) => {
      if (error) reject(error);
      else resolve(accounts[0] || null);
    });
  });
}

export const accountListener = (dispatch, web3, token, currentAccount, setShouldReload) => {
  const timer = window.setInterval(() => {
    getAccount(web3).then(account => {
      if (currentAccount !== account) {
        window.clearInterval(timer);
        dispatch(setShouldReload(true));
      }
    });
  }, 2000);
}
