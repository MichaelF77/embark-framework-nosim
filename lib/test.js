var web3 = require('web3');

Test = function(contractFiles, blockchainFile, contractFile, _env) {
  web3.setProvider(new web3.providers.HttpProvider("http://localhost:8101"));
  this.env = _env || 'development';
  this.web3 = web3;
  this.contractFiles = contractFiles;

  Embark.init(this.web3);
  Embark.blockchainConfig.loadConfigFile(blockchainFile);
  Embark.contractsConfig.loadConfigFile(contractFile);

  Embark.contractsConfig.init(this.contractFiles, this.env);
}

Test.prototype.deployAll = function(cb) {
  Embark.deployContracts('development', this.contractFiles, "/tmp/abi.js", "chains.json", false, false, function(abi) {
    eval(abi);
    cb();
  });
}

module.exports = Test;
