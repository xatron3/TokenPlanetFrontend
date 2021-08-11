import store from "../store/store";
import config from "../helpers/config";
import tokenController from "./tokenController";
import axios from "axios";

class WalletController {
  /**
   * Called on click to connect wallet.
   */
  async connectWallet() {
    try {
      await this._connectWallet();
    } catch (error) {
      console.log(error);
    }
  }

  async _connectWallet() {
    await store.state.provider.send("eth_requestAccounts", []);
  }

  /**
   * Load wallet address and balance
   */
  async loadNewWallet() {
    const signer = await store.state.provider.getSigner();
    store.commit("setWalletAddress", await signer.getAddress());
    store.commit("setWalletBalance", await signer.getBalance());
    this.checkForAdmin();
    this.loadWalletTokens();
    this.loadTPlanetBalance();
  }

  async checkForAdmin() {
    const isAdmin = config.adminAddresses.indexOf(store.state.wallet.address);

    if (isAdmin !== -1) {
      store.commit("isAdmin", true);
    } else {
      store.commit("isAdmin", false);
    }
  }

  async getTPlanetMembership() {
    const balance = store.state.wallet.tPlanetBalance;
    let membership;

    if (balance >= 100 && balance <= 1000) {
      membership = 1; // Member
    } else if (balance >= 1001 && balance <= 10000) {
      membership = 2; // Bronze
    } else if (balance >= 10001 && balance <= 100000) {
      membership = 3; // Silver
    } else if (balance > 100001) {
      membership = 4; // Golden
    } else {
      membership = 0; // None
    }

    store.commit("setMembership", membership);
  }

  getTPlanetMembershipById(id) {
    switch (id) {
      case 0:
        return "None";
      case 1:
        return "Member";
      case 2:
        return "Bronze";
      case 3:
        return "Silver";
      case 4:
        return "Golden";
      default:
        return "none";
    }
  }

  async loadTPlanetBalance() {
    const ownedAmount = await tokenController.getTokenAmount(
      store.state.wallet.address,
      config.tokenAddress
    );

    store.commit("setTPlanetBalance", ownedAmount);

    this.getTPlanetMembership();
  }

  /**
   * Load tokens that are in wallet from token list
   */
  async loadWalletTokens() {
    if (store.state.wallet.tokens.length > 0) {
      store.commit("removeWalletTokens");
      store.commit("resetTokenBalance");
    }

    const url = `${config.apiUrl}/tokens`;

    const tokens = await axios.get(url);

    const tokenList = tokens.data;

    for (var i = 0; tokenList.length > i; i++) {
      const tokenAddress = tokenList[i].contract_address;

      const ownedAmount = await tokenController.getTokenAmount(
        store.state.wallet.address,
        tokenAddress
      );

      if (parseFloat(ownedAmount) > 0) {
        const tokenPrice = await tokenController.getTokenPrice(tokenAddress);

        const ownedValue =
          parseFloat(ownedAmount) * parseFloat(tokenPrice.usdPrice);

        store.commit("addTokenBalanceValue", ownedValue);

        const data = {
          address: tokenAddress,
          value: ownedValue,
        };

        store.commit("addTokenToWallet", data);
      }
    }
  }
}

export default new WalletController();
