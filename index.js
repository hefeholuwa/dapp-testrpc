var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

/* if(window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} */

var SimpleStoreFactory = web3.eth.contract([{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"_store","type":"uint256"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_value","type":"uint256"}],"name":"SetStore","type":"event"}]);

var simpleStoreInstance = SimpleStoreFactory.new(
   {
     from: web3.eth.accounts[0],
     data: '606060405260ce8060106000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b11460415780636d4ce63c14605757603f565b005b605560048080359060200190919050506078565b005b6062600480505060bd565b6040518082815260200191505060405180910390f35b806000600050819055507f5fc23fc1f16159eb3214ee8dfa40e314b551745ca27befed551503df83fb0e4c816040518082815260200191505060405180910390a15b50565b6000600060005054905060cb565b9056',
     gas: 3000000
   }, function (e, contract){
    console.log(e, contract);

    if (typeof contract.address !== 'undefined') {
      //console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);

      contract.set(3000, {from: web3.eth.accounts[0], gas: 3000000}, function(err, result){
        console.log('SimpleStore set', err, result);
      });

      contract.SetStore({_value: 3000}, function(err, result){
        console.log('SimpleStore event', err, result);

        contract.get(function(err, result){
          console.log('SimpleStore get', err, result);
        });
      });
    }
 });
