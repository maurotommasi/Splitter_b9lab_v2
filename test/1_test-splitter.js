const Splitter = artifacts.require("./Splitter.sol");

contract("Splitter", accounts => {

    console.log(accounts);
    
    const SHOWLOG = true;
    const AMOUNT = web3.utils.toBN(web3.utils.toWei('1', 'ether'));
    let owner, sender, beneficiary1, beneficiary2;

    let splitter;

    before("Should Set Accounts", async () => {
        assert.isAtLeast(accounts.length, 4, 'There should be at least 4 accounts to do this test');
        [owner, sender, beneficiary1, beneficiary2] = accounts
        if(SHOWLOG) {
            console.log("----------------------------------------");
            console.log("sender Address: " + sender);
            console.log("Beneficiary1 Address: " + beneficiary1);
            console.log("Beneficiary2 Address: " + beneficiary2);
            console.log("Amount to be splitted: " + AMOUNT);
        }
    });

    beforeEach("New Istance of Splitter Test", async () => {
        splitter = await Splitter.new({from : owner});
    });

    function matchError(solidityExpectedError, e, showData = false){
        const r = " -- Reason given: ";
        const javascriptError = e.toString().substring(e.toString().indexOf(r) + r.length, e.toString().length - 1);
        assert.strictEqual(solidityExpectedError, javascriptError, "Predicted errors dismatch!");
        if(showData){
            console.log("Solidity Error: " + solidityExpectedError);
            console.log("Truffle Javascript Error: " + javascriptError);
        }
        return true;
    }

    describe("#SingleUnitTest", function() {

        it("#001 - Sender can't be a beneficiaries", async function() {
            try {
                assert(await splitter.split(sender, beneficiary1, {from : sender, value : AMOUNT}));
            } catch(e) {
                assert(matchError("Splitter.split#001 : Sender can't be a beneficiary", e));
            }
        });
        
        it("#002 - Beneficiaries can't have the same address", async function() {
            try {
                assert(await splitter.split(beneficiary1, beneficiary1, {from : sender, value : AMOUNT}));
            } catch(e) {
                assert(matchError("Splitter.split#002 : Beneficiaries can't have the same value", e));
            }
        });

        it("#003 - Value can't be 0", async function() {
            try {
                assert(await splitter.split(beneficiary1, beneficiary2, {from : sender, value : 0}));
            } catch(e) {
                assert(matchError("Splitter.split#003 : Value can't be 0", e));
            }
        });

        it("#004 - Amount to refund can't be 0", async function() {

            const beneficiary1_balance = await splitter.balances.call(beneficiary1);

            assert.strictEqual(beneficiary1_balance.toString(10), web3.utils.toBN(0).toString(10));

            try {
                assert(await splitter.withdrawRefund({from : beneficiary1}));
            } catch(e) {
                assert(matchError("Splitter.withdrawRefund#001 : Balance can't be equal to 0", e));
            }

        });

        it("#005 - Split", async function() {

            assert(beneficiary1 != beneficiary2);
            assert(AMOUNT.toString(10) != web3.utils.toBN(0).toString(10));
            assert(sender != beneficiary1 && sender != beneficiary2);

            const txObj = await splitter.split(beneficiary1, beneficiary2, {from : sender, value : AMOUNT});

            assert.strictEqual(txObj.logs[0].args.sender.toString(10), sender.toString(10), "Sender Dismach");
            assert.strictEqual(web3.utils.toBN(txObj.logs[0].args.amount).toString(10), AMOUNT.toString(10), "Amount Dismach");
            assert.strictEqual(txObj.logs[0].args.first.toString(10), beneficiary1.toString(10), "Beneficiary1 Dismach");
            assert.strictEqual(txObj.logs[0].args.second.toString(10), beneficiary2.toString(10), "Beneficiary2 Dismach");

        });


        
        it("#006 - Withdraw Balance", async function() {
            
            // Should split some amount before to be able to withdraw something
            
            await splitter.split(beneficiary1, beneficiary2, {from : sender, value : AMOUNT});
            const Web3_beneficiary1_balance_before = await web3.eth.getBalance(beneficiary1);
            
            const txObj = await splitter.withdrawRefund({from : beneficiary1});

            txReceipt = await web3.eth.getTransactionReceipt(txObj.receipt.transactionHash);
            //console.log(txObj);
            const gasPrice = await web3.eth.getGasPrice();
            const gasCost = gasPrice * txReceipt.gasUsed;

            const Web3_beneficiary1_balance_after = await web3.eth.getBalance(beneficiary1);

            assert.strictEqual(txObj.logs[0].args.who.toString(10), beneficiary1.toString(10), "Withdrawer Dismach");

            const withdrawedAmount = txObj.logs[0].args.amount;

            assert(Web3_beneficiary1_balance_after - Web3_beneficiary1_balance_before + gasCost == withdrawedAmount, "Wei dismatch");
            
            if(SHOWLOG){
                console.log("Beneficiary 1 Web3 Balance Before: ", Web3_beneficiary1_balance_before);
                console.log("Beneficiary 1 Web3 Balance After: ", Web3_beneficiary1_balance_after);
                console.log("Withdraw cost: ", gasCost);
            }
            
        });

    });
   
});
  