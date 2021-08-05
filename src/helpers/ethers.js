/* eslint-disable */
const providers = require("ethers").providers;
const Web3HttpProvider = require("web3-providers-http");

const web3Url = new Web3HttpProvider("https://bsc-dataseed1.ninicoin.io/");

import store from "../store/store";

let provider;

const loadProvider = async () => {
  if (typeof window.ethereum !== "undefined") {
    if (window.ethereum.chainId !== "0x38") {
      console.log("Wrong chain selected, going with public node");
      provider = new providers.Web3Provider(web3Url, "any");
    } else {
      console.log("Found metamask, chosing this node");

      provider = new providers.Web3Provider(window.ethereum, "any");
      const accounts = await provider.listAccounts();

      if (accounts.length !== 0) {
        const balance = await provider.getBalance(accounts[0]);

        store.commit("setWalletAddress", accounts[0]);
        store.commit("setWalletBalance", balance);
      }
    }
    listenForChange();
  } else {
    console.log("Could not find metamask");

    provider = new providers.Web3Provider(web3Url, "any");
  }

  store.commit("setProvider", provider);
};

/**
 * Listen for changes in MetaMask
 */
const listenForChange = () => {
  window.ethereum.on("accountsChanged", async (accounts) => {
    store.commit("setWalletAddress", accounts[0]);
    const balance = await provider.getBalance(accounts[0]);
    store.commit("setWalletBalance", balance);
    store.commit("removeWalletTokens");
  });

  window.ethereum.on("networkChanged", function(networkId) {
    console.log(networkId);
    // Time to reload your interface with the new networkId
  });
};

loadProvider();
