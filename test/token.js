let expect;
before(async () => {
    expect = (await import('chai')).expect;
});

describe('Token Contract', () => {
  it('Deployment should assign the total supply of tokens to the owner', async () => {
    const [owner] = await ethers.getSigners(); //access info such as balances, addresses of accounts

    console.log('Signers object: ', owner);
    const Token = await ethers.getContractFactory('Token'); //instance of contract

    const hardhatToken = await Token.deploy(); //deploying contract

    const ownerBalance = await hardhatToken.balanceOf(owner.address); //calling function of smart contract
    console.log('Owner address: ', owner.address);

    const totalSupply = await hardhatToken.totalSupply();
    expect(totalSupply.toNumber()).to.equal(ownerBalance.toNumber()); //expecting totalSupply (which is 10000) == ownerBalance
  });
});