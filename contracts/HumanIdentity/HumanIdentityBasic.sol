pragma solidity 0.4.21;

import "./HumanIdentityInterface.sol";
import "./zeppelin/ownership/Ownable.sol";
import "./zeppelin/math/SafeMath.sol";


/**
* @title HumanIdentityToken
* @author Adam Gall (adam@decentcrypto.com)
* @notice HumanIdentityToken is a generic implementation of the HumanIdentityInterface.
* This implementation provides a recommended approach for implementing
* the `register` and `verify` functions, along with simple
*/
contract HumanIdentityBasic is HumanIdentityInterface, Ownable {
  using SafeMath for uint;

  /**
  * @notice Receive biometrically verified payload and signature 
  * from offchain oracle, along with `to` recipient, and 
  * number of tokens to transfer.
  * @param oracleNonce Unique identifier from offchain oracle identity provider
  * @param confidenceResult Confidence level returned by the identity provider
  * @param user Public address of the user verifyting their transaction
  * @param r Signature data
  * @param s Signature data
  * @param v Signature data
  * @dev Valid inputs
  * oracleNonce Any unique `string`, such as a `UUID`/`GUID` https://en.wikipedia.org/wiki/Universally_unique_identifier
  * confidenceResult Any valid `uint`; is not saved in `registrations` struct but is used to compute signature
  * user Any valid Ethereum `address`; is not saved in `registrations` struct but is used to compute signature
  * r Any bytes data are accepted
  * s Any bytes data are accepted
  * v Any uint8 is accepted
  */
  function register(
    string oracleNonce,
    uint confidenceResult,
    address user,
    bytes32 r,
    bytes32 s,
    uint8 v
  )
  public
  returns (bool success) 
  {
    // concatenate and sha3 the message data.
    // require that the data was signed by the contract's `identityProvider` account <- secret sauce
    bytes32 dataHash = keccak256(oracleNonce, confidenceResult, user);
    require(identityProvider == ecrecover(dataHash, v, r, s));

    // require that the `msg.sender` has not executed this function before
    Registration memory existingRegistration = registrations[msg.sender];
    require(existingRegistration.registered == false);

    // generate and save a new `Registration` struct
    Registration memory registration = generateRegistration(oracleNonce);
    registrations[msg.sender] = registration;

    // save the new struct into contract storage, mapping `msg.sender` to the data
    success = registrations[msg.sender].timestamp != 0;
    emit RegisterUser(msg.sender, oracleNonce, success);
  }

  /**
  * @notice Receive biometrically verified payload and signature from offchain oracle, 
  * along with `to` recipient, and number of tokens to transfer.
  * A user may call this method multiple times after `register`ing.
  * @dev This function reverts if the data being passed in does not have a valid signature
  * from the private key of the contract's `identityProvider`.
  * It also reverts if the sender has not yet `register`ed on the contract
  * It also reverts if the input data has been successfully used in a validation.
  * @param oracleNonce Unique identifier from offchain oracle identity provider
  * @param confidenceResult Confidence level returned by the identity provider
  * @param user Public address of the user verifyting their transaction
  * @param r Signature data
  * @param s Signature data
  * @param v Signature data
  * @dev Valid inputs
  * oracleNonce Any unique `string`, such as a `UUID`/`GUID` https://en.wikipedia.org/wiki/Universally_unique_identifier
  * confidenceResult Any valid `uint`; is not saved in `registrations` struct but is used to compute signature
  * user Any valid Ethereum `address`; is not saved in `registrations` struct but is used to compute signature
  * r Any bytes data are accepted
  * s Any bytes data are accepted
  * v Any uint8 is accepted
  * @return Whether or not the verification's `confidenceResult` was above the contract's threshold
  */
  function verify(
    string oracleNonce,
    uint confidenceResult,
    address user,
    bytes32 r,
    bytes32 s,
    uint8 v
  )
  public
  returns (bool success)
  {
    // concatenate and sha3 the message data.
    // require that the data was signed by the contract's `identityProvider` account <- secret sauce pt. 1.
    // require that the `msg.sender` has registered with the contract.
    // require that this specific set of data has not yet been verififed by this contract.
    // to prevent replay attacks.
    bytes32 dataHash = keccak256(oracleNonce, confidenceResult, user);
    require(identityProvider == ecrecover(dataHash, v, r, s));
    require(registrations[msg.sender].registered == true);
    require(verificationAttempts[dataHash] == false);

    // generate `Verification` struct to save
    Verification memory verification = generateVerification(oracleNonce, confidenceResult, user);

    // compute the current verification "count" for this user. 
    // each new successful `verify` call adds one.
    // use a hash of concatenated `msg.sender` and their `newCount` as the key for the new `verification` struct in `verifications` contract storage mapping.
    // save the `newCount`.
    uint newCount = verificationCounts[msg.sender].add(1);
    verifications[keccak256(msg.sender, newCount)] = verification;
    verificationCounts[msg.sender] = newCount;

    // save the data hash to prevent future replay attacks for this data
    verificationAttempts[dataHash] = true;

    // finally compare the signed `confidenceResult` with contracts `confidenceThreshold` 
    // to verify that the `identityProvider` is sufficiently confident in user's identity. <- secret sauce pt. 2
    success = confidenceResult >= confidenceThreshold;
    emit VerifyUser(msg.sender, oracleNonce, confidenceResult, success);
  }

  /**
  * @notice OnlyOwner method to update the contract's `identityProvider`
  * @param newIdentityProvider New offchain identity provider address
  * @dev Valid input: Any valid Ethereum account address
  */
  function updateIdentityProvider
  (
    address newIdentityProvider
  )
  public
  onlyOwner
  {
    require(newIdentityProvider != address(0));
    emit IdentityProviderUpdated(identityProvider, newIdentityProvider);
    identityProvider = newIdentityProvider;
  }

  /**
  * @notice OnlyOwner method to update the contract's `confidenceThreshold`
  * @param newThreshold Value which to compare `verify` confidence requests against
  * @dev Valid input: Any valid Ethereum based `uint`
  */
  function updateConfidenceThreshold
  (
    uint newThreshold
  )
  public
  onlyOwner
  {
    require(newThreshold != 0);
    emit ConfidenceThresholdUpdated(confidenceThreshold, newThreshold);
    confidenceThreshold = newThreshold;
  }

  /**
  * @notice Generates and returns a new `Registration` struct, given
  * `oracleNonce`, the contract's `identityProvider`, and the block's timestamp
  * @param oracleNonce Unique identifier from offchain oracle identity provider
  */
  function generateRegistration
  (
    string oracleNonce
  )
  private
  view
  returns (Registration registration)
  {
    registration.timestamp = block.timestamp;
    registration.identityProvider = identityProvider;
    registration.oracleNonce = oracleNonce;
    registration.registered = true;
  }

  /**
  * @notice Generates and returns a new `Verification` struct, given
  * `oracleNonce`, `confidenceResult`, `user` (all from the offchain oracle's
  * signed data), the contract's `identityProvider` and `confidenceThreshold,
  * and the block's timestamp.
  * @param oracleNonce Unique identifier from offchain oracle identity provider
  * @param confidenceResult Confidence level returned by the identity provider
  * @param user Public address of the user verifyting their transaction
  */
  function generateVerification
  (
    string oracleNonce,
    uint confidenceResult,
    address user
  )
  private
  view
  returns (Verification verification)
  {
    verification.oracleNonce = oracleNonce;
    verification.confidenceResult = confidenceResult;
    verification.user = user;
    verification.threshold = confidenceThreshold;
    verification.timestamp = block.timestamp;
    verification.identityProvider = identityProvider;
  }
}
