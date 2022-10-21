## Hardhat Setup and Test RopstamToken
```shell
npm install
npx hardhat test
```


This project demonstrates the functionality of smart contracts

These are the main contracts
  1) DeflationaryERC20
  2) RopstamToken
  3) NFTContract

## 1 - DeflationaryERC20
       This contains main block of DeflationaryERC20. For keeping it simple, 
       a) No future mints after initial mint
       b) 50% Tax imposed on every transfer transaction
       c) Whole 50% Tax will be burned 
   
## 2- RopstamToken (RopstamToken.sol)
      Ropstam Token Contract which uses DeflationaryERC20.
   
## 3- NFTContract (NFTContract.sol)
      This is the NFT Contract which have hammer(Fungible) and Open Apes(NFT). There are no decimals added to hammer to make it clear.
      


