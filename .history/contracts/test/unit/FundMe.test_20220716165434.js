const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FUndMe", async function () {
  let fundMe
  let deployer
  let MockV3Aggregator
  beforeEach(async function () {
    //deploy our fundMe contract
    //using Hardhat-deploy
    // const accounts = await ethers.getSigners()
    // const accountZero = accounts[0]
    deployer = (await getNamedAccounts()).deployer
    await deployments.fixture(["all"])
    fundMe = await ethers.getContract("FundMe", deployer)
  })
  describe("constructor", async function () {
    it("sets the aggregator addresses correctly", async function () {
      const response = await fundMe.priceFeed()
    })
  })
})
