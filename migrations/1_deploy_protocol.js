const CAtoken = artifacts.require("CAtoken");

module.exports = function (deployer) {
  deployer.deploy(CAtoken);
};
