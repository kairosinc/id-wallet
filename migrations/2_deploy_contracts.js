const KairosIdentityToken = artifacts.require("./contracts/KairosIdentityToken.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(KairosIdentityToken, process.env.ORACLE_ADDRESS, process.env.CONFIDENCE_THRESHOLD);
};
