import factoryAbi from "../abis/PancakeSwapFactory";
import pancakePairAbi from "../abis/PancakeSwapPair";
import erc20Abi from "../abis/ERC20";
import { ethers } from "ethers";
import store from "../store/store";
import contracts from "../helpers/contracts";
import helpers from "../helpers/helpers";

class PriceController {
  registerFactoryContract() {
    const factory = new ethers.Contract(
      contracts.PancakeSwapFactory,
      factoryAbi,
      store.state.provider
    );

    return factory;
  }

  registerPairContract(pairAddress) {
    const pancakePair = new ethers.Contract(
      pairAddress,
      pancakePairAbi,
      store.state.provider
    );

    return pancakePair;
  }

  async getTokenDecimals(tokenAddress) {
    const contract = new ethers.Contract(
      tokenAddress,
      erc20Abi,
      store.state.provider
    );

    const decimals = contract.decimals();

    return decimals;
  }

  async getPairAddress(tokenAddress) {
    const factory = await this.registerFactoryContract();

    const pairAddress = factory.getPair(tokenAddress, contracts.WBNB);

    return pairAddress;
  }

  async getPairReserves(pairAddress) {
    const pancakePair = await this.registerPairContract(pairAddress);

    const reserves = await pancakePair.getReserves();

    return reserves;
  }

  async getToken0Address(pairAddress) {
    const pancakePair = await this.registerPairContract(pairAddress);

    const tokenAddress = await pancakePair.token0();

    return tokenAddress;
  }

  async getBNBPrice() {
    const pancakePair = await this.registerPairContract(
      "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16"
    );

    const reserves = await pancakePair.getReserves();

    const bnbAmount = reserves._reserve0 / Math.pow(10, 18);
    const tokenAmount = reserves._reserve1 / Math.pow(10, 18);
    const price = tokenAmount / bnbAmount;

    return price;
  }

  async getTokenPriceInBNB(tokenAddress) {
    const pairAddress = await this.getPairAddress(tokenAddress);
    const pairReserves = await this.getPairReserves(pairAddress);
    const tokenDecimals = await this.getTokenDecimals(tokenAddress);
    const token0 = await this.getToken0Address(pairAddress);
    let bnbAmount, tokenAmount;

    if (token0 === contracts.WBNB) {
      bnbAmount = pairReserves._reserve0 / Math.pow(10, 18);
      tokenAmount = pairReserves._reserve1 / Math.pow(10, tokenDecimals);
    } else {
      bnbAmount = pairReserves._reserve1 / Math.pow(10, 18);
      tokenAmount = pairReserves._reserve0 / Math.pow(10, tokenDecimals);
    }

    const price = bnbAmount / tokenAmount;

    return price;
  }

  async getPrice(tokenAddress) {
    const bnbPrice = await this.getBNBPrice();
    const tokenPriceInBnb = await this.getTokenPriceInBNB(tokenAddress);

    const tokenUsdPrice = await helpers.formatNumber(
      bnbPrice * tokenPriceInBnb
    );

    return tokenUsdPrice;
  }
}

export default new PriceController();
