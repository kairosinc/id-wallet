pragma solidity 0.4.21;

import "./HumanIdentity/token/HumanIdentityToken.sol";


/**
* @title KairosIdentityToken
* @author Adam Gall (adam@decentcrypto.com)
* @notice KairosIdentityToken is Kairos's biometrically verified cryptocurrency
*/
contract KairosIdentityToken is HumanIdentityToken {

  /**
  * @notice Standard ERC20 public properties
  * Total supply is 300,000,000 (three hundred million) ID
  */
  string public name = "Kairos Identity Token";
  string public symbol = "ID";
  uint public decimals = 18;
  uint public totalSupply = 300000000 * (10 ** decimals);

  /**
  * @notice Public constructor, sets up the contract with it's initial state
  * @param _identityProvider Address of off-chain Kairos identity that signs enrollment and verification data
  * @param _confidenceThreshold Number that represents a percentage of verification confidence from the `identityProvider`
  * @dev Valid inputs
  * _identityProvider Any valid Ethereum `address`
  * _confidenceThreshold Any valid Ethereum based `uint`
  */
  function KairosIdentityToken(address _identityProvider, uint _confidenceThreshold) public {
    identityProvider = _identityProvider;
    confidenceThreshold = _confidenceThreshold;
    balances[msg.sender] = totalSupply;
  }

  /**
  * @notice To destroy the contract, owner can kill() it
  */
  function kill() public onlyOwner {
    selfdestruct(msg.sender);
  }
}
