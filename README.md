# Simple Ethereum Dapp

Supports the [Status EIP-1102 Tutorial](http://www.status.im/developer_tools/run_on_status/tutorial_2_must_do.html).

Showcases how to access an injected Ethereum provider, in this case the EIP-1102-compliant `window.ethereum`, alongside the legacy `window.web3`.

The GUI displays (tested on hanache-cli):

* Three textbox (sender, beneficiary1, beneficiary2) and a button Split
* A textbox (address) and 2 buttons: Withdraw and Show Web3 Balance
* Some useful data that shows the balances of the actors
* The balance on Web3 of a specific address

After cloning it, to run this program, you need to:

```sh
$ npm install
$ npm run dev
```

In another terminal run:

ganache-cli --host 0.0.0.0

Then open [http://127.0.0.1:8080](http://127.0.0.1:8080) in your preferred browser.
