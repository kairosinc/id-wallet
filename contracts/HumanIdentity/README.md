ALPHA Release

# The Human Identity Interface™

The Human Identity Interface™ (HII™) is a smart contract interface that defines the standard by which
Kairos and other biometric identity verification providers interact with contracts that implement it.

The goal is to provide the blockchain community with an open source, decentralized standard for any
physical identity provider to implement, and a suite of example implementations of this standard for
both identity providers and identity verifying clients (such as a wallet for a token that associates
identity to a transaction using the HII™).

The HII™ is an interface (similar to ERC-20) that, when implemented by a smart contract, allows
identity providers to interact with said smart contract programmatically and autonomously. The
initial implementation of this standard interface targets the Ethereum blockchain, but could be
applied in other decentralized systems in the future.

## Implementation

The HII™ uses the [Kairos ID Signature Proxy](https://github.com/kairosinc/id-signature-proxy) to securely communicate with the Kairos API. 

The interface is implemented with the following events, structs, variables, and functions.

### Events

#### RegisterUser

`RegisterUser` is meant to be emitted upon an attempted registration.

`RegisterUser` is an event with an address `sender`, a string `oracleNonce`, and a boolean `success`.

* `sender` is the address of the user attempting to register with the identity provider

* `oracleNonce` is the internal identifier used by the identity provider to reference the user

* `success` is a boolean value that illustrates whether or not a registration was successful

#### VerifyUser

`VerifyUser` is meant to be emitted upon an attempted verification.

`VerifyUser` is an event with an address `sender`, a string `oracleNonce`, a uint `confidenceResult`and a bool `success`.

* `sender` is the address of the user attempting to verify with the identity provider

* `oracleNonce` is the internal identifier used by the identity provider to reference the user

* `confidenceResult` is the confidence level returned by the identity provider

* `success` is the boolean result of the verification attempt

### Structs

#### Registration

A `Registration` is meant to be created each time a registration is attempted.

`Registration` is a struct with a uint `timestamp`, an address `identityProvider`, a string `oracleNonce`,and a bool `registered`.

* `timestamp` is the time at which the registration was attempted

* `identityProvider` is the address used by the identity provider to sign data sent to the contract.

* `oracleNonce` is the internal identifier used by the identity provider to reference the user

* `registered` is a boolean value that illustrates whether or not a registration was successful (used for code optimizations in `verify` function)

#### Verification

A `Verification` is meant to be created each time a verification is attempted.

`Verification` is a struct with a string `oracleNonce`, a uint `confidenceResult`, a uint `confidenceThreshold`, an address `user`, a uint `timestamp`, an address `oracle`, and a bytes32
`oracleNonce`.

* `confidenceResult` is the confidence result of the attempted verification

* `confidenceThreshold` is the confidence required by the contract for a successful verification

* `user` is the address of user attempting verification (used as hash input)

* `timestamp` is the time at which the verification was attempted

* `identityProvider` is the address of the identity provider

### Variables

#### identityProvider

`identityProvider` is the address used by the identity provider to sign data sent to the contract.

#### confidenceThreshold
`confidenceThreshold` is used to compare with confidence results sent from identity provider

#### registrations

`registrations` stores the `Registration` structs that are created as a result of an attempted
registration.

`registrations` is a mapping that binds an address to a `Registration` struct.

#### verifications

`verifications` is a mapping that binds an address to a `Verification` struct.

`verifications` stores the `Verification` structs that are created as a result of an attempted 
verification.

#### verificationCounts

`verificationCounts` is a mapping that binds an address to a uint.

`verificationCounts` associates an address' number of verification attempts to said address.

#### verificationAttempts

`verificationAttempts` is a mapping is that associates a bytes32 key with a boolean value

The key in `verificationAttempts` is the `keccak256` hash of the data payload sent from oracle. The value in `verificationAttempts` represents whether or not the hashed data has been sent to the smart contract in the past. Because there is a unique event identifier being sent from the oracle (`oracleNonce`),replay attacks can be prevented by checking the boolean value associated with the hashed data payload. 

### Functions

#### register

`register` is meant to fire off the contract-specific logic that occurs once a registration attempt has been made, and emits a `RegisterUser` event.

`register` is a function that takes as argument a string `oracleNonce`, a uint `confidenceResult`, an address `user`, a bytes32 `r`, a bytes32 `s`, a uint `v`.It returns a bool `success`.

* `oracleNonce` is the internal identifier used by the identity provider to reference the user

* `confidenceResult` is the confidence level returned by the identity provider (used as hash input for registration)

* `user` is the address of the user who attempted to register

* `r`, `s`, `v` are the ECDSA signature values used to verify the signer of the data payload

#### verify

`verify` is meant to fire off the contract-specific logic that occurs once a verification attempt
has been made, and emits a `VerifyUser` event.

`verify` is a function that takes as argument a string `oracleNonce`, a uint `confidenceResult`, an address `user`, a bytes32 `r`, a bytes32 `s`, a uint `v`.It returns a bool `success`.

* `r`, `s`, `v` are the ECDSA signature values used to verify the signer of the data payload

## Feedback and Getting Help

We'd love to hear feedback from you and we're also here to help if you have any questions — feel free to [email our support team](mailto:support@kairos.com).

