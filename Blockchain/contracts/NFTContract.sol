// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RopstamNFTContract is ERC1155 {
    uint256 public cost = 100 * 10**18;

    mapping(uint256 => string) public tokenURI;

    IERC20 tokenContract;

    mapping(address => bool) admins;

    uint256 public constant hammer = 0;
    uint256 public constant openapes = 1;

    constructor(address ropstamTokenAddress) ERC1155("") {
        admins[msg.sender] = true;
        tokenContract = IERC20(ropstamTokenAddress);
        setURI(
            hammer,
            "https://dv8.mypinata.cloud/ipfs/QmYb9B7BYMrhf7n3KaCpP4pHTba7QC2jqLr4L4KT82UR2X/1.json"
        );

        setURI(
            openapes,
            "https://dv8.mypinata.cloud/ipfs/QmUDbuAYuG9vhankeSDZk8Z6PijyLqbA8dXWNUCXRDzo3X/1.json"
        );
    }

    function mint(uint256 id, uint256 amount) external {
        // Transfer required ropstam token from user account
        uint256 requiredTokens = amount * cost;

        // User wants to mint hammer(0)
        if (id == hammer) {
            require(
                balanceOf(msg.sender, openapes) == 0,
                "You cannot mint hammer becuase you own Open Apes"
            );

            tokenContract.transferFrom(
                msg.sender,
                address(this),
                requiredTokens
            );

            // Considering hammer(fungible) has 1 decimal due to clarification
            _mint(msg.sender, hammer, amount, "");
        }
        // User wants to mint OpenApes(1)
        else if (id == openapes) {
            require(
                balanceOf(msg.sender, hammer) == 0,
                "You cannot mint OpenApes becuase you own hammer"
            );

            tokenContract.transferFrom(
                msg.sender,
                address(this),
                requiredTokens
            );

            _mint(msg.sender, hammer, amount, "");
        }
    }

    function setURI(uint256 _id, string memory _uri) private {
        tokenURI[_id] = _uri;
        emit URI(_uri, _id);
    }

    function uri(uint256 _id) public view override returns (string memory) {
        return tokenURI[_id];
    }

    // Withdraw Funds (Ropstam Tokens and Ethers)
    function withdraw() public onlyAdmins {
        // Withdraw Ropstam Token from contract account
        tokenContract.transfer(
            msg.sender,
            tokenContract.balanceOf(address(this))
        );
    }

    function addAdmin(address newAdmin) public onlyAdmins {
        admins[newAdmin] = true;
    }

    function checkAdmin(address admin) public view returns (bool) {
        return admins[admin];
    }

    modifier onlyAdmins() {
        require(admins[msg.sender] == true, "Only Admin Call Invoke!");
        _;
    }
}
