// async function deployFunc(hre) {
//   console.log("Hi...")
// }
// module.exports.default = deployFunc

// module.exports = async (hre) => {
//   const { getNamedAccounts, deployments } = hre
// }

const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainID = network.config.chainId

  let ethUsdPriceFeedAddress
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator")
    ethUsdPriceFeedAddress = ethUsdAggregator.address
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
  }
  const ethUsdPriceFeedAddress = networkConfig[chainId][ethUsdPriceFeed]

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [
      /* address? */
    ],
    log: true,
  })
}
