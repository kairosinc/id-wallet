ALPHA Release

# Kairos Identity Wallet™
#### Kairos Identity Wallet™ for Kairos Identity Token™

The Identity (ID) Wallet™ is a client-side wallet dApp that implements the Kairos Protocol™ ([Human Identity Interface™](/contracts/HumanIdentity) + [Kairos Face Recognition API](https://www.kairos.com/docs/api)). Users have the ability to store, send, and receive [Kairos Identity (ID) Tokens™](/README.md#kairos-identity-token), as well as issue transaction requests to other ID Wallet™ users.

Because no existing wallets currently cater to the ID Token™ use cases, it will initially be the primary client interface used for holding and transacting ID Token™. Due to the fact that the ID Wallet™ is available for third-party integrations via an this open source code base, adoption by mobile and traditional web applications is entirely feasible. 

Projects that would benefit from a biometrically verified token transaction system, but don’t necessarily have the resources to create their own, are now able to reap the benefits from such an integration. 

#### Try our alpha release demo: https://wallet.kairos.com/

## Installation

The app can easily be run either locally or using Docker with the included Dockerfile.

The app is basically a single page application, which is viewed at `src/client/index.jsx`.

For the face verification part, you'll need a developer account with Kairos. Sign-up, get your API key via [developer.kairos.com](https://developer.kairos.com), and check your inbox for an activation link.

You should now have your `APP_ID` and `APP_KEY`.

#### Clone or fork the repo, and git clone via command-line (CLI):
   ```
   cd $HOME/Desktop
   git clone https://github.com/kairosinc/id-wallet.git
   ```

## Running the app on your local system

Set the following environment variables into the .env file, which is at the root of the app directory.
* ORACLE_ADDRESS //signature proxy public address goes here
* APP_ID
* APP_KEY
* GALLERY_NAME
* ROOT_URL //root URL to your Signature Proxy
* ENROLL_ROUTE //route to Signature Proxy Enroll call
* VERIFY_ROUTE //route to Signature Proxy Verify call

#### Prerequisites

* `node` / `npm`
* `yarn`

#### Commands
To setup:

```sh
$ yarn install
```

```sh
$ yarn setup

# yarn run v1.5.1
# $ cp .env.example .env
# ✨  Done in 0.11s.
```

To start a development environment:

```sh
$ yarn develop
```

In another tab:

```sh
$ yarn develop:webpack
```

To build a production application:

```sh
$ yarn build
```

To run the production application:

```sh
$ yarn start
```

To stop the production application:

```sh
$ yarn stop
```

To run tests:

```sh
$ yarn test
```

To lint the `src/` directory:

```sh
$ yarn lint
```

#### Githooks

To execute `yarn test`:

```sh
$ yarn precommit
```

To execute `yarn test && yarn build`:

```sh
$ yarn prepush
```

## Running the app in a Docker container
* Run the following commands, which will build your Docker container and execute Docker-Compose run to start up the app locally on your machine:
  ```
  make build
  make run
  ```
* Once your app is running, you can visit `http://localhost:8000` in your browser to view the application.

* To stop the Docker container:

```
docker stop $(docker ps -q)
```

Note: This will stop all running containers not just this one

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
# $ ganache-cli -m 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat'
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
# Mnemonic:      candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
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
ganache-cli -m "candy maple..."
```

# Feedback and Getting Help

We'd love to hear feedback from you and we're also here to help if you have any questions — feel free to [email our support team](mailto:support@kairos.com).
