const mongoose = require("mongoose");
const app = require("../app");
const startTransactionLoop = require("../services/getTransactionsLoop");

const { PORT = 3000, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      startTransactionLoop();
    })
  )
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
