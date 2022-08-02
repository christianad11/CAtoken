// Chai lib for assertion and promise-based tests
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

// chai assert
const { assert } = chai;

// chai promises
chai.use(chaiAsPromised);

// token to wei
function toWei(token) {
    return token * 10 ** 18; //number of tokens * 10 ** decimals
}

// load contract artifact
const CAtoken = artifacts.require('CAtoken');

// Token contract test spec
contract('CAtoken', ([admin, minter, holder, nonholder, smallholder]) => {
    
    // Check name and symbol
    it('Name is CAtoken and symbol is CAt', async () => {

        const instance = await CAtoken.deployed();

        let name = await instance.name();
        let symbol = await instance.symbol();
    
        assert.equal(name, 'CAtoken');
        assert.equal(symbol, 'CAt');

    })

    // Check Initial supply, should be 1000
    it('Has inital supply of 1000', async () => {

        const instance = await CAtoken.deployed();

        let totalSupply = await instance.totalSupply();

        assert.equal(totalSupply.toString(), toWei(1000));
            
    })

    // Check decimals is accessible
    it('Decimals set to 18', async () => {

        const instance = await CAtoken.deployed();

        let decimals = await instance.decimals();

        assert.equal(decimals.toString(), 18)

    })

    // CAtoken has to be mintable only when the minting address has role permission

    // ADMIN role should be able to assign MINTER address
    it('ADMIN can assign MINTER role', async () => {

        const instance = await CAtoken.deployed();

        await instance.grantMinter(minter, { from: admin });
        isMinter = await instance.isMinter(minter);

        assert.ok(isMinter);

    })

    // ADMIN role should be able to MINT 
    it('ADMIN should be able to mint', async () => {

        const instance = await CAtoken.deployed();

        await instance.mint(holder, toWei('50').toString(), { from: admin });
        let supply = await instance.totalSupply();

        assert.equal(supply, toWei('1050'));

    })

    // NO ROLE should not be able to MINT 
    it('NO ROLE should not be able to mint', async () => {

        const instance = await CAtoken.deployed();

        errMsg = 'Account with no role was able to mint';
        await instance.mint(holder, toWei('50'), { from: nonholder })
            .then(() => assert.fail(errMsg))
            .catch((error) => error.message === errMsg ? assert.fail(errMsg) : assert.isNotNull(error))

    })

    // MINTER role should be able to mint new tokens
    it('MINTER should be able to mint', async () => {

        const instance = await CAtoken.deployed();

        await instance.mint(holder, toWei('50').toString(), { from: minter });
        let supply = await instance.totalSupply();

        assert.equal(supply.toString(), toWei('1100'));

    })

    // CAtoken has to be transferable between accounts

    // NON-HOLDER should not be able to transfer any tokens
    it('NON-HOLDER can`t transfer tokens', async () => {

        errMsg = 'Account with no tokens was able to transfer tokens';

        const instance = await CAtoken.deployed(); 

        await instance.transfer(holder, toWei(50), { from: nonholder })
            .then(() => assert.fail(errMsg))
            .catch((error) => error.message === errMsg ? assert.fail(errMsg) : assert.isNotNull(error));

    })

    // HOLDER should successfully transfer their tokens
    it('HOLDER should successfully transfer their tokens', async () => {

        const instance = await CAtoken.deployed();

        await instance.transfer(smallholder, toWei(10).toString(), { from: holder });
        let balance = await instance.balanceOf(smallholder);

        assert.equal(balance, toWei(10));

    })

    // holder should not be able to transfer more tokens than they have
    it('HOLDER should`t transfer more than they have', async () => {

        const instance = await CAtoken.deployed();

        errMsg = 'Account with no tokens was able to transfer tokens';
        await instance.transfer(nonholder, toWei('200'), { from: smallholder })
            .then(() => assert.fail(errMsg))
            .catch((error) => error.message === errMsg ? assert.fail(errMsg) : assert.isNotNull(error));

    })

})