const { deployments } = require("hardhat")

describe("FUndMe", async function () {
  let fundMe
  beforeEach(async function () {
    //deploy our fundMe contract
    //using Hardhat-deploy
    await deployments.fixture(["all"])
  })
  describe("constructor", async function () {})
})
