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

  async loadTPlanetBalance() {
    const ownedAmount = await tokenController.getTokenAmount(
      store.state.wallet.address,
      config.tokenAddress
    );

    store.commit("setTPlanetBalance", ownedAmount);
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
