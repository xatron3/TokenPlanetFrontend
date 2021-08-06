import { createStore } from "vuex";
import { ethers } from "ethers";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      wallet: {
        address: null,
        balance: 0,
        tokens: [],
        value: 0,
        tPlanetBalance: 0,
        isAdmin: false,
      },
      provider: null,
      newPairAddresses: [],
    };
  },
  mutations: {
    setProvider(state, provider) {
      state.provider = provider;
    },
    addNewPairAddress(state, tokenAddress) {
      state.newPairAddresses.push(tokenAddress);
    },
    setWalletAddress(state, address) {
      state.wallet.address = address;
    },
    addTokenBalanceValue(state, value) {
      const currentValue = state.wallet.value;

      state.wallet.value = currentValue + parseFloat(value);
    },
    resetTokenBalance(state) {
      state.wallet.value = 0;
    },
    addTokenToWallet(state, tokenAddress) {
      state.wallet.tokens.push(tokenAddress);
    },
    setTPlanetBalance(state, balance) {
      state.wallet.tPlanetBalance = balance;
    },
    isAdmin(state, value) {
      state.wallet.isAdmin = value;
    },
    removeWalletTokens(state) {
      state.wallet.tokens = [];
    },
    setWalletBalance(state, balance) {
      balance = ethers.utils.formatUnits(balance, "ether");
      let formattedBalance;

      if (balance < 1) {
        formattedBalance = parseFloat(balance).toFixed(4);
      } else {
        formattedBalance = parseFloat(balance).toFixed(3);
      }

      state.wallet.balance = formattedBalance;
    },
  },
});

export default store;
