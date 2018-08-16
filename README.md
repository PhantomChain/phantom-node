# PHANTOM Node
PHANTOM is a decentralized system that is a fork of ARK that is operated by a delegated proof-of-stake consensus protocol. PHANTOM, in its core, will allow users to create Private Smart Contracts and transmit private transactions within the network while giving the ability to use Private Smart Bridges for cross-chain private interoperability. 


## Install, Upgrade etc...
You need to provision a linux (ubuntu tested) server (digital ocean, vultur or other).

Then use the excellent ark-commander script
```
cd
wget https://ark.io/ARKcommander.sh
bash ARKcommander.sh
```

For developers, please read the "Developer Installation" section below.  

or Alternatively run
```
cd
wget https://ark.io/DARKcommander.sh
bash DARKcommander.sh
```

## Details

This is a fork from ARK with the following features:
- Private Smart Contract Capability
- Virtual Machine (WASM)
- Faster TPS and block times


### Performance
- stable on testnet at 300tx/s
- pushed to 400tx/s on devnet


## Developer Installation

Insutrctions coming soon

### Vagrant

[Vagrant](https://www.vagrantup.com/) is a virtual development environment manager backed by a provider like [VirtualBox](https://www.virtualbox.org/wiki/Downloads).

To start the Vagrant environment:

```
vagrant up
```

All dependency installation and configuration for the dev environment is in the `VagrantFile`. After installation, ark-node will automatically start and log all output to the console.

To log into the Vagrant environment:

```
vagrant ssh
```

To destroy and revert to the original state:

```
vagrant destroy
vagrant up
```

There will be a drive shared with the host machine inside the VM, mounted at `/vagrant`.

### Non-Vagrant

Install essentials:

```
sudo apt-get update
sudo apt-get install -y curl build-essential python git
```

Install PostgreSQL (min version: 9.5.2)

```
sudo apt-get install -y postgresql postgresql-contrib libpq-dev
sudo -u postgres createuser --createdb --password $USER
```

Install Node.js (tested with version 6.9.2, but any recent LTS release should do):

```
sudo apt-get install -y nodejs npm
sudo npm install -g n
sudo n 6.9.2
```

Install grunt-cli (globally):

```
sudo npm install grunt-cli -g
```

Clone this repository
```
git clone https://github.com/phantomcore/node.git
cd ark-node
```

Install node modules:
```
npm install libpq secp256k1
npm install
```

## Launch
To launch PHANTOM on testnet:
```
createdb ark_testnet
npm run start:testnet
```

To launch Ark on devtnet:
```
createdb ark_devnet
npm run start:devnet
```

To launch Ark on mainnet (when launched):
```
createdb ark_mainnet
npm run start:mainnet
```

**NOTE:** The **port**, **address**, **genesis block** and **config-path** can be overridden by providing the relevant command switch:
```
node app.js -p [port] -a [address] -c [config-path] -g [genesisBlock-path]
```
This allow you to run several different networks, or your own private chain


## Launch your own private or public chain
Generate a genesisBlock.json + a default config.json containing all passphrases of genesis delegates
```
node tasks/createGenesisBlock.js
```

Be sure to configure this file for your needs

- a genesisBlock.json containing the genesis block
- a config.json containing configuration to start relay nodes
- an autoforging config.json containing configuration to start all delegates on a single node (for testing purpose)
- a bunch of config files to distribute to different configured delegate nodes starting the network.
- a delegatesPassphrases.json containing details about the genesis delegates
- a genesisPassphrase.json containing the details of delegates that will launch your network


Obviously you can hack away tasks/createGenesisBlock.js for your own custom use.

You can the start with your own chain on a single node (all delegates will forge on your single node) using:
```
createdb ark_newtest
npm run start:newtest
```

Then you can distribute the config.json (without the delegates secrets inside, and with custom peers settings) to peers to let them join your chain


## Tests
Load git submodule [ark-js](https://github.com/arkecosystem/ark-js):
```
git submodule init
git submodule update
```

You should run using test configurations

```
npm run start:test
```

Run the test suite:

```
npm test
```

Run individual tests:

```
npm test -- test/api/accounts.js
npm test -- test/api/transactions.js
```

**NOTE:** The master passphrase for this test genesis block is as follows:

```
peace vanish bleak box tuna woman rally manage undo royal lucky since
```

## Security

If you discover a security vulnerability within this application, please send an e-mail to security@ark.io. All security vulnerabilities will be promptly addressed.

## Authors
- FX Thoorens <fx.thoorens@ark.io>
- Boris Povod <boris@crypti.me>
- Pavel Nekrasov <landgraf.paul@gmail.com>
- Sebastian Stupurac <stupurac.sebastian@gmail.com>
- Oliver Beddows <oliver@lisk.io>

## License

The MIT License (MIT)

Copyright (c) 2016-2017 Ark
Copyright (c) 2016 Lisk
Copyright (c) 2014-2015 Crypti

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
