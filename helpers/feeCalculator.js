const etherConverter = require("ether-converter");
const hexToDec = require("./hexToDec");

const feeCalculator = (gas, gasPrice) => {
  const transactionFee = +hexToDec(gasPrice) * +hexToDec(gas);
  return Number(etherConverter(transactionFee, "wei").ether).toFixed(10);
};

module.exports = feeCalculator;
