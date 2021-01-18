const Web3 = require("web3");
const truffleContract = require("truffle-contract");
const $ = require("jquery");
// Not to forget our built contract
const splitterContract = require("../../build/contracts/Splitter.json");

// Supports Metamask, and other wallets that provide / inject 'web3'.
if (typeof web3 !== 'undefined') {
    // Use the Mist/wallet/Metamask provider.
    window.web3 = new Web3(web3.currentProvider);
} else {
    // Your preferred fallback.
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

const SplitterInstance = truffleContract(splitterContract);
SplitterInstance.setProvider(web3.currentProvider);

window.addEventListener('load', async function() {
    const accounts = await web3.eth.getAccounts();
    alert(accounts[0]);
    /*
    return web3.eth.getAccounts()
        .then(accounts => {
            if (accounts.length == 0) {
                $("#balance").html("N/A");
                throw new Error("No account with which to transact");
            }
            window.account = accounts[0];
            console.log("Account:", window.account);
            return web3.eth.net.getId();
        })
        .then(network => {
            console.log("Network:", network.toString(10));
            return MetaCoin.deployed();
        })
        .then(deployed => deployed.getBalance.call(window.account))
        // Notice how the conversion to a string is done only when displaying.
        .then(balance => $("#balance").html(balance.toString(10)))
        // Never let an error go unlogged.
        .catch(console.error);
        */
});
/*
web3.eth.getBalance(faucetAddress, function(err, balance) {
    if (err) {
        console.error(err);
    } else {
        console.log("Contract balance: " + balance);
    }
});

SplitterInstance.getBalance.call(function(err, balance) {
    if (err) {
        console.error(err);
    } else {
        console.log("Faucet balance: " + balance);
    }
});

function addFund(amount) {
    web3.eth.getCoinbase(function(err, coinbase) {
        if (err) {
            console.error(err);
        } else {
                const amount = web3.toBN(amount); 
                SplitterInstance.addFund(
                    { 
                        from: coinbase,
                        to: faucetAddress,
                        value: amount
                    },
                    function(err, txn) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("addFund txn: " + txn);
                        }
                    });
            }
    });
}

function split(targetAccount1, targetAccount2) {
    web3.eth.getCoinbase(function(err, coinbase) {
        if (err) {
            console.error(err);
        } else {
            web3.eth.getAccounts(function(err, accounts) {
                if (err) {
                    console.error(err);
                } else { 
                    SplitterInstance.split(
                        targetAccount1,
                        targetAccount2,
                        { 
                            from: coinbase,
                            to: faucetAddress,
                        },
                        function(err, txn) {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log("split txn: " + txn);
                            }
                        });
                }
            });
        }
    });
}

function withdrawRefund() {
    web3.eth.getCoinbase(function(err, coinbase) {
        if (err) {
            console.error(err);
        } else {
            SplitterInstance.withdrawRefund(
                { 
                    from: coinbase,
                    to: faucetAddress,
                },
                function(err, txn) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("withdrawRefund txn: " + txn);
                    }
                });
        }
    });
    
}*/
