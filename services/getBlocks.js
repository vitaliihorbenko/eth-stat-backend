const axios = require("axios");
const { hexToDec } = require("../helpers");
const { sleep } = require("../helpers");

const { API_KEY, BASE_URL } = process.env;

const getLastBlock = async () => {
  await sleep(200);
  const { data } = await axios.get(
    `${BASE_URL}?module=proxy&action=eth_blockNumber&apikey=${API_KEY}`
  );
  return hexToDec(data.result);
};

const getBlockByNumber = async (blockNumber) => {
  await sleep(200);
  const { data } = await axios.get(
    `${BASE_URL}?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=${API_KEY}`
  );
  return data?.result;
};

module.exports = { getLastBlock, getBlockByNumber };
