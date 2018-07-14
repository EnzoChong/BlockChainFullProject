# Overview
* Download virtualbox
* Download ubuntu OS 
* Download Ethereum-Wallet-linux64-0-9-3.zip and  Mist-linux64-0-9-3.zip</br>
https://github.com/ethereum/mist/releases 

ubuntu-16.04.4-desktop-amd64.iso
* Installing 
* Setting share folder between host and virtual host </br>
Then Device-> Insert Guest Addtion CD

Set in the virtualbox -> shared files -> fixed allocation -> right, get the following figure
![path](/Ethereum/picture/Sharefolder-path.png)

* Command
```
kevin@kevin-VirtualBox:~$ sudo mount -t vboxsf share /mnt
[sudo] password for kevin: 
kevin@kevin-VirtualBox:~$ cd /mnt
kevin@kevin-VirtualBox:/mnt$ ls
kevin@kevin-VirtualBox:/mnt$ ls
Ethereum-Wallet-linux64-0-9-3(1).zip
kevin@kevin-VirtualBox:/mnt$ cd /
kevin@kevin-VirtualBox:/$ ls
bin    dev   initrd.img  lost+found  opt   run   srv  usr
boot   etc   lib         media       proc  sbin  sys  var
cdrom  home  lib64       mnt         root  snap  tmp  vmlinuz
kevin@kevin-VirtualBox:/$ cd mnt
kevin@kevin-VirtualBox:/mnt$ ls
Ethereum-Wallet-linux64-0-9-3(1).zip
kevin@kevin-VirtualBox:/mnt$ sudo service ssh restart
[sudo] password for kevin: 
Failed to restart ssh.service: Unit ssh.service not found.
kevin@kevin-VirtualBox:/mnt$ sudo apt-get install openssh-server

kevin@kevin-VirtualBox:/mnt$ sudo service ssh restart
kevin@kevin-VirtualBox:/mnt$ sudo service ssh status
● ssh.service - OpenBSD Secure Shell server
   Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enab
   Active: active (running) since 六 2018-03-03 11:08:31 CST; 13s ago
 Main PID: 3244 (sshd)
   CGroup: /system.slice/ssh.service
           └─3244 /usr/sbin/sshd -D
kevin@kevin-VirtualBox:/mnt$ sudo apt-get install lrzsz -y


```
  
* unzip command

```
kevin@kevin-VirtualBox:~/ethereum$ unzip Mist-linux64-0-9-3.zip 
Archive:  Mist-linux64-0-9-3.zip

```
![unzip](/Ethereum/picture/Unzip-mist.png)
* move files to Mist folder

```
kevin@kevin-VirtualBox:~/ethereum$ mv linux-unpacked/ Mist/

```

* Running .mist

```
kevin@kevin-VirtualBox:~/ethereum/Mist$ ./mist
[2018-03-03 13:09:08.703] [INFO] main - Running in production mode: true
[2018-03-03 13:09:08.770] [INFO] EthereumNode - undefined null 'fast'
[2018-03-03 13:09:08.779] [INFO] EthereumNode - Defaults loaded: geth main fast
[2018-03-03 13:09:09.178] [INFO] main - Starting in Mist mode
[2018-03-03 13:09:09.293] [INFO] Db - Creating db: /home/kevin/.config/Mist/mist.lokidb
[2018-03-03 13:09:09.322] [INFO] Db - Loading db: /home/kevin/.config/Mist/mist.lokidb
[2018-03-03 13:09:09.349] [INFO] Windows - Creating commonly-used windows
[2018-03-03 13:09:09.349] [INFO] Windows - Create secondary window: loading, owner: notset
[2018-03-03 13:09:09.474] [INFO] updateChecker - Check for update...
[2018-03-03 13:09:12.304] [INFO] Windows - Create primary window: main, owner: notset
[2018-03-03 13:09:12.326] [INFO] Windows - Create primary window: splash, owner: notset
[2018-03-03 13:09:13.064] [INFO] ipcCommunicator - Backend language set to:  en
[2018-03-03 13:09:13.935] [INFO] (ui: splashscreen) - Web3 already initialized, re-using provider.
[2018-03-03 13:09:14.050] [INFO] (ui: splashscreen) - Meteor starting up...
[2018-03-03 13:09:14.234] [INFO] ClientBinaryManager - Initializing...
[2018-03-03 13:09:14.240] [INFO] ClientBinaryManager - Checking for new client binaries config from: https://raw.githubusercontent.com/ethereum/mist/master/clientBinaries.json
[2018-03-03 13:09:16.140] [WARN] ClientBinaryManager - Error loading local config - assuming this is a first run: Error: ENOENT: no such file or directory, open '/home/kevin/.config/Mist/clientBinaries.json'
[2018-03-03 13:09:16.140] [INFO] ClientBinaryManager - Write new client binaries local config to disk ...
[2018-03-03 13:09:16.141] [INFO] ClientBinaryManager - No "skippedNodeVersion.json" found.
[2018-03-03 13:09:16.144] [INFO] ClientBinaryManager - Initializing...
[2018-03-03 13:09:16.144] [INFO] ClientBinaryManager - Resolving platform...
[2018-03-03 13:09:16.144] [INFO] ClientBinaryManager - Calculating possible clients...
[2018-03-03 13:09:16.145] [INFO] ClientBinaryManager - 1 possible clients.
[2018-03-03 13:09:16.145] [INFO] ClientBinaryManager - Verifying status of all 1 possible clients...
[2018-03-03 13:09:16.146] [INFO] ClientBinaryManager - Verify Geth status ...
[2018-03-03 13:09:16.156] [ERROR] ClientBinaryManager - Unable to resolve Geth executable: geth
[2018-03-03 13:09:16.176] [INFO] ClientBinaryManager - Download binary for Geth ...
[2018-03-03 13:09:16.182] [INFO] ClientBinaryManager - Downloading package from https://gethstore.blob.core.windows.net/builds/geth-linux-amd64-1.8.1-1e67410e.tar.gz to /home/kevin/.config/Mist/binaries/Geth/archive.tar ...
[2018-03-03 13:09:17.467] [INFO] updateChecker - App is up-to-date.

```

