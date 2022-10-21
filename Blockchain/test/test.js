const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ropstam Token", () => {
  let RopstamToken, ropstamToken;
  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();

    RopstamToken = await ethers.getContractFactory("RopstamToken");
    ropstamToken = await RopstamToken.deploy();
  });

  describe("1. TransferTokens", () => {
    it("1.1. Transfer Tokens and Checking Deflationary System", async () => {
      let contractBalance;
      let user1Balance;
      let totalSupply;

      contractBalance = await ropstamToken.balanceOf(ropstamToken.address);
      totalSupply = await ropstamToken.totalSupply();

      expect(totalSupply).to.equal(ethers.utils.parseEther("10000"));
      expect(contractBalance).to.equal(ethers.utils.parseEther("10000"));

      const cost = 100;

      await ropstamToken
        .connect(user1)
        .buyTokens(ethers.utils.parseEther("100"), {
          value: String(100 * cost),
        });

      contractBalance = await ropstamToken.balanceOf(ropstamToken.address);
      totalSupply = await ropstamToken.totalSupply();
      user1Balance = await ropstamToken.balanceOf(user1.address);

      // Tax will be deducted from totalSupply
      expect(totalSupply).to.equal(
        ethers.utils.parseEther(String(10000 - 100 * 0.5))
      );

      expect(contractBalance).to.equal(ethers.utils.parseEther("9900"));
      expect(user1Balance).to.equal(ethers.utils.parseEther("50"));
    });
  });
});
