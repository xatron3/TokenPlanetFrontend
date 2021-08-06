import erc20Abi from "../abis/ERC20";
import factoryAbi from "../abis/PancakeSwapFactory";
import { ethers } from "ethers";
import store from "../store/store";
// import axios from "axios";
import priceController from "./priceController";

class TokenController {
  /**
   * Get name, symbol and total supply by Token Address
   * @param {string} tokenAddress
   * @returns
   */
  async getTokenInformation(tokenAddress) {
    const contract = new ethers.Contract(
      tokenAddress,
      erc20Abi,
      store.state.provider
    );

    const name = await contract.name();
    const symbol = await contract.symbol();

    const totalSupply = await contract.totalSupply();
    const decimals = await contract.decimals();
    const formattedTotalSupply = parseInt(
      ethers.utils.formatUnits(totalSupply, decimals)
    );

    const data = {
      name: name,
      symbol: symbol,
      totalSupply: formattedTotalSupply,
    };

    return data;
  }

  /**
   * Get amount of tokens from wallet by token address
   * @param {string} walletAddress
   * @param {string} tokenAddress
   * @returns
   */
  async getTokenAmount(walletAddress, tokenAddress) {
    const contract = new ethers.Contract(
      tokenAddress,
      erc20Abi,
      store.state.provider
    );

    const decimals = await contract.decimals();
    const balance = await contract.balanceOf(walletAddress);

    const formattedBalance = ethers.utils.formatUnits(balance, decimals);

    return formattedBalance;
  }

  /**
   * Get token price from pancakeswap api
   * @param {*} tokenAddress
   * @returns
   */
  async getTokenPrice(tokenAddress) {
    const price = await priceController.getPrice(tokenAddress);
    const priceInBnb = await priceController.getTokenPriceInBNB(tokenAddress);
    // const tokenUrl = `https://api.pancakeswap.info/api/v2/tokens/${tokenAddress}`;

    // const tokenInfo = await axios.get(tokenUrl);

    const data = {
      usdPrice: price,
      bnbPrice: priceInBnb,
    };

    return data;
  }

  /**
   * Get circulating supply
   * @param {string} tokenAddress
   * @returns
   */
  async getCirculatingSupply(tokenAddress) {
    const deadAmount = await this.getTokenAmount(
      "0x000000000000000000000000000000000000dead",
      tokenAddress
    );

    const deadAmount1 = await this.getTokenAmount(
      "0x0000000000000000000000000000000000000000",
      tokenAddress
    );

    const burnedAmount = parseFloat(deadAmount) + parseFloat(deadAmount1);

    const contract = new ethers.Contract(
      tokenAddress,
      erc20Abi,
      store.state.provider
    );

    const totalSupply = await contract.totalSupply();
    const decimals = await contract.decimals();

    const formattedTotalSupply = parseInt(
      ethers.utils.formatUnits(totalSupply, decimals)
    );

    const supply = formattedTotalSupply - burnedAmount;

    return supply;
  }

  /**
   * Get token logo
   * @param {string} tokenAddress
   * @returns
   */
  getTokenLogo(tokenAddress) {
    const checksum = ethers.utils.getAddress(tokenAddress);
    let logoUrl = "";
    const url = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${checksum}/logo.png`;

    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send();

    if (req.status === 200) {
      logoUrl = url;
    } else {
      logoUrl = "https://via.placeholder.com/150x150";
    }

    return Promise.resolve(logoUrl);
  }

  /**
   * Get amount of BNB in Pancake Pair by Token Address and version
   * @param {string} tokenAddress
   * @param {int} version (1/2)
   * @returns
   */
  async getPancakeLP(tokenAddress) {
    const pancakeFactoryAddressV1 = this.getPancakeFactoryAddressByVersion(1);
    const pancakeFactoryAddressV2 = this.getPancakeFactoryAddressByVersion(2);

    const V1PancakeLP = await this.getPancakeLPData(
      tokenAddress,
      pancakeFactoryAddressV1
    );
    const V2PancakeLP = await this.getPancakeLPData(
      tokenAddress,
      pancakeFactoryAddressV2
    );

    const data = {
      V1PancakeLP,
      V2PancakeLP,
    };

    return data;
  }

  async getPancakeLPData(tokenAddress, factoryAddress) {
    const contract = new ethers.Contract(
      factoryAddress,
      factoryAbi,
      store.state.provider
    );

    let data;

    const pairAddress = await contract.getPair(
      tokenAddress,
      "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"
    );

    if (pairAddress !== "0x0000000000000000000000000000000000000000") {
      const bnbAmount = await this.getTokenAmount(
        pairAddress,
        "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"
      );

      const bnbAmountFormatted = parseFloat(bnbAmount).toFixed(2);

      data = {
        pairAddress: pairAddress,
        bnbAmount: bnbAmountFormatted,
      };
    } else {
      data = null;
    }

    return data;
  }

  getPancakeFactoryAddressByVersion(version) {
    switch (version) {
      case 1:
        return "0xBCfCcbde45cE874adCB698cC183deBcF17952812";
      case 2:
        return "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
      default:
        return "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
    }
  }
}

export default new TokenController();
