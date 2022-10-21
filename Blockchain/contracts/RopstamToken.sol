// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DeflationaryERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RopstamToken is DeflationaryERC20 {
    uint256 private _initialSupply = 10000 * 10**decimals();
    uint8 cost = 100;

    constructor() DeflationaryERC20("Ropstam", "RSM") {
        _mint(address(this), _initialSupply);
    }

    // Buy Tokens
    function buyTokens(uint256 amount) public payable {
        require(
            msg.value == (amount / 10**decimals()) * cost,
            "Insufficient Amount to Buy Tokens!"
        );
        IERC20 tokenContract = IERC20(address(this));
        tokenContract.transfer(msg.sender, amount);
    }
}
