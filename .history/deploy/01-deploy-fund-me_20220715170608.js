// async function deployFunc(hre) {
//   console.log("Hi...")
// }
// module.exports.default = deployFunc

// module.exports = async (hre) => {
//   const { getNamedAccounts, deployments } = hre
// }

const { networkConfig } = require("hel")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainID = network.config.chainID
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [
      /* address? */
    ],
    log: true,
  })
}
