const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")

describe("FundMe", async function () {
  let fundMe
  let deployer
  let mockV3Aggregator
  const sendValue = ethers.utils.parseEther("1") //1 ETH
  beforeEach(async function () {
    //deploy our fundMe contract
    //using hard-hat deploy
    //const accounts = await ethers.getSigners()
    //const accountZero = account[0]
    deployer = (await getNamedAccounts()).deployer
    await deployments.fixture(["all"])
    fundMe = await ethers.getContract("FundMe", deployer)
    mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
  })
  describe("constructor", async function () {
    it("sets the aggregator addresses correctly", async function () {
      const response = await fundMe.s_priceFeed()
      assert.equal(response, mockV3Aggregator.address)
    })
  })
  describe("fund", function () {
    it("Fails if you don't send enough ETH", async function () {
      expect(fundMe.fund()).to.be.revertedWith("You need to spend more Eth!")
    })
    it("updates the amount funded data structure", async function () {
      await fundMe.fund({ value: sendValue })
      const response = await fundMe.s_addressToAmountFunded(deployer)
      assert.equal(response.toString(), sendValue.toString())
    })
    it("Adds funder to array of s_funders", async function () {
      await fundMe.fund({ value: sendValue })
      const response = await fundMe.s_funders(0)
      assert.equal(response, deployer)
    })
  })
  describe("withdraw", async function () {
    beforeEach(async function () {
      await fundMe.fund({ value: sendValue })
    })
    it("withdraw ETH from a single founder", async function () {
      //arrange
      const startingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      )
      const startingDeployerBalance = await fundMe.provider.getBalance(deployer)

      //Act
      const transactionResponse = await fundMe.cheaperWithdraw()
      const transactionReceipt = await transactionResponse.wait(1)
      const { gasUsed, effectiveGasPrice } = transactionReceipt
      const gasCost = gasUsed.mul(effectiveGasPrice)
      const endingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      )
      const endingDeployerBalance = await fundMe.provider.getBalance(deployer)
      //Assert
      assert.equal(endingFundMeBalance, 0)
      assert.equal(
        startingFundMeBalance.add(startingDeployerBalance),
        endingDeployerBalance.add(gasCost).toString()
      )
    })
    it("allows us to withdraw with multiple s_funders", async function () {
      const accounts = await ethers.getSigners()
      for (let i = 1; i < 6; i++) {
        const fundMeConnectedContract = await fundMe.connect(accounts[i])
        await fundMeConnectedContract.fund({ value: sendValue })
      }
      const startingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      )
      const startingDeployerBalance = await fundMe.provider.getBalance(deployer)
      //Act
      const transactionResponse = await fundMe.withdraw()
      const transactionReceipt = await transactionResponse.wait(1)
      const { gasUsed, effectiveGasPrice } = transactionReceipt
      const gasCost = gasUsed.mul(effectiveGasPrice)
      //Assert
      const endingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      )
      const endingDeployerBalance = await fundMe.provider.getBalance(deployer)
      //Assert
      assert.equal(endingFundMeBalance, 0)
      assert.equal(
        startingFundMeBalance.add(startingDeployerBalance),
        endingDeployerBalance.add(gasCost).toString()
      )
      // Make sure that the s_funders are reset properly
      await expect(fundMe.s_funders(0)).to.be.reverted
      for (i = 1; i < 6; i++) {
        assert.equal(
          await fundMe.s_addressToAmountFunded(accounts[i].address),
          0
        )
      }
    })
    it("Only allows the owner to withdraw", async function () {
      const accounts = await ethers.getSigners()
      const attacker = accounts[1]
      const attackerConnectedContract = await fundMe.connect(attacker)
      expect(attackerConnectedContract.withdraw()).to.be.revertedWith(
        "FundMe__NotOwner"
      )
    })
    it("cheaperWithdraw testing....", async function () {
      const accounts = await ethers.getSigners()
      for (let i = 1; i < 6; i++) {
        const fundMeConnectedContract = await fundMe.connect(accounts[i])
        await fundMeConnectedContract.fund({ value: sendValue })
      }
      const startingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      )
      const startingDeployerBalance = await fundMe.provider.getBalance(deployer)
      //Act
      const transactionResponse = await fundMe.cheaperWithdraW()
      const transactionReceipt = await transactionResponse.wait(1)
      const { gasUsed, effectiveGasPrice } = transactionReceipt
      const gasCost = gasUsed.mul(effectiveGasPrice)
      //Assert
      const endingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      )
      const endingDeployerBalance = await fundMe.provider.getBalance(deployer)
      //Assert
      assert.equal(endingFundMeBalance, 0)
      assert.equal(
        startingFundMeBalance.add(startingDeployerBalance),
        endingDeployerBalance.add(gasCost).toString()
      )
      // Make sure that the s_funders are reset properly
      await expect(fundMe.s_funders(0)).to.be.reverted
      for (i = 1; i < 6; i++) {
        assert.equal(
          await fundMe.s_addressToAmountFunded(accounts[i].address),
          0
        )
      }
    })
  })
})