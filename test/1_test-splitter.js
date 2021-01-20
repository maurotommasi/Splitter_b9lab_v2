const Splitter = artifacts.require("./Splitter.sol");
const truffleAssert = require("truffle-assertions");

contract("Splitter", accounts => {

    const { toBN, toWei } = web3.utils;
    const RUNNING = true;
    const MAXGAS = 20000000;
    const EVEN_AMOUNT = toBN(toWei('1', 'gwei'));
    const ODD_AMOUNT = toBN(toWei('1', 'gwei') + 1);
    let owner, sender, beneficiary1, beneficiary2;

    let splitter;

    before("Should Set Accounts", async () => {
        assert.isAtLeast(accounts.length, 4, 'There should be at least 4 accounts to do this test');
        [owner, sender, beneficiary1, beneficiary2] = accounts
    });

    beforeEach("New Istance of Splitter Test", async () => {
        splitter = await Splitter.new(RUNNING, MAXGAS, {from : owner});
    });

    describe("Data", function() {
        it("Beneficiaries can't have the same address", () => {
            assert.notStrictEqual(beneficiary1, beneficiary2, "Beneficiaries can't have the same address");
            assert.notStrictEqual(sender, beneficiary1, "sender can't have the same address of Beneficiary 1");
            assert.notStrictEqual(sender, beneficiary2, "sender can't have the same address of Beneficiary 2");
        })

        it("Balances of actors have to be 0 wei", async function () {
            assert.strictEqual((await splitter.balances.call(sender)).toString(10), "0");
            assert.strictEqual((await splitter.balances.call(beneficiary1)).toString(10), "0"); 
            assert.strictEqual((await splitter.balances.call(beneficiary2)).toString(10), "0"); 
        })
    })
    describe("#SingleUnitTest", function() {
        it("#001 - Sender can't be a beneficiaries", async function() {
            try {
                assert(await splitter.split(sender, beneficiary1, {from : sender, value : EVEN_AMOUNT}));
            } catch(e) {
                assert.strictEqual("Splitter.split#001 : Sender can't be a beneficiary", e.reason);
            }
        });
        
        it("#002 - Beneficiaries can't have the same address", async function() {
            try {
                assert(await splitter.split(beneficiary1, beneficiary1, {from : sender, value : EVEN_AMOUNT}));
            } catch(e) {
                assert.strictEqual("Splitter.split#002 : Beneficiaries can't have the same value", e.reason);
            }
        });

        it("#003 - Value can't be 0", async function() {
            try {
                assert(await splitter.split(beneficiary1, beneficiary2, {from : sender, value : 0}));
            } catch(e) {
                assert.strictEqual("Splitter.split#003 : Value can't be 0", e.reason);
            }
        });

        it("#004 - Amount to refund can't be 0", async function() {
            const beneficiary1Balance = await splitter.balances.call(beneficiary1);
            assert.strictEqual(beneficiary1Balance.toString(10),  "0");
            try {
                assert(await splitter.withdrawRefund({from : beneficiary1}));
            } catch(e) {
                assert.strictEqual("Splitter.withdrawRefund#001 : Balance can't be equal to 0", e.reason);
            }
        });

        it("#005 - Split Pair Value", async function() {
            assert.notStrictEqual(EVEN_AMOUNT.toString(10), "0");

            const txObj = await splitter.split(beneficiary1, beneficiary2, {from : sender, value : EVEN_AMOUNT});

            assert.strictEqual(txObj.logs[0].args.sender, sender, "Sender Dismach");
            assert.strictEqual(toBN(txObj.logs[0].args.amount).toString(10), EVEN_AMOUNT.toString(10), "Amount Dismach");
            assert.strictEqual(txObj.logs[0].args.first, beneficiary1, "Beneficiary1 Dismach");
            assert.strictEqual(txObj.logs[0].args.second, beneficiary2.toString(10), "Beneficiary2 Dismach");

            assert.strictEqual((await splitter.balances.call(sender)).toString(10),  "0")
            assert.strictEqual((await splitter.balances.call(beneficiary1)).toString(10), toBN(EVEN_AMOUNT / 2).toString(10));
            assert.strictEqual((await splitter.balances.call(beneficiary2)).toString(10), toBN(EVEN_AMOUNT / 2).toString(10));

        });

        it("#005 - Split Odd Value", async function() {

            const unplittableValue = toBN(1);
            const splittableValue = ODD_AMOUNT.sub(unplittableValue);
            const txObj = await splitter.split(beneficiary1, beneficiary2, {from : sender, value : ODD_AMOUNT});

            assert.strictEqual(txObj.logs[0].args.sender, sender, "Sender Dismach");
            assert.strictEqual(txObj.logs[0].args.amount.toString(10), ODD_AMOUNT.toString(10), "Amount Dismach");
            assert.strictEqual(txObj.logs[0].args.first, beneficiary1, "Beneficiary1 Dismach");
            assert.strictEqual(txObj.logs[0].args.second, beneficiary2.toString(10), "Beneficiary2 Dismach");

            assert.strictEqual((await splitter.balances.call(sender)).toString(10), "1");
            assert.strictEqual((await splitter.balances.call(beneficiary1)).toString(10), (splittableValue/ 2).toString(10));
            assert.strictEqual((await splitter.balances.call(beneficiary2)).toString(10), (splittableValue/ 2).toString(10));

        });


        it("#006 - Withdraw Balance", async function() {
            
            // Should split some amount before to be able to withdraw something
            
            await splitter.split(beneficiary1, beneficiary2, {from : sender, value :EVEN_AMOUNT});
            const web3Beneficiary1BalanceBefore = await web3.eth.getBalance(beneficiary1);
            
            const txObj = await splitter.withdrawRefund({from : beneficiary1});

            const tx = await web3.eth.getTransaction(txObj.tx);
            const txReceipt = txObj.receipt;
            const gasPrice = tx.gasPrice;
            const gasUsed = txReceipt.gasUsed;
            const gasCost = toBN(gasPrice).mul(toBN(gasUsed));

            const web3Beneficiary1BalanceAfter = await web3.eth.getBalance(beneficiary1);

            assert.strictEqual(txObj.logs[0].args.who.toString(10), beneficiary1, "Withdrawer Dismach");

            const withdrawedAmount = toBN(txObj.logs[0].args.amount);
            assert.strictEqual(toBN(web3Beneficiary1BalanceAfter).sub(toBN(web3Beneficiary1BalanceBefore)).toString(10), toBN((withdrawedAmount)).sub(toBN(gasCost)).toString(10), "Wei dismatch");

        });

    });
   
});
  