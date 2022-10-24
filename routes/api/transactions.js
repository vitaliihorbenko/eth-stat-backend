const express = require("express");
const { ctrlWrapper } = require("../../middlewares");
const { transactions: ctrl } = require("../../controllers");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getTransactions));

module.exports = router;
