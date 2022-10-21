import Loader from "./Loader";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useState, useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";

const Mint = (props) => {
  const { isLoading, buyRopstam, buyHammer, buyOpenApe } =
    useContext(BlockchainContext);

  const [mintValue, setMintValue] = useState(1);
  const [mintValueRopstam, setMintValueRopstam] = useState(200);

  const incrementHandlerRopstam = () => {
    setMintValueRopstam(mintValueRopstam + 100);
  };

  const decrementHandlerRopstam = () => {
    if (mintValueRopstam === 200) return;
    setMintValueRopstam(mintValueRopstam - 100);
  };

  const incrementHandler = () => {
    if (mintValue === 9) return;
    setMintValue(mintValue + 1);
  };

  const decrementHandler = () => {
    if (mintValue === 1) return;
    setMintValue(mintValue - 1);
  };

  const buyRopstamHandler = () => {
    buyRopstam({ amount: mintValueRopstam.toString() });
  };

  const buyHammerHandler = () => {
    buyHammer({ amount: mintValue.toString() });
  };

  const buyOpenApeHandler = () => {
    buyOpenApe({ amount: mintValue.toString() });
  };

  return (
    <div
      className="bg-[#0c0928] flex flex-wrap justify-center xl:justify-between items-center py-24
      px-8 xl:px-60 space-x-7"
    >
      {/* Left */}
      <div className="flex flex-col justify-center items-center">
        {/* Heading */}
        <h1 className="mb-20 text-3xl font-extrabold text-white">
          BUY ROPSTAM TOKEN
        </h1>
        {/* Incrementer */}
        <div className="flex justify-center items-center text-white space-x-2">
          <button>
            <div
              className="border-2 rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 bg-[#171433] hover:border-red-600 hover:text-red-500"
              onClick={decrementHandlerRopstam}
            >
              <AiOutlineMinus fontSize={28} />
            </div>
          </button>
          <div className="border-2 rounded-xl py-2 sm:py-3 md:py-4 lg:p-5 px-16 sm:px-20 md:px-24 lg:px-28 xl:px-32 bg-[#171433]">
            <p className="text-4xl font-bold">{mintValueRopstam}</p>
          </div>
          <button>
            <div
              className="border-2  rounded-xl  p-3 sm:p-4 md:p-5 lg:p-6 bg-[#171433] hover:border-green-600 hover:text-green-500"
              onClick={incrementHandlerRopstam}
            >
              <AiOutlinePlus fontSize={28} />
            </div>
          </button>
        </div>
        {/* Text */}
        <div className="text-white mt-3">
          <p className="text-xl font-extralight">Buy 1 Ropstam 100 Wei</p>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          // Mint Button
          <div
            className="flex justify-center items-center border-2 border-[#e1e1e1] bg-[#e1e1e1] cursor-pointer hover:bg-slate-900 hover:text-white
          hover:border-2 hover:border-orange-500
         text-black mt-10 rounded-xl w-full py-5"
            onClick={buyRopstamHandler}
          >
            <button>
              <p className="text-2xl uppercase">BUY ROPSTAM</p>
            </button>
          </div>
        )}
        {/* Mint Button */}
      </div>

      {/* Right */}
      <div className="flex flex-col justify-center items-center">
        {/* Heading */}
        <h1 className="mb-20 text-3xl font-extrabold text-white">
          BUY HAMMER / OPENAPES
        </h1>
        {/* Incrementer */}
        <div className="flex justify-center items-center text-white space-x-2">
          <button>
            <div
              className="border-2 rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 bg-[#171433] hover:border-red-600 hover:text-red-500"
              onClick={decrementHandler}
            >
              <AiOutlineMinus fontSize={28} />
            </div>
          </button>
          <div className="border-2 rounded-xl py-2 sm:py-3 md:py-4 lg:p-5 px-16 sm:px-20 md:px-24 lg:px-28 xl:px-32 bg-[#171433]">
            <p className="text-4xl font-bold">{mintValue}</p>
          </div>
          <button>
            <div
              className="border-2  rounded-xl  p-3 sm:p-4 md:p-5 lg:p-6 bg-[#171433] hover:border-green-600 hover:text-green-500"
              onClick={incrementHandler}
            >
              <AiOutlinePlus fontSize={28} />
            </div>
          </button>
        </div>
        {/* Text */}
        <div className="text-white mt-3">
          <p className="text-xl font-extralight mt-3">
            Buy 1 Hammer/OpenApe 100 Ropstam
          </p>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          // Mint Button
          <div className="flex justify-center items-center  space-x-11">
            <button
              className="bg-[#e1e1e1] border-2 border-[#e1e1e1]  cursor-pointer  hover:bg-slate-900 hover:text-white
          hover:border-2 hover:border-orange-500
         text-black mt-10 rounded-xl py-5 px-5"
              onClick={buyHammerHandler}
            >
              <p className="text-2xl uppercase">BUY HAMMER</p>
            </button>

            <button
              className="bg-[#e1e1e1] border-2 border-[#e1e1e1]  cursor-pointer  hover:bg-slate-900 hover:text-white
          hover:border-2 hover:border-orange-500
         text-black mt-10 rounded-xl py-5 px-5"
              onClick={buyOpenApeHandler}
            >
              <p className="text-2xl uppercase">BUY OPENAPE</p>
            </button>
          </div>
        )}
        {/* Mint Button */}
      </div>
    </div>
  );
};

export default Mint;
