pragma solidity 0.4.21;


/**
* @title HumanIdentityInterface
* @author Adam Gall (adam@decentcrypto.com)
* @notice The Human Identity Interface (HII) is a smart contract interface that defines the standard by which
* Kairos and other biometric identity verification providers interact with contracts that implement it.
* 
* The goal is to provide the blockchain community with an open source, decentralized standard for any
* physical identity provider to implement, and a suite of example implementations of this standard for
* both identity providers and identity verifying clients (such as a wallet for a token that associates
* identity to a transaction using the HII).
* 
* The HII is an interface (similar to ERC-20) that, when implemented by a smart contract, allows
* identity providers to interact with said smart contract programmatically and autonomously. The
* initial implementation of this standard interface targets the Ethereum blockchain, but could be
* applied in other decentralized systems in the future.
*/
contract HumanIdentityInterface {

  /**
  * @notice Registraion struct provides registration data for when an Ethereum account
  * registers their biomentric data with the identityProvider
  */
  struct Registration {
    uint    timestamp;          // Seconds since Unix Epoch
    address identityProvider;   // Public address of identityProvider 
    string  oracleNonce;        // Unique event identifier returned by identityProvider
    bool    registered;         // Bool indicating registration status (for code optimizations)
  }
  
  /**
  * @notice Verification struct provides verification data from when an Ethereum account
  * verifies their biometric data with the identityProvider
  */
  struct Verification {
    string  oracleNonce;      // Unique event identifier returned by identityProvider
    uint    confidenceResult; // Confidence value returned by identityProvider
    address user;             // Address of user attempting verification (used as hash input)
    uint    threshold;        // Confidence threshold required for verification (set on contract deployment)
    uint    timestamp;        // Seconds since Unix Epoch
    address identityProvider; // Public address of identityProvider 
  }

  /**
  * @notice Emits when user attempts registration
  */
  event RegisterUser(address indexed sender, string oracleNonce, bool success); 
  
  /**
  * @notice Emits when user attempts verification
  */
  event VerifyUser(address indexed sender, string oracleNonce, uint confidenceResult, bool success);
  
  /**
  * @notice Emits when identity provider address is updated
  */
  event IdentityProviderUpdated(address oldProvider, address newProvider);
  
  /**
  * @notice Emits when confidence threshold is updated
  */
  event ConfidenceThresholdUpdated(uint oldThreshold, uint newThreshold);

  /**
  * @notice Public address of the contract's identity provider
  */
  address public identityProvider;

  /**
  * @notice Updateable confidence threshold to compare against confidence results sent from identity provider
  */
  uint public confidenceThreshold;

  /**
  * @notice User address -> Registration object
  */
  mapping(address => Registration) public registrations;

  /**
  * @notice Hash of user address + verificationCount -> Verification object
  */
  mapping(bytes32 => Verification) public verifications;

  /**
  * @notice User address -> number of verification attempts. For the 1->many relationship of registered users to their verification attempts
  */
  mapping(address => uint) public verificationCounts;

  /**
  * @notice Hash of signed data -> bool indicating that an oracle response has been used before. For replay attacks.
  */
  mapping(bytes32 => bool) public verificationAttempts;

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
  */
  function register(string oracleNonce, uint confidenceResult, address user, bytes32 r, bytes32 s, uint8 v) 
  public returns (bool success);

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
  * @return Whether or not the verification's `confidenceResult` was above the contract's threshold
  */
  function verify(string oracleNonce, uint confidenceResult, address user, bytes32 r, bytes32 s, uint8 v)
  public returns (bool success);
}