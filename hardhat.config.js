require('@nomiclabs/hardhat-waffle');

const ALCHEMY_API_KEY = 'TRViUYEz5AW7IsBAkO0yzpKRvZGGJwJA';
const SEPOLIA_PRIVATE_KEY = 'edfba8eb608f59efff848ec123ba26816cb5602f9a003c30afeee09100b2459c';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",

  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/TRViUYEz5AW7IsBAkO0yzpKRvZGGJwJA`,
      accounts: [`${SEPOLIA_PRIVATE_KEY}`],
    }
  }
};
