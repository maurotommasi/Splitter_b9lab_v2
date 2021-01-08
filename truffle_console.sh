vagrant@ubuntu-focal:~/DAPPS/project1_b9lab/dapps/tmp-32507lSn1irRp5KaP/box$ truffle console
truffle(development)> web3.eth.getAccounts().then(accounts => account0 = accounts[0])
'0xf7b3Edd556443A01935a1d433E4a0af9bE76B6a8'
truffle(development)> web3.eth.getAccounts().then(accounts => account1 = accounts[1])
'0x249C93E004587a6096c2Fb9eD0E72eb7a12e979c'
truffle(development)> web3.eth.getAccounts().then(accounts => account2 = accounts[2])
'0xC318e5dFA496FcdC43fA16FAAef7A6d1ec91a1D6'
truffle(development)> web3.eth.getBalance(account0)
'99981140080000000000'
truffle(development)> web3.eth.getBalance(account1)
'100000000000000000000'
truffle(development)> web3.eth.getBalance(account2)
'100000000000000000000'
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account0))
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account1))
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account2))
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(development)> Splitter.deployed().then(istance => istance.addFund({from : account0}))
{
  tx: '0xb983e66546e90055a9dedcc8b074e02c4c4901d7ad45a96252cc376e68b9cc4e',
  receipt: {
    transactionHash: '0xb983e66546e90055a9dedcc8b074e02c4c4901d7ad45a96252cc376e68b9cc4e',
    transactionIndex: 0,
    blockHash: '0x63c63ed0d772eff70b4ee568ef3223fec01354d3abf4ba59a271e69cef3710bc',
    blockNumber: 4,
    from: '0xf7b3edd556443a01935a1d433e4a0af9be76b6a8',
    to: '0x7a85cb0b4df3ea9e1b90ecd98900d4e35cf1997d',
    gasUsed: 23892,
    cumulativeGasUsed: 23892,
    contractAddress: null,
    logs: [],
    status: true,
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    rawLogs: []
  },
  logs: []
}
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account0))
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(development)> Splitter.deployed().then(istance => istance.addFund({from : account0, value : 10000000000000000000}))
{
  tx: '0x2954b14d12b3bed1effba3767dbe28f048bafc1b0152123787240414b4c7660b',
  receipt: {
    transactionHash: '0x2954b14d12b3bed1effba3767dbe28f048bafc1b0152123787240414b4c7660b',
    transactionIndex: 0,
    blockHash: '0x285340ccd59192a48dafcdcc9c602a1787ed479594174e89955ff06eb6a60c55',
    blockNumber: 5,
    from: '0xf7b3edd556443a01935a1d433e4a0af9be76b6a8',
    to: '0x7a85cb0b4df3ea9e1b90ecd98900d4e35cf1997d',
    gasUsed: 43092,
    cumulativeGasUsed: 43092,
    contractAddress: null,
    logs: [],
    status: true,
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    rawLogs: []
  },
  logs: []
}
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account0))
BN {
  negative: 0,
  words: [ 31981568, 29933858, 2220, <1 empty item> ],
  length: 3,
  red: null
}
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account1))
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account2))
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(development)> Splitter.deployed().then(istance => istance.split(account1, account2, {from : account0}))        
{
  tx: '0x386dcfad4edd75c5a4e4d397de1991e455fa01eda2ab50fbfdc8f04531aa4661',
  receipt: {
    transactionHash: '0x386dcfad4edd75c5a4e4d397de1991e455fa01eda2ab50fbfdc8f04531aa4661',
    transactionIndex: 0,
    blockHash: '0xeb87525c5f3660454a52235181edaddafaf7b68bf563aa02ad76706b9b028652',
    blockNumber: 6,
    from: '0xf7b3edd556443a01935a1d433e4a0af9be76b6a8',
    to: '0x7a85cb0b4df3ea9e1b90ecd98900d4e35cf1997d',
    gasUsed: 64308,
    cumulativeGasUsed: 64308,
    contractAddress: null,
    logs: [ [Object] ],
    status: true,
    logsBloom: '0x00000000000000000000000000000080000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000100000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000001000000000000000000000100000000000000000000000000000000000000000000000000000',
    rawLogs: [ [Object] ]
  },
  logs: [
    {
      logIndex: 0,
      transactionIndex: 0,
      transactionHash: '0x386dcfad4edd75c5a4e4d397de1991e455fa01eda2ab50fbfdc8f04531aa4661',
      blockHash: '0xeb87525c5f3660454a52235181edaddafaf7b68bf563aa02ad76706b9b028652',
      blockNumber: 6,
      address: '0x7a85cB0B4df3EA9e1B90EcD98900D4E35cf1997d',
      type: 'mined',
      id: 'log_ab0f9f4e',
      event: 'splitLog',
      args: [Result]
    }
  ]
}
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account0))
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account0))
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account1))
BN {
  negative: 0,
  words: [ 15990784, 14966929, 1110, <1 empty item> ],
  length: 3,
  red: null
}
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account2))
BN {
  negative: 0,
  words: [ 15990784, 14966929, 1110, <1 empty item> ],
  length: 3,
  red: null
}
truffle(development)> Splitter.deployed().then(istance => istance.withdrawRefund({from : account1})))
evalmachine.<anonymous>:0
Splitter.deployed().then(istance => istance.withdrawRefund({from : account1})))
                                                                              ^

