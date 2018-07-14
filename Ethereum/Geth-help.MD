# Overview
* Get accounts
```
> eth.accounts
["0xfae04344a4cb552e7ea2492c207b73cb03056950"]

> eth.getBalance("0xfae04344a4cb552e7ea2492c207b73cb03056950")
0

> acc0 = eth.accounts[0]
"0xfae04344a4cb552e7ea2492c207b73cb03056950"
> eth.getBalance(acc0)
0

```

* How to convert ether between two accounts
Earlier stated that each account's public key (address) is the core of all Ethereum account operations, but the address string is too long, we use acc0 / acc1 represent accounts [0] and [1], the other set to transfer 0.01 Ether
```
> personal.newAccount("tingting")
"0xc4dfecac9f0e09ef2ef2f8f96b866d2cade50e45"
> eth.accounts
["0xfae04344a4cb552e7ea2492c207b73cb03056950", "0xc4dfecac9f0e09ef2ef2f8f96b866d2cade50e45"]
> acc0 = eth.accounts[0]
"0xfae04344a4cb552e7ea2492c207b73cb03056950"
> acc1 = eth.accounts[1]
"0xc4dfecac9f0e09ef2ef2f8f96b866d2cade50e45"
> amount = web3.toWei(0.01)
"10000000000000000"
> eth.sendTransaction({from:acc0,to:acc1,value:amount})
Error: authentication needed: password or unlock
    at web3.js:3143:20
    at web3.js:6347:15
    at web3.js:5081:36
    at <anonymous>:1:1

> personal.unlockAccount(acc0)
Unlock account 0xfae04344a4cb552e7ea2492c207b73cb03056950
Passphrase:
Error: could not decrypt key with given passphrase
> personal.unlockAccount(acc0)
Unlock account 0xfae04344a4cb552e7ea2492c207b73cb03056950
Passphrase:
true
> eth.sendTransaction({from:acc0,to:acc1,value:amount})
Error: exceeds block gas limit
    at web3.js:3143:20
    at web3.js:6347:15
    at web3.js:5081:36
    at <anonymous>:1:1

>
```

![geth transaction](/Ethereum/picture/Geth-transaction.png)

```
> eth.sendTransaction({from:acc0,to:acc1,value:amount})
Error: authentication needed: password or unlock
    at web3.js:3143:20
    at web3.js:6347:15
    at web3.js:5081:36
    at <anonymous>:1:1
```
* The result is as follows:</br>

![error](/Ethereum/picture/Transaction-error.png)</br>

This is a protection mechanism for Ethereum that automatically locks the account from time to time, at which time any ether conversion between accounts will be denied unless the account is unlocked.

This time we need to perform personal.unlockAccount(acc0)and enter the password to unlock acc0 available.

```
> eth.sendTransaction({from:acc0,to:acc1,value:amount})
Error: exceeds block gas limit
    at web3.js:3143:20
    at web3.js:6347:15
    at web3.js:5081:36
    at <anonymous>:1:1

>
```
* The result is as follows:</br>

![limit](/Ethereum/picture/Limit.png)

This is because my account is not currency. it is right 


