require('babel-register');
require('babel-polyfill');
require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      network_id: '*',
      host: 'localhost',
      port: process.env.PORT
    },
    ropsten: {
      provider: new HDWalletProvider(process.env.MNEMONIC, process.env.WEB3_PROVIDER_ADDRESS_ROPSTEN),
      network_id: 3,
      gas: process.env.GAS,
      gasPrice: process.env.GAS_PRICE
    },
    rinkeby: {
      provider: new HDWalletProvider(process.env.MNEMONIC, process.env.WEB3_PROVIDER_ADDRESS_RINKEBY),
      network_id: 4,
      gas: process.env.GAS,
      gasPrice: process.env.GAS_PRICE
    },
    kovan: {
      provider: new HDWalletProvider(process.env.MNEMONIC, process.env.WEB3_PROVIDER_ADDRESS_KOVAN),
      network_id: 42
    },
    main: {
      provider: new HDWalletProvider(process.env.MNEMONIC, process.env.WEB3_PROVIDER_ADDRESS_MAIN),
      network_id: 1,
      gas: process.env.GAS,
      gasPrice: process.env.GAS_PRICE
    }
  }
};
