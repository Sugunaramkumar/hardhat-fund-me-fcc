const { network } = require("hardhat")
const {
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
} = require("../helper-hardhat-config")

const DECIMALS = 8

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainID = network.config.chainID
}
if (developmentChains.includes(chainID)) {
  log("Local network detected! Deploying mocks...")
  await deploy("MockV3Aggregator", {
    contract: "MockV3Aggregator",
    from: deployer,
    log: true,
    args: [DECIMALS, INITIAL_ANSWER],
  })
  log("Mocks deployed")
  log("--------------------------------------------------")
}
module.exports.tags = ["all", "mocks"]
