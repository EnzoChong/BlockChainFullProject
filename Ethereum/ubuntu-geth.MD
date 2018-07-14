# Overview
1. VirtualBox After installing Ubuntu , the default should be to open a network card, the connection method according to the host computer to connect (if the physical machine is wired through the Internet, you need to use NAT network connection, if it is a wireless network, you need to use the bridge Way Internet), the network card is responsible for the virtual machine's Internet.
2. add a network card, connection options only host (Host-Only) adapter.
3. into the ubuntu system, ifconfig-a, view the current network card information, according to the HWaddr field to see if there are two NICs and VirtualBox inside

* Install geth in the ubuntu OS

```
$ sudo add-apt-repository -y ppa:ethereum/ethereum
$ sudo apt-get update
$ sudo apt-get install ethereum
```

* set network 

![network](/Ethereum/picture/Network.png)

* Set static IP

```
sudo vi /etc/network/interfaces

```

auto enp0s3

iface enp0s3 inet static

address 192.168.1.150

netmask 255.255.255.0

gateway 192.168.0.1

```
sudo vi /etc/resolv.conf

```
nameserver 192.168.0.1


* Set static Permanent change

```
sudo vi /etc/resolvconf/resolv.conf.d/base
```

nameserver 192.168.0.1

* restart network or restart computer

```
sudo /etc/init.d/networking restart
or
sudo reboot
```
* Mac-connect-remote-linux

```
C02VX21EHTD5:~ i325291$ sudo su -
Password:

C02VX21EHTD5:~ root# ssh -p 22 kevin@192.168.0.150
The authenticity of host '192.168.0.150 (192.168.0.150)' can't be established.
ECDSA key fingerprint is SHA256:nyS6Xlgx9tulCSpd+lNPeDrhzLMbXTOYNeg7ut8Jusc.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '192.168.0.150' (ECDSA) to the list of known hosts.
kevin@192.168.0.150's password:
Welcome to Ubuntu 16.04.4 LTS (GNU/Linux 4.13.0-36-generic x86_64)

```
* Install ssh server

```
sudo apt-get install openssh-server

sudo service ssh start

```

**helplink:https://www.linuxidc.com/Linux/2016-09/134963.htm**
