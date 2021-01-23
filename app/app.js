import SplitterContract from "./../build/contracts/Splitter.json";

const Web3 = require("web3");
const $ = require("jquery");

let accounts;
let SplitterAppData;
let Splitter;
let account;

async function init() {
    try {
        if (typeof ethereum !== 'undefined') {
            // Supports EIP-1102 injected Ethereum providers.
            window.web3 = new Web3(ethereum);
        } else if (typeof web3 !== 'undefined') {
            // Supports legacy injected Ethereum providers.
            window.web3 = new Web3(web3.currentProvider);
        } else {
            // Your preferred fallback.
            window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); 
        }

        const networkID = await web3.eth.net.getId();
        const contractNetwork = SplitterContract.networks[networkID];
        Splitter = new web3.eth.Contract(SplitterContract.abi, contractNetwork && contractNetwork.address);
        const contractReceipt = await web3.eth.getTransactionReceipt(contractNetwork.transactionHash);

        const owner = await getOwner();
        const isRunning = await getIsRunning();
        var balances = {};
        accounts = await web3.eth.getAccounts();
        account = accounts[0];
        SplitterAppData = ({
                            appName:                "Splitter App",
                            networkID:              networkID,
                            transactionReceiptHash: contractNetwork.transactionHash,
                            contractAddress:        contractReceipt.contractAddress,
                            contractDeployer:       contractReceipt.from,
                            owner:                  owner,
                            isRunning:              isRunning,
                            balances:               balances
                   });

        // Fill with data

        $("#appName").html(SplitterAppData.appName);
        document.getElementById("address").value = account;

        loadFunctions();

        //console.log(SplitterAppData.appName);
        //console.log(accounts[0]);
    } catch(e) {
        console.error(e);
    }
    
};

async function getOwner(){
    try {
        const splitterOwner = await Splitter.methods.getOwner().call({from: account});
        return splitterOwner;
    } catch(e) {
        console.error(e);
    }
}

async function getIsRunning(){
    try {
        const splitterState = await Splitter.methods.isRunning().call({from: account});
        return splitterState;
    } catch(e) {
        console.error(e);
    }   
}

async function switchContractState(){
    try {
        await Splitter.methods.runSwitch()
        .send({
            from: account
        })
        .on('transactionHash', (hash) => {
            console.log("TransactionHash: ", hash)
        })
        .on("error", (error, receipt) => {
            console.log("Receipt: ", receipt)
            console.log("Error: ", error)
        });
    } catch(e) {
        console.error(e);
    }
}

async function getBalance(_address){
    try {
        if(web3.utils.isAddress(_address)){
            const addressBalance = await Splitter.methods.balances(_address).call();
            SplitterAppData.balances[_address] = addressBalance;
            console.log("Address Balance: ", addressBalance);
            return addressBalance;
        } else {
            console.log("Address not valid");
        }
    } catch (e) {
        console.error(e);
    }
}

async function split(_beneficiary1, _beneficiary2, _amount){
    try {
        console.log(account);
        if(web3.utils.isAddress(_beneficiary1) && web3.utils.isAddress(_beneficiary2)){
            await Splitter.methods.split(_beneficiary1, _beneficiary2)
            .send({
                from: account,
                value: _amount.toString(10)
            })
            .on('transactionHash', (hash) => {
                console.log("TransactionHash: ", hash);
            })
            .on('receipt', (receipt) => {
                console.log("Receipt: ", receipt);
            })
            .on("error", (error, receipt) => {
                console.log("Receipt: ", receipt);
                console.log("Error: ", error);
            });
        } else if(!web3.utils.isAddress(_beneficiary1)){
            console.log("Beneficiary 1 is not an address");
        } else {
            console.log("Beneficiary 2 is not an address");
        }
    } catch(e) {
        console.error(e);
    }
}

async function withdraw(){
    try{
        await Splitter.methods.withdrawRefund()
        .send({
            from: account
        })
        .on('transactionHash', (hash) => {
            console.log("TransactionHash: ", hash);
        })
        .on('receipt', (receipt) => {
            console.log("Receipt: ", receipt);
        })
        .on("error", (error, receipt) => {
            console.log("Receipt: ", receipt);
            console.log("Error: ", error);
        });
    } catch(e) {
        console.error(e);
    }
}

// -------------------------------------------------------------------------------------------- FUNCTION LOADER

function loadFunctions(){
    runSplit();
    runWithdraw();
    showWeb3Balance();
}

function runSplit(){
    $(document).ready(function(){
        $('#btnSplit').click(async function(){
            console.log("splitClickEvent");
            account = document.getElementById("address").value;
            const beneficiary1 = document.getElementById("beneficiary1").value;
            console.log(beneficiary1);
            const beneficiary2 = document.getElementById("beneficiary2").value;
            const value = document.getElementById("value").value;
            split(beneficiary1, beneficiary2, value);
            const addressSender= document.getElementById("address").value;
            const addressBeneficiary1 = document.getElementById("beneficiary1").value;
            const addressBeneficiary2 = document.getElementById("beneficiary2").value;
            const balanceSender = await getBalance(addressSender);
            const balanceBeneficiary1 = await getBalance(addressBeneficiary1);
            const balanceBeneficiary2 = await getBalance(addressBeneficiary2);
            document.getElementById("addressBalance").innerHTML = "Sender balance on contract: " + balanceSender;
            document.getElementById("beneficiary1Balance").innerHTML = "Beneficiary 2 balance on contract: " + balanceBeneficiary1;
            document.getElementById("beneficiary2Balance").innerHTML = "Beneficiary 2 balance on contract: " + balanceBeneficiary2;
        })
    })
}

function runWithdraw(){
    $(document).ready(function(){
        $('#btnWithdraw').click(async function(){
            account = document.getElementById("addressToWithdraw").value;
            await withdraw();
        })
    })
}

function showWeb3Balance(){
    $(document).ready(function(){
        $('#btnShowBalance').click(async function(){
            const balance = await web3.eth.getBalance(document.getElementById("addressToWithdraw").value);
            console.log(balance);
            document.getElementById("addressWeb3Balance").innerHTML = balance;
        })
    })
}

window.addEventListener('load', async function() {
    init();
});
