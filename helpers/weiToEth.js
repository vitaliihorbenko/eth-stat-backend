const etherConverter = require("ether-converter");
const hexToDec = require("./hexToDec");

const weiToEth = (wei) => {
  const { ether } = etherConverter(hexToDec(wei), "wei");
  return Number(ether).toFixed(10);
};

module.exports = weiToEth;
