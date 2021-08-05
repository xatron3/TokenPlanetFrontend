import factoryAbi from "../abis/PancakeSwapFactory";
import { ethers } from "ethers";
import store from "../store/store";
import contracts from "../helpers/contracts";

class PancakeNewPairController {
  async getNewPairs() {
    const factory = new ethers.Contract(
      contracts.PancakeSwapFactory,
      factoryAbi,
      store.state.provider
    );

    factory.on("PairCreated", async (token0, token1) => {
      if (token0 === contracts.WBNB) {
        store.commit("addNewPairAddress", token1);
      } else {
        store.commit("addNewPairAddress", token0);
      }
    });
  }
}

export default new PancakeNewPairController();
