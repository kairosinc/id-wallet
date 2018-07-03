pragma solidity 0.4.21;

import "../HumanIdentityBasic.sol";
import "../zeppelin/token/StandardToken.sol";


/**
* @title HumanIdentityToken
* @author Adam Gall (adam@decentcrypto.com)
* @notice HumanIdentityToken is a generic "token" implementation of the 
* HumanIdentityBasic contract joined with OpenZeppelin's
* ERC20 StandardToken
*/
contract HumanIdentityToken is HumanIdentityBasic, StandardToken {

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
  * @param to Address of token recipient
  * @param amount Amount of tokens to send to `to`
  * @dev Valid inputs
  * oracleNonce Any unique `string`, such as a `UUID`/`GUID` https://en.wikipedia.org/wiki/Universally_unique_identifier
  * confidenceResult Any valid `uint`; will be compared to contract's `confidenceThreshold`
  * user Any valid Ethereum `address`
  * r Any bytes data are accepted
  * s Any bytes data are accepted
  * v Any uint8 is accepted
  * to Any valid Ethereum `address`; the recipient of the ERC20 `transfer` function executed if verification is successful
  * amount Any valid ERC20 token amount that `msg.sender` is allowed to spend, as per ERC20 spec https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
  * @dev Note
  * This function should never be called after `verify` is called directly, because it will fail.
  * The `verify` function has replay-attack functionality built in that only allows one call per set of data.
  * Clients should only ever call `verifyAndTransfer`, never `verify` then `verifyAndTransfer`.
  * @return A boolean indicating whether the function was successful or not.
  * The result will be false if either the `verify` OR `transfer` 
  * functions fail. Only returns true if token transfer occurs.
  */
  function verifyAndTransfer(
    string oracleNonce,
    uint confidenceResult,
    address user,
    bytes32 r,
    bytes32 s,
    uint8 v,
    address to,
    uint amount
  ) 
  public 
  returns (bool success) 
  {
    success = verify(oracleNonce, confidenceResult, user, r, s, v);
    if (success) {
      success = transfer(to, amount);
    }
  }
}
