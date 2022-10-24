const { Transaction } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");
const { getLastBlock } = require("../../services");

const getTransactions = async (req, res) => {
  let totalPageCount;
  let transactions;
  let totalTransactionsCount;
  const currentBlockNumber = await getLastBlock();
  const { filterOption, searchString, page = 1, limit = 14 } = req.query;
  const skip = (+page - 1) * +limit;

  if (searchString && filterOption) {
    if (filterOption === "blockNumber" && !Number(searchString)) {
      throw new BadRequest("Search by block number must have a number");
    }
    transactions = await Transaction.find(
      { [filterOption]: searchString },
      "",
      {
        skip,
        limit: +limit,
      }
    );
    totalTransactionsCount = await Transaction.countDocuments({
      [filterOption]: searchString,
    });
  } else {
    transactions = await Transaction.find({}, "", { skip, limit: +limit });
    totalTransactionsCount = await Transaction.countDocuments();
  }

  totalPageCount = Math.ceil(totalTransactionsCount / limit);

  res.json({
    status: "success",
    code: 200,
    data: {
      transactions,
      totalPageCount,
      page,
      currentBlockNumber,
    },
  });
};

module.exports = getTransactions;
