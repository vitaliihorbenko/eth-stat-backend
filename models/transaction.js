const { Schema, model } = require("mongoose");

const transactionSchema = Schema(
  {
    blockNumber: {
      type: Number,
      required: [true, "BlockNumber is required"],
      index: -1,
    },
    transactionId: {
      type: String,
      required: [true, "TransactionId is required"],
    },
    senderAdress: {
      type: String,
      required: [true, "SenderAdress is required"],
    },
    recipAdress: {
      type: String,
      required: [true, "RecipAdress is required"],
    },
    blockConfirmations: {
      type: Number,
      required: [true, "BlockConfirmations is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    value: { type: Number, required: [true, "Value is required"] },
    transactionFee: {
      type: Number,
      required: [true, "TransactionFee is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
