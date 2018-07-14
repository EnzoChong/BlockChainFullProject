# Compare
* Techncially:
  * If you want to use a blockchain for data storage & retrieval to make business processes auditable across networks,  Multichain is the right option.
  * If you additionally want to bring application logic into the blockchain, you need smart contracts currently available in Hyperledger or Ethereum.

* Blockchain Application Developer Guide@SAP
https://jam4.sapjam.com/blogs/show/jE20u9mpjt19L6YtUUr9wm

* peformance

In Bitcoin only 7 transaction per second can be executed. This is too slow for many use cases. But the limitations comes from the public availability of the ledger and its expensive proof of work mechanism. In permissioned blockchains such as Multichain and Hyperledger you don't have these limitations. For Multichain we already have data throughput figures, e.g. 1.000 transactions in a distributed network of nodes (see link for test setup). We also provide Hyperledger figures once we have them in a comparable way.
If you still have use cases that require higher throughput of transactions, you may consider some off-chain optimization. You may condense 10 transactions off-chain and only store the result on the blockchain itself.


