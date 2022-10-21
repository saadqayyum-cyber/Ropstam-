import { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";

const Navbar = () => {
  const { currentSignerAddress, connectWallet } = useContext(BlockchainContext);

  function connectWalletHandler() {
    connectWallet();
  }

  return (
    <>
      <nav className="w-full flex justify-between items-center py-8 px-6 md:px-12 bg-[#070326] text-white">
        {/* 1- Title */}
        <div className="">
          <p className="uppercase text-[#c52e38] font-bold text-2xl md:text-3xl">
            ROPSTAM CRYPTO
          </p>
        </div>
        {/* 2- ul --> hidden on mobile view, below md */}
        <ul
          className="flex justify-between items-center space-x-3 mf:space-x-7 lg:space-x-8 xl:space-x-10 2xl:space-x-16 list-none 
        text-[0.8rem] md:text-[1rem] cursor-pointer "
        >
          {currentSignerAddress ? (
            <li className="bg-green-500 p-3 rounded-2xl">Wallet Connected</li>
          ) : (
            <li
              className="bg-[#d93637] p-3 rounded-2xl"
              onClick={connectWalletHandler}
            >
              Connect Wallet
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
