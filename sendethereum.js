# nowalabs
var Web3 = require('web3');

const provider = 'https://ropsten.infura.io/v3/YOUR__INFURA__KEY';
var web3 = new Web3(new Web3.providers.HttpProvider(provider));
var util = require('ethereumjs-util');
var tx = require('ethereumjs-tx');

var privateKey ='0xYOUR___PRIVATE__KEY';

//console.log(privateKey.length);

var publicKey = util.bufferToHex(util.privateToPublic(privateKey));
var address = '0x' + util.bufferToHex(util.sha3(publicKey)).slice(26);




var balance = web3.eth.getBalance(address).toNumber();
var myBalance = web3.fromWei(balance, 'ether');

console.log('Your wallet Balance: ' + myBalance);

var nonce = web3.eth.getTransactionCount('YOUR_WALLET_ADDRESS');
console.log(nonce);

const amountToSend = 0.00100000;

var details = {
    nonce: nonce,
    gasPrice: web3.toHex(20000000000),
    gasLimit: web3.toHex(100000),
    to: '0x9f2ad7d5742F5a3f6F72384560285f89A63fc3cd',
    value: web3.toHex( web3.toWei(amountToSend, 'ether') ),
    data: '0xc0de'
};

var p = new Buffer('YOUR_PRIVATE_KEY', 'hex');
var transaction = new tx(details);
transaction.sign(p);
//console.log(util.bufferToHex(transaction.hash(true)));
var serializedTx = transaction.serialize();

console.log(serializedTx.toString('hex'));
var transactionId = web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));
console.log(transactionId);
console.log('https://ropsten.etherscan.io/tx/'+transactionId);

