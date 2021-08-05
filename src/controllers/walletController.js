import store from "../store/store";
import config from "../helpers/config";
import tokenController from "./tokenController";
import axios from "axios";

class WalletController {
  async connectWallet() {
    try {
      await this._connectWallet();
    } catch (error) {
      console.log(error);
    }
  }

  async _connectWallet() {
    await store.state.provider.send("eth_requestAccounts", []);
    const signer = store.state.provider.getSigner();
    store.commit("setWalletAddress", await signer.getAddress());
    store.commit("setWalletBalance", await signer.getBalance());
    console.log(`Wallet connected with ${await signer.getAddress()}`);
  }

  async loadWalletTokens() {
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

        store.commit("addWalletValue", ownedValue);

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
