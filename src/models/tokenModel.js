import database from "../helpers/database";

class TokenModel {
  async addToken(tokenAddress) {
    const tokenInfoRef = database.ref(`token-info/${tokenAddress}`);

    tokenInfoRef.set({
      tokenAddress: tokenAddress,
    });
  }
}

export default new TokenModel();
