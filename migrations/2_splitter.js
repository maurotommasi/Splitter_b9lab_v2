const Splitter = artifacts.require("Splitter");
module.exports = function(deployer, network, accounts) {
  const maxGas = 20000000;
  let owner = accounts[0];
  const running = true;
  deployer.deploy(Splitter, running,  maxGas, {from : owner});
};
