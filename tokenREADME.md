# Kairos Identity Token™

#### Kairos Identity Token™ and Distribution

Powered by face biometrics and blockchain technology, Kairos plans to create a method of identity verification which allows the user to remain anonymous— because we believe to validate a transaction, businesses only need to know that you are you.

The Kairos Identity (ID) Token™ is the specially designed digital asset of this system, and enables users to reduce the risk of face recognition specific identity theft and increase privacy during secure transactions. [For example: Trading crypto assets]

## Getting Started

### Prerequisites

* `node` / `npm`
* `yarn`
* `truffle`
* `ganache-cli`

## Testing

To run the tests

```sh
$ yarn blockchain

# yarn run v1.5.1
# $ ganache-cli -m 'your secret here'
# Ganache CLI v6.1.0 (ganache-core: 2.1.0)

# Available Accounts
# ==================
# (0) 0x62730609...
# ...

# Private Keys
# ==================
# (0) c87509a1c067bbde...
# ...

# HD Wallet
# ==================
# Mnemonic:      your secret here
# Base HD Path:  m/44'/60'/0'/0/{account_index}

# Listening on localhost:8545
```

then in a new console window

```sh
$ yarn test

# Using network 'development'.
#   Contract: KairosIdentityToken
#     ✓ should be connected to the correct user account
#     ...

#   14 passing (3s)
```

### Migrating

To perform migrations (on the development network)

```sh
$ yarn migrate
```

To execute on ropsten or mainnet, say so

```sh
$ yarn migrate --network ropsten
```

To tell truffle to forget the network state and start over from the first migration file

```sh
$ yarn migrate --network ropsten --reset
```

## Application Structure

The application contains a few components:

* `airdrop/`
* `build/`
* `contracts/`
* `migrations/`
* `test/`

### airdrop/

`airdrop/` contains data and a script for performing automatic ID Token transfers.

### build/

`build/` is a funny one. We don't usually commit build artifacts of course, but some of the data in here is needed for truffle's migration tools to correctly run. Leaving in here for now, dealing with it in git through gritted teeth.

### contracts/

`contracts/` contains the the KairosIdentityToken, and it's cascading set of dependent contracts. Also contains a Migrations contract for truffle's migration tools.

### migrations/

`migrations/` define routes that execute controller methods.

### test/

`test/` test with `truffle test`. You must be running a local blockchain with MNEMONIC `your secret here`.

```
ganache-cli -m "your secret here"
```

## Feedback and Getting Help

We'd love to hear feedback from you and we're also here to help if you have any questions — feel free to [email our support team](mailto:support@kairos.com).
