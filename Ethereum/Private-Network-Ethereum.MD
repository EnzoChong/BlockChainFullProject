# Set up private network ethereum 
1. Produce Network 
2. Test Network
3. Private Network

## Step by Step 

* 1: create folder and genesis.json
```
C02VX21EHTD5:Work i325291$ mkdir EthereumPrivate
C02VX21EHTD5:Work i325291$ ls
Cache			EthereumPrivate		Sap Teched
Command			Gamification		Template
Development		INM			VirtualBox
EMS			On-boarding tools
C02VX21EHTD5:Work i325291$ cd EthereumPrivate/
C02VX21EHTD5:EthereumPrivate i325291$ ls
genesis.json
```
* 2: Execute the command to create the creation block

```
/Users/i325291/Work/EthereumPrivate
C02VX21EHTD5:EthereumPrivate i325291$ geth --datadir data0 init genesis.json
INFO [03-03|22:03:13] Maximum peer count                       ETH=25 LES=0 total=25
INFO [03-03|22:03:13] Allocated cache and file handles         database=/Users/i325291/Work/EthereumPrivate/data0/geth/chaindata cache=16 handles=16
INFO [03-03|22:03:13] Writing custom genesis block
INFO [03-03|22:03:13] Persisted trie from memory database      nodes=0 size=0.00B time=8.964µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [03-03|22:03:13] Successfully wrote genesis state         database=chaindata                                                hash=a0e580…a5e82e
INFO [03-03|22:03:13] Allocated cache and file handles         database=/Users/i325291/Work/EthereumPrivate/data0/geth/lightchaindata cache=16 handles=16
INFO [03-03|22:03:13] Writing custom genesis block
INFO [03-03|22:03:13] Persisted trie from memory database      nodes=0 size=0.00B time=2.133µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [03-03|22:03:13] Successfully wrote genesis state         database=lightchaindata                                                hash=a0e580…a5e82e
C02VX21EHTD5:EthereumPrivate i325291$ cd data0/
C02VX21EHTD5:data0 i325291$ ls
geth		keystore
C02VX21EHTD5:data0 i325291$ cd geth/
C02VX21EHTD5:geth i325291$ ls
chaindata	lightchaindata
C02VX21EHTD5:geth i325291$ cd chaindata/
C02VX21EHTD5:chaindata i325291$ ls
000001.log	CURRENT		LOCK		LOG		MANIFEST-000000
C02VX21EHTD5:chaindata i325291$
```

* start node 

```
C02VX21EHTD5:EthereumPrivate i325291$ geth --datadir ./data0 --networkid 11 console
INFO [03-03|22:08:09] Maximum peer count                       ETH=25 LES=0 total=25
INFO [03-03|22:08:09] Starting peer-to-peer node               instance=Geth/v1.8.1-stable/darwin-amd64/go1.10
INFO [03-03|22:08:09] Allocated cache and file handles         database=/Users/i325291/Work/EthereumPrivate/data0/geth/chaindata cache=768 handles=1024
INFO [03-03|22:08:09] Initialised chain configuration          config="{ChainID: 15 Homestead: 0 DAO: <nil> DAOSupport: false EIP150: <nil> EIP155: 0 EIP158: 0 Byzantium: <nil> Engine: unknown}"
INFO [03-03|22:08:09] Disk storage enabled for ethash caches   dir=/Users/i325291/Work/EthereumPrivate/data0/geth/ethash count=3
INFO [03-03|22:08:09] Disk storage enabled for ethash DAGs     dir=/Users/i325291/.ethash                                count=2
INFO [03-03|22:08:09] Initialising Ethereum protocol           versions="[63 62]" network=11
INFO [03-03|22:08:09] Loaded most recent local header          number=0 hash=a0e580…a5e82e td=262144
INFO [03-03|22:08:09] Loaded most recent local full block      number=0 hash=a0e580…a5e82e td=262144
INFO [03-03|22:08:09] Loaded most recent local fast block      number=0 hash=a0e580…a5e82e td=262144
INFO [03-03|22:08:09] Loaded local transaction journal         transactions=0 dropped=0
INFO [03-03|22:08:09] Regenerated local transaction journal    transactions=0 accounts=0
INFO [03-03|22:08:09] Starting P2P networking
INFO [03-03|22:08:11] UDP listener up                          self=enode://a9039f4477fcdadd1aa65b52aed1802af7d06d4e41fe29cb5a15e9025d4d7620ed9cb11e91d136c81691b377c5d5a00cf56fcef286eab5ed013f3389610c82eb@[::]:30303
INFO [03-03|22:08:11] RLPx listener up                         self=enode://a9039f4477fcdadd1aa65b52aed1802af7d06d4e41fe29cb5a15e9025d4d7620ed9cb11e91d136c81691b377c5d5a00cf56fcef286eab5ed013f3389610c82eb@[::]:30303
INFO [03-03|22:08:11] IPC endpoint opened                      url=/Users/i325291/Work/EthereumPrivate/data0/geth.ipc
Welcome to the Geth JavaScript console!
```
![start node](/picture/Start-node.png)
 
