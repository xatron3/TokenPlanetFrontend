/* eslint-disable */
const providers = require("ethers").providers;
const Web3HttpProvider = require("web3-providers-http");
import walletController from "../controllers/walletController";

const web3Url = new Web3HttpProvider("https://bsc-dataseed1.ninicoin.io/");

import store from "../store/store";

let provider;

const loadProvider = async () => {
  if (typeof window.ethereum !== "undefined") {
    if (window.ethereum.chainId === "0x38") {
      provider = new providers.Web3Provider(window.ethereum, "any");
    } else {
      provider = new providers.Web3Provider(web3Url, "any");
    }
  } else {
    provider = new providers.Web3Provider(web3Url, "any");
  }

  const accounts = await provider.listAccounts();

  store.commit("setProvider", provider);

  if (accounts.length > 0) {
    walletController.loadNewWallet();
    listenForChange();
  }
};

/**
 * Listen for changes in MetaMask
 */
const listenForChange = () => {
  window.ethereum.on("accountsChanged", async (accounts) => {
    walletController.loadNewWallet();
  });

  window.ethereum.on("networkChanged", function(networkId) {
    console.log(networkId);
    // Time to reload your interface with the new networkId
  });
};

loadProvider();
