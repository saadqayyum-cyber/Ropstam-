import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import nftContractData from "../Blockchain/nft_contract";
import ropstamContractData from "../Blockchain/ropstam_contract";
import { INFURA_ID, NFT_CONTRACT_ADDRESS } from "../Config/config";
import Swal from "sweetalert2";

export const BlockchainContext = createContext();

// PROVIDER OPTIONS
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "ROPSTAM CRYPTO", // Required
      infuraId: INFURA_ID, // Required
      chainId: 1, // Optional. It defaults to 1 if not provided
    },
  },
};

// Web3 Modal Config
const web3Modal = new Web3Modal({
  network: "goerli", // optional
  cacheProvider: true, // optional
  providerOptions, // required
  theme: "dark",
});

export const BlockchainContextProvider = (props) => {
  const [currentSigner, setCurrentSigner] = useState("");
  const [currentSignerAddress, setCurrentSignerAddress] = useState("");
  const [currentProvider, setCurrentProvider] = useState("");

  useEffect(() => {
    listenMMAccount(); // Event is registered in background
  }, []);

  async function listenMMAccount() {
    let provider;
    try {
      await disconnectWallet();
      provider = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();

      setCurrentProvider(web3Provider);
      setCurrentSigner(signer);
      setCurrentSignerAddress(address);
    } catch (error) {
      //   alert(error.data.message);
      console.log(error);
      throw new Error("No Ethereum Object");
    }

    provider.on("accountsChanged", async function () {
      window.location.reload();
    });

    provider.on("chainChanged", (currentChainId) => {
      window.location.reload();
    });
  }

  const connectWallet = async () => {
    try {
      await disconnectWallet();
      const provider = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();

      setCurrentProvider(web3Provider);
      setCurrentSigner(signer);
      setCurrentSignerAddress(address);
    } catch (error) {
      //   alert(error.data.message);
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };

  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();
    setCurrentSigner(null);
    setCurrentSignerAddress(null);
  };

  // Buy Ropstam Token
  const buyRopstam = async (props) => {
    // Get Ethereum Contract

    if (!currentSignerAddress) {
      alert("Please Connect Wallet!");
    }

    const ropstamContract = new ethers.Contract(
      ropstamContractData.address,
      ropstamContractData.abi,
      currentProvider
    );
    const ropstamContractWithSigner = ropstamContract.connect(currentSigner);

    const cost = await ropstamContract.cost();
    console.log(cost);
    const Single_Mint_Cost = cost.toString();
    const Total_Cost = Single_Mint_Cost * props.amount;

    console.log(props);
    console.log(Total_Cost);
    let tx;

    try {
      tx = await ropstamContractWithSigner.buyTokens(
        ethers.utils.parseEther(String(props.amount)),
        {
          value: Total_Cost.toString(),
        }
      );

      await tx.wait();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.toString(),
      });
      console.log(error);
    }
  };

  // Buy Hammer
  const buyHammer = async (props) => {
    // Get Ethereum Contract

    if (!currentSignerAddress) {
      alert("Please Connect Wallet!");
    }

    const nftContract = new ethers.Contract(
      nftContractData.address,
      nftContractData.abi,
      currentProvider
    );
    const nftContractWithSigner = nftContract.connect(currentSigner);

    const ropstamContract = new ethers.Contract(
      ropstamContractData.address,
      ropstamContractData.abi,
      currentProvider
    );
    const ropstamContractWithSigner = ropstamContract.connect(currentSigner);

    const cost = await nftContract.cost();
    const Single_Mint_Cost = cost.toString();
    const Total_Cost = Single_Mint_Cost * props.amount;
    let tx, tx2;

    try {
      // Transactions

      tx = await ropstamContractWithSigner.approve(
        NFT_CONTRACT_ADDRESS,
        Total_Cost.toString()
      );

      await tx.wait();
      tx2 = await nftContractWithSigner.mint(0, props.amount);
      await tx2.wait();
    } catch (error) {
      if (error.toString().includes("You cannot mint hammer")) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You cannot mint hammer becuase you own Open Apes",
        });
      } else if (error.toString().includes("ERC20: insufficient allowance")) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You dont have enough Ropstam Tokens!",
        });
      } else if (
        error.toString().includes("ERC20: transfer amount exceeds balance")
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You dont have enough Ropstam Tokens!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.toString(),
        });
        console.log(error);
      }
    }
  };
  // Buy OpenApe
  const buyOpenApe = async (props) => {
    // Get Ethereum Contract

    if (!currentSignerAddress) {
      alert("Please Connect Wallet!");
    }

    const nftContract = new ethers.Contract(
      nftContractData.address,
      nftContractData.abi,
      currentProvider
    );
    const nftContractWithSigner = nftContract.connect(currentSigner);

    const ropstamContract = new ethers.Contract(
      ropstamContractData.address,
      ropstamContractData.abi,
      currentProvider
    );
    const ropstamContractWithSigner = ropstamContract.connect(currentSigner);

    const cost = await nftContract.cost();
    const Single_Mint_Cost = cost.toString();
    const Total_Cost = Single_Mint_Cost * props.amount;
    let tx, tx2;

    try {
      // Transactions
      tx = await ropstamContractWithSigner.approve(
        NFT_CONTRACT_ADDRESS,
        Total_Cost.toString()
      );

      await tx.wait();
      tx2 = await nftContractWithSigner.mint(1, props.amount);
      await tx2.wait();
    } catch (error) {
      if (error.toString().includes("You cannot mint OpenApes")) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You cannot mint OpenApes becuase you own hammer",
        });
      } else if (error.toString().includes("ERC20: insufficient allowance")) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You dont have enough Ropstam Tokens!",
        });
      } else if (
        error.toString().includes("ERC20: transfer amount exceeds balance")
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You dont have enough Ropstam Tokens!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.toString(),
        });
        console.log(error);
      }
    }
  };

  /* 
  * -------------------------------------------
            Functions
  * -------------------------------------------
  */

  return (
    <BlockchainContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        currentSignerAddress,
        buyRopstam,
        buyHammer,
        buyOpenApe,
      }}
    >
      {props.children}
    </BlockchainContext.Provider>
  );
};
