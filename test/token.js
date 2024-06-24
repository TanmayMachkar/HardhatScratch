let expect;
before(async () => {
    expect = (await import('chai')).expect;
});

describe('Token Contract', () => {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async() => {
    Token = await ethers.getContractFactory('Token'); //create instance of contract
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners(); //access to info such as balance, addresses of accounts,etc
    hardhatToken = await Token.deploy(); //deploy contract
  })

  describe('Deployment', () => {
    it('Should set the right owner', async() => {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    })

    it('Should assign the total supply of tokens to the owner', async() => {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect((await hardhatToken.totalSupply()).toNumber()).to.equal(ownerBalance.toNumber()); //check if totalSupply(which is 10000 in smart contract) === ownerBalance
    })
  });

  describe('Transactions', () => {
    it('Should transfer tokens between accounts', async() => {
      //transfer 5 tokens from owner to addr1
      await hardhatToken.transfer(addr1.address, 5);
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance.toNumber()).to.equal(5);

      //transfer 5 tokens from addr1 to addr2
      await hardhatToken.connect(addr1).transfer(addr2.address, 5);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance.toNumber()).to.equal(5);
    })

    it('Should fail if sender does not have enough tokens', async() => {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address); //10000
      await expect(hardhatToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("Insufficient tokens"); //if expect condition false then revert with given msg
      //NOTE: revertWith msg should be same as smart contract require msg(check line 19 of smart contract)
      expect((await hardhatToken.balanceOf(owner.address)).toNumber()).to.equal(initialOwnerBalance.toNumber()); //check if owner balance changed or not
    })

    it('Should update balances after transfers', async() => {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      //transfer 5 tokens from owner to addr1
      await hardhatToken.transfer(addr1.address, 5);
      //transfer 10 tokens from owner to addr2
      await hardhatToken.transfer(addr2.address, 10);

      const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
      expect(finalOwnerBalance.toNumber()).to.equal(initialOwnerBalance.toNumber() - 15);
    
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance.toNumber()).to.equal(5);

      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance.toNumber()).to.equal(10);
    })
  });
});