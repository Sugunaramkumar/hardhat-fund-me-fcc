const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FUndMe", async function () {
  let fundMe
  beforeEach(async function () {
    //deploy our fundMe contract
    //using Hardhat-deploy
    const accounts = await ethers.getSigners()
    const { deployer } = await getNamedAccounts()
    await deployments.fixture(["all"])
    fundMe = await ethers.getContract("FundMe", deployer)
  })
  describe("constructor", async function () {})
})