* Get accounts

```
> eth.accounts
[]

```
* Create account

```
> personal.newAccount("kevin")
"0x4204997f5531bb62043dc1cda482108ab154bbc2"
```

* miner start

```
> miner.start()
INFO [03-03|22:30:00] Updated mining threads                   threads=0
INFO [03-03|22:30:00] Transaction pool price threshold updated price=18000000000
INFO [03-03|22:30:00] Etherbase automatically configured       address=0x4204997f5531bB62043DC1cdA482108Ab154Bbc2
INFO [03-03|22:30:00] Starting mining operation
null
> INFO [03-03|22:30:00] Commit new mining work                   number=1 txs=0 uncles=0 elapsed=140.031µs
INFO [03-03|22:30:02] Generating DAG in progress               epoch=0 percentage=0 elapsed=863.014ms
INFO [03-03|22:30:02] Generating DAG in progress               epoch=0 percentage=1 elapsed=1.732s
INFO [03-03|22:30:03] Generating DAG in progress               epoch=0 percentage=2 elapsed=2.597s
INFO [03-03|22:30:04] Generating DAG in progress               epoch=0 percentage=3 elapsed=3.467s
INFO [03-03|22:30:05] Generating DAG in progress               epoch=0 percentage=4 elapsed=4.338s
INFO [03-03|22:30:06] Generating DAG in progress               epoch=0 percentage=5 elapsed=5.200s
INFO [03-03|22:30:07] Generating DAG in progress               epoch=0 percentage=6 elapsed=6.064s
INFO [03-03|22:30:08] Generating DAG in progress               epoch=0 percentage=7 elapsed=6.939s
INFO [03-03|22:30:09] Generating DAG in progress               epoch=0 percentage=8 elapsed=7.804s
INFO [03-03|22:30:09] Generating DAG in progress               epoch=0 percentage=9 elapsed=8.695s
INFO [03-03|22:30:10] Generating DAG in progress               epoch=0 percentage=10 elapsed=9.577s
INFO [03-03|22:30:11] Generating DAG in progress               epoch=0 percentage=11 elapsed=10.444s
INFO [03-03|22:30:12] Generating DAG in progress               epoch=0 percentage=12 elapsed=11.313s
INFO [03-03|22:30:13] Generating DAG in progress               epoch=0 percentage=13 elapsed=12.222s
INFO [03-03|22:30:14] Generating DAG in progress               epoch=0 percentage=14 elapsed=13.131s
INFO [03-03|22:30:15] Generating DAG in progress               epoch=0 percentage=15 elapsed=14.028s
INFO [03-03|22:30:16] Generating DAG in progress               epoch=0 percentage=16 elapsed=14.937s
INFO [03-03|22:30:17] Generating DAG in progress               epoch=0 percentage=17 elapsed=15.847s

INFO [03-03|22:31:32] Generated ethash verification cache      epoch=0 elapsed=1m31.256s
INFO [03-03|22:31:35] Successfully sealed new block            number=1 hash=0d1bfb…effc1f
INFO [03-03|22:31:35] 🔨 mined potential block                  number=1 hash=0d1bfb…effc1f
```


