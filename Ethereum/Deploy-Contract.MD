# Overview
We are on the command line, first of all unlock(eth.accounts[0]), because the deployment of the contract requires the consumption of gas, which is also Ether. And before said that due to the protection mechanism, does not unlock the account, will not allow any etheric outflow.

```
> personal.unlockAccount(acc0)
Unlock account 0xfae04344a4cb552e7ea2492c207b73cb03056950
Passphrase:
true
>
```

Then we copy and paste the following code into the geth command line.

```
> var a_demotypesContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"a","type":"uint256"}],"name":"f","outputs":[{"name":"b","type":"uint256"}],"payable":false,"type":"function"}]);
undefined
> var a_demotypes = a_demotypesContract.new(
...    {
......      from: web3.eth.accounts[0],
......      data: '0x6060604052341561000c57fe5b5b60ab8061001b6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063b3de648b14603a575bfe5b3415604157fe5b60556004808035906020019091905050606b565b6040518082815260200191505060405180910390f35b600060006008830290508091505b509190505600a165627a7a7230582010decdc0b0a43b565814fe904eae2544665457d6353c7d906fc2c43c81c867e40029',
......      gas: '4700000'
......    }, function (e, contract){
......     console.log(e, contract);
......     if (typeof contract.address !== 'undefined') {
.........          console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
.........     }
......  })
Error: exceeds block gas limit undefined
```

** happen error : exceeds block gas limit undefined is because my account is not currency**

* if deploy contract successfully , run below command

```
> a_demotypes
{
  abi: [{
      constant: false,
      inputs: [{...}],
      name: "f",
      outputs: [{...}],
      payable: false,
      type: "function"
  }],
  address: "0x54ed7a5f5a63ddada3bfe83b3e632adabaa5fc2f",
  transactionHash: "0x69cde62bcd6458e14f40497f4840f422911d63f5dea2b3a9833e6810db64a1c9",
  allEvents: function(),
  f: function()
}
>
```

* You can also call a_demotypes method f, enter any number, returns 8 * n, such as the input 100, return 800, enter 125, return 1000

```
> a_demotypes.f.call(100)
800
> a_demotypes.f.call(125)
1000
```

