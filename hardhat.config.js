require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
// const keys = require('./keys.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.9',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // ropsten: {
    //   chainId: 3,
    //   url: 'https://ropsten.infura.io/v3/5e52170a7c0e442b9152b7b34ca3f80d',
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    rinkeby: {
      chainId: 4,
      url: 'https://rinkeby.infura.io/v3/5e52170a7c0e442b9152b7b34ca3f80d',
      // accounts: [keys.privateKey],
    },
  },
  etherscan: {
    apiKey: '1U35PAZ2JK2HX4X8B4F9HN9MJEG2NRMTVS',
  },
};
