const dayjs = require("dayjs");
const {
  sleep,
  decToHex,
  weiToEth,
  feeCalculator,
  hexToDec,
} = require("../helpers");
const { Transaction } = require("../models");
const { getBlockByNumber, getLastBlock } = require("./getBlocks");

const startTransactionLoop = async () => {
  const start = await getLastBlock();
  const end = start - 1000;
  await getTransactionsLoop(start, end);
};

const checkBlockAndRestart = async (start) => {
  await sleep(1000);

  const currentBlockNumber = await getLastBlock();
  if (currentBlockNumber !== start) {
    const lastBlockNumber = currentBlockNumber - (currentBlockNumber - start);
    console.log(currentBlockNumber, lastBlockNumber);
    getTransactionsLoop(currentBlockNumber, lastBlockNumber);
  } else {
    console.log("restart");
    checkBlockAndRestart(start);
  }
};

const getTransactionsLoop = async (start, end) => {
  await Transaction.deleteMany({ blockNumber: { $lt: start - 1000 } });
  for (let currentBlock = start; currentBlock > end; currentBlock--) {
    await sleep(200);
    const isBlockAlreadyInDB = await Transaction.exists({
      blockNumber: currentBlock,
    });
    console.log(isBlockAlreadyInDB, "isBlockAlreadyInDB");
    if (isBlockAlreadyInDB == null) {
      const blockData = await getBlockByNumber(decToHex(currentBlock));
      console.log(`Number of block: ${currentBlock}`);
      await Promise.all(
        blockData.transactions.map(async (blockItem) => {
          if (blockItem.to) {
            try {
              await Transaction.create({
                blockNumber: hexToDec(blockItem.blockNumber),
                transactionId: blockItem.hash,
                senderAdress: blockItem.from,
                recipAdress: blockItem.to,
                blockConfirmations: 0,
                date: dayjs
                  .unix(hexToDec(blockData.timestamp))
                  .format("MMM-DD-YYYY"),
                value: weiToEth(blockItem.value),
                transactionFee: feeCalculator(
                  blockItem.gas,
                  blockItem.gasPrice
                ),
              });
            } catch (error) {
              console.log(error);
            }
          }
        })
      );
    }
  }
  checkBlockAndRestart(start);
};

module.exports = startTransactionLoop;
