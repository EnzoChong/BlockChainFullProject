# Overview

https://ethereum.github.io/browser-solidity

* Prerequisites
Open VPN

* Development and Compile

![Browser-solidity](/Ethereum/picture/Browser-solidity.png)

![Browser-solidity](/Ethereum/picture/Detail.png)

![Browser-solidity](/Ethereum/picture/Detail1.png)

* Development 
```
  pragma solidity ^0.4.0;
    
    contract DemoTypes {
        function f(uint a) returns (uint b) 
        {
            uint result = a * 8;
            return result;
        }
    }
```
We next try to do some simple analysis, and introduce some of the most basic knowledge of Solidity
```
pragma solidity ^0.4.0;
```
The first line of code is required, otherwise the compiler will not know how to choose the compiler, as well as the compiler version.
The first line pragma solidityin pragmaa keyword, on behalf of the program starts, solidityon behalf of the intelligence contracts are written by Solidity language
0.4.9On behalf of the compiler version, Note: from 0.4.9 in the front can not play ^, 0.4.8 / 0.4.7 and other versions or need to play ^
compiler version backward compatible,

```
contract DemoTypes {
       ...
    }
```
Here to quote a description of the Contract in Solidity

```
Contracts in Solidity are similar to classes in object-oriented languages. They contain persistent data in state variables and functions that can modify these variables. Calling a function on a different contract (instance) will perform an EVM function call and thus switch the context such that state variables are inaccessible. (Cited here )
```

Thus, smart contracts in Solidity are very similar to those in traditional object-oriented languages, so there are traditional concepts like constructors, inheritance, variables, functions, and abstract classes.
Smart contracts written by Solidity are compiled and executed by the EVM

```
function f(uint a) returns (uint b) 
        {
            ...
        }
```
As mentioned above, the contract contains the variables & methods. function f(uint a) returns (uint b)The delegate defines a fmethod named , input variable uint a, and output asuint b
uint represents a stateless integer number, that is, an integer greater than 0
uint = uint256, the maximum of 256 power of 2, this figure is sufficient for most mathematical operations.
Relative to the uint there is a negative integer type, int, int = int256, 

```
function f(uint a) returns (uint b) 
        {
            uint result = a * 8;
            return result;
        }
```
This is a very common js code, it is noteworthy that the following two points

1. Solidity is a type language, so each variable needs to define his type, uint / int / string / var

2. With coding style uint result = a * 8;, solidity encourages a space in the operator.


![Web IDE](/Ethereum/picture/Demo-Web-IDE.png)

```
WEB3DEPLOY
var demotypesContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"a","type":"uint256"}],"name":"f","outputs":[{"name":"b","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]);
var demotypes = demotypesContract.new(
   {
     from: web3.eth.accounts[0], 
     data: '0x6060604052341561000f57600080fd5b60b68061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063b3de648b146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b600080600883029050809150509190505600a165627a7a72305820612a064a334601456b8667125a242e4edf7d215579c2eb1233255a6f411d58040029', 
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
```
![WEB3DEPLOY](/Ethereum/picture/WEB3DEPLOY.png)


