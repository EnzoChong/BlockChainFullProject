# Configuration

```
{
	"connect_url": "multichain_network@18.197.95.3:7000"
}
```

**SAP Help:** https://help.sap.com/viewer/7a9dd2504ac54190827e27ef956be95c/BLOCKCHAIN/en-US/9cc0e36120e947e780f1142b8df750c4.html

* Create single node and cluster node
```
1.0 node service key

{
	"api_key": "eUVa79Yw8FvnbuH9EUeEt2S7Wa49oKWQmnFZRFLjZuxwnxufX9GPdfRkQDnH7egX",
	"url": "https://maas-proxy.cfapps.sap.hana.ondemand.com/e37b316e-4691-4960-94ce-5480bcffb829/rpc"
}



1.1 node service key

{
	"api_key": "jzuFksThJRBKK3qUB5FgJA2nABhcL5cBqSh7VqA6Ew9DWFzcUHwJtKT5fcgVHfRf",
	"url": "https://maas-proxy.cfapps.sap.hana.ondemand.com/32b02851-6e12-4b66-9747-32acec72e742/rpc"
}


2.0 node service key


{
	"api_key": "DP2nru929hC2KvVUw4dnoR4cVdjw6TVAWAfbheuDfZLmeJc78koQhP5zFpzdTV7d",
	"url": "https://maas-proxy.cfapps.sap.hana.ondemand.com/d1de7d20-ab75-49c0-9926-525f7bdc99c1/rpc"
}

2.0 node Address

Chainname: mc-2252549218900709869
Description: MultiChain mc-2252549218900709869
Address: 12WghUwCSjgnN4annrwHYKtiGmuaxq3bUdAXQF
Node Address: mc-2252549218900709869@18.196.241.240:7000
Last Block:
#80
from 2 hours ago (March 14, 2018 11:07:39 AM)

instance=d1de7d20-ab75-49c0-9926-525f7bdc99c1

2.1 node Address

Chainname: mc-2252549218900709869
Description: MultiChain mc-2252549218900709869
Address: 1QMJ2wKQGMDBtKMRGyJh8CwDnTwvbjsfAvfRjE
Node Address: mc-2252549218900709869@18.197.193.145:7000
Last Block:
#80
from 2 hours ago (March 14, 2018 11:07:39 AM)

instance=1b867ef9-52c1-4028-9a99-e388c593f60a

2.2 node Address

Chainname: mc-2252549218900709869
Description: MultiChain mc-2252549218900709869
Address: 1UjEf4Q7fqqbSGGw3DpKtb3we3FyovWmaHEqKz
Node Address: mc-2252549218900709869@18.197.175.102:7000
Last Block:
#171
from a few seconds ago (March 14, 2018 2:59:56 PM)

instance=e62566ff-a81e-4497-a991-b3ae726d4c54

```

* API

```
Init SAPCoins

https://maas-proxy.cfapps.sap.hana.ondemand.com/d1de7d20-ab75-49c0-9926-525f7bdc99c1/rpc

{"method": "issue", "params": ["12WghUwCSjgnN4annrwHYKtiGmuaxq3bUdAXQF","SAPCoins",1000000] }


Respond 

{
    "result": "44211f749ea4519b3e1d9fffa5ae503bf6bd06632ac1c7ba190bb8025185bbb4",
    "error": null,
    "id": null
}

SAP Coin exchange

https://maas-proxy.cfapps.sap.hana.ondemand.com/d1de7d20-ab75-49c0-9926-525f7bdc99c1/rpc


{"method": "sendasset", "params": ["1QMJ2wKQGMDBtKMRGyJh8CwDnTwvbjsfAvfRjE","SAPCoins",5] }


{
    "result": "7d91538cdf5fdec8eac915fe0b4d2bf1dfeed5890143aea1dc3a58c04080c2fa",
    "error": null,
    "id": null
}


```
Helo link: https://www.jianshu.com/p/74be3806b1f9

**There is bugs when init assert ,address is not exist current instance ,so will init assert to latest address
**



