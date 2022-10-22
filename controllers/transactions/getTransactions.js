const { Transaction } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");

const { getLastBlock, getBlockByNumber } = require("../../services");
const {
  hexToDec,
  decToHex,
  weiToEth,
  feeCalculator,
  sleep,
} = require("../../helpers");
const dayjs = require("dayjs");
const MAX_BLOCKS_COUNT = 10;

const getTransactions = async (req, res) => {
  const lastBlockNumber = await getLastBlock();
  const startingBlockNumber = lastBlockNumber - MAX_BLOCKS_COUNT;
  // await Transaction.deleteMany({ blockNumber: { $lt: startingBlockNumber } });

  // for (
  //   let currentBlock = lastBlockNumber;
  //   currentBlock >= startingBlockNumber;
  //   currentBlock--
  // ) {
  //   await sleep(200);
  //   const blockData = await getBlockByNumber(decToHex(currentBlock));
  //   console.log(`Number of block: ${currentBlock}`);
  //   await Promise.all(
  //     blockData.transactions.map(async (blockItem) => {
  //       if (blockItem.to) {
  //         try {
  //           await Transaction.create({
  //             blockNumber: hexToDec(blockItem.blockNumber),
  //             transactionId: blockItem.hash,
  //             senderAdress: blockItem.from,
  //             recipAdress: blockItem.to,
  //             blockConfirmations: 0,
  //             date: dayjs
  //               .unix(hexToDec(blockData.timestamp))
  //               .format("MMM-DD-YYYY"),
  //             value: weiToEth(blockItem.value),
  //             transactionFee: feeCalculator(blockItem.gas, blockItem.gasPrice),
  //           });
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       }
  //     })
  //   );
  // }

  const transactions = await Transaction.find({});
  const totalCount = Math.ceil(transactions.length / 14);

  res.json({
    status: "success",
    code: 200,
    data: {
      transactions,
      totalCount,
    },
  });
};

module.exports = getTransactions;
