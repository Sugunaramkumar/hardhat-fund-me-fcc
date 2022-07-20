const { deployments, ethers, getNamedAccounts } = require("hardhat")
describe("FundMe", async function () {
  let fundMe
  beforeEach(async function () {
    //deploy our fundMe contract
    //using hard-hat deploy
    //const accounts = await ethers.getSigners()
    //const accountZero = account[0]
    const deployer = await getNamedAccounts()
    await deployments.fixture(["all"])
    fundMe = await ethers.getContract("FundMe", deployer)
  })
  describe("constructor", async function () {})
})
