// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";

/// @notice SafeMath library for uint calculations with overflow protections
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CAtoken is ERC20, AccessControl {

    /// @notice using SafeMath for unint
    using SafeMath for uint;

    /// @notice constant hashed role for access control
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /// @notice Constructor
    constructor() ERC20("CAtoken", "CAt") {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());
        _mint(_msgSender(), 1000 * 10 ** decimals());
    }

    /**
    * @notice grants the minter role to the specified address
    * @param minter address
    **/
    function grantMinter(address minter) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(MINTER_ROLE, minter);
    }

    /**
    * @notice checks if address has the minter role
    * @param minter address
    **/
    function isMinter(address minter) public view onlyRole(DEFAULT_ADMIN_ROLE) returns (bool){
        return hasRole(MINTER_ROLE, minter);
    }

    /**
    * @notice revokes the minter role for the specified address
    * @param minter address
    **/
    function revokeMinter(address minter) public onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(MINTER_ROLE, minter);
    }

    /**
    * @notice mints specific amount of tokens for specified address
    * @param to address
    * @param amount the amount of tokens to mint
    **/
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }


}