Uncaught SyntaxError: Unexpected token ')'
truffle(development)> Splitter.deployed().then(istance => istance.withdrawRefund({from : account1}))
{
  tx: '0xb4e33b3e5111bac4cd446895a7fdeac514f41838771fe8be37e3766a4d51f07b',
  receipt: {
    transactionHash: '0xb4e33b3e5111bac4cd446895a7fdeac514f41838771fe8be37e3766a4d51f07b',
    transactionIndex: 0,
    blockHash: '0x77f0ae92bf979712229595c74f259c78ed873c1d81f94fc8476a5217b8fe7a3e',
    blockNumber: 7,
    from: '0x249c93e004587a6096c2fb9ed0e72eb7a12e979c',
    to: '0x7a85cb0b4df3ea9e1b90ecd98900d4e35cf1997d',
    gasUsed: 21985,
    cumulativeGasUsed: 21985,
    contractAddress: null,
    logs: [ [Object] ],
    status: true,
    logsBloom: '0x00000000000000000000000000000080000000000000001000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000',
    rawLogs: [ [Object] ]
  },
  logs: [
    {
      logIndex: 0,
      transactionIndex: 0,
      transactionHash: '0xb4e33b3e5111bac4cd446895a7fdeac514f41838771fe8be37e3766a4d51f07b',
      blockHash: '0x77f0ae92bf979712229595c74f259c78ed873c1d81f94fc8476a5217b8fe7a3e',
      blockNumber: 7,
      address: '0x7a85cB0B4df3EA9e1B90EcD98900D4E35cf1997d',
      type: 'mined',
      id: 'log_72b6f1a9',
      event: 'withdrawRefundLog',
      args: [Result]
    }
  ]
}
truffle(development)> web3.eth.getBalance(account1)
'104999560300000000000'
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account1))
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account0))
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account2))
BN {
  negative: 0,
  words: [ 15990784, 14966929, 1110, <1 empty item> ],
  length: 3,
  red: null
}
truffle(development)> Splitter.deployed().then(istance => istance.withdrawRefund({from : account2}))
{
  tx: '0xc486bec48a4a64a4a2e9d256776d22207f54c7d0375b13a6cb240c6ea59a84ec',
  receipt: {
    transactionHash: '0xc486bec48a4a64a4a2e9d256776d22207f54c7d0375b13a6cb240c6ea59a84ec',
    transactionIndex: 0,
    blockHash: '0xbc6873807442a248da4f2f2c26d418f45c1a1547fa6bb858f3b4c4ebcc1da905',
    blockNumber: 8,
    from: '0xc318e5dfa496fcdc43fa16faaef7a6d1ec91a1d6',
    to: '0x7a85cb0b4df3ea9e1b90ecd98900d4e35cf1997d',
    gasUsed: 21985,
    cumulativeGasUsed: 21985,
    contractAddress: null,
    logs: [ [Object] ],
    status: true,
    logsBloom: '0x00000000000000000000000000000080000000000000001000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000',
    rawLogs: [ [Object] ]
  },
  logs: [
    {
      logIndex: 0,
      transactionIndex: 0,
      transactionHash: '0xc486bec48a4a64a4a2e9d256776d22207f54c7d0375b13a6cb240c6ea59a84ec',
      blockHash: '0xbc6873807442a248da4f2f2c26d418f45c1a1547fa6bb858f3b4c4ebcc1da905',
      blockNumber: 8,
      address: '0x7a85cB0B4df3EA9e1B90EcD98900D4E35cf1997d',
      type: 'mined',
      id: 'log_3fbaef29',
      event: 'withdrawRefundLog',
      args: [Result]
    }
  ]
}
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account2))
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account1))
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(development)> Splitter.deployed().then(istance => istance.getBalance(account0))
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(development)> web3.eth.getBalance(account0)
'89978514240000000000'
truffle(development)> web3.eth.getBalance(account1)
'104999560300000000000'
truffle(development)> web3.eth.getBalance(account2)
'104999560300000000000'
truffle(development)> Splitter.deployed().then(istance => istance.getOwner({from : account1}))
'0xf7b3Edd556443A01935a1d433E4a0af9bE76B6a8'
truffle(development)> account0
'0xf7b3Edd556443A01935a1d433E4a0af9bE76B6a8'
truffle(development)> account1
'0x249C93E004587a6096c2Fb9eD0E72eb7a12e979c'
truffle(development)>