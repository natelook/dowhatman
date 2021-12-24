import useWallet from '@hooks/useWallet';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import DoWhatManNFT from '../artifacts/contracts/NFT.sol/DoWhatManNFT.json';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { shortenHex } from 'utils';
import Image from 'next/image';

const MINT_CONTRACT_ADDRESS = '0x1659BCb99359f2c1016Fe14685c3C0Db37CB2106';

export default function MintPage() {
  const [isMinting, setMinting] = useState(false);
  const [mintAmount, setMintAmount] = useState(0);
  const { ENSName, wallet, connectWallet } = useWallet();
  console.log(ENSName, wallet);

  async function mint() {
    const price = 0.03;
    if (!mintAmount) return;

    // @ts-ignore
    if (typeof window.ethereum === undefined) return;
    const signer = await getSigner();
    // signer.sendTransaction
    const contract = new ethers.Contract(
      MINT_CONTRACT_ADDRESS,
      DoWhatManNFT.abi,
      signer,
    );

    const amount = mintAmount;

    setMinting(true);
    console.log('Before Transaction');
    const transaction = await contract.mint(amount, {
      value: ethers.utils.parseEther(`${amount * price}`),
      gasLimit: 300000 * amount,
    });
    console.log('After Transaction');
    console.log({ transaction });
    const tdata = await transaction.wait();
    console.log({ tdata });
    setMinting(false);
  }

  async function getSigner() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider.getSigner();
  }

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="mb-10 text-yellow">Mint</h1>
        <Image
          src="/bear_nobg.png"
          height="200px"
          width="200px"
          alt="bear"
          priority
        />
      </div>
      <div className="flex space-x-5 border-green border rounded p-5">
        {!wallet ? (
          <div className="text-center flex justify-center w-full">
            <button
              className="wallet-button mx-auto block"
              onClick={() => connectWallet()}
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="w-full">
            <div className="text-center">
              <h4 className="text-3xl font-headings text-center text-yellow">
                Wallet Connected
              </h4>
              <a className="font-bold">{ENSName || shortenHex(wallet)}</a>
            </div>
            <MintUI
              setMintAmount={setMintAmount}
              mintAmount={mintAmount}
              mint={mint}
            />
          </div>
        )}
      </div>
    </main>
  );
}

interface MintUIProps {
  setMintAmount: (amount: number) => void;
  mintAmount: number;
  mint: () => void;
}

function MintUI({ setMintAmount, mintAmount, mint }: MintUIProps) {
  return (
    <div className="mt-6">
      <h3 className="text-3xl text-center">Select Mint Amount. ( 10 Max )</h3>
      <div className="max-w-xs mx-auto flex justify-between items-center space-x-10 p-5">
        <motion.button
          onClick={() => setMintAmount(mintAmount - 1)}
          className="bg-black p-2 text-xl rounded-lg border-yellow border hover:bg-yellow hover:text-black transition-colors"
          disabled={mintAmount === 0}
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.1 }}
        >
          <AiOutlineMinus />
        </motion.button>
        <span className="text-2xl">{mintAmount}</span>
        <motion.button
          onClick={() => setMintAmount(mintAmount + 1)}
          className="bg-black p-2 text-xl rounded-lg border-yellow border hover:bg-yellow hover:text-black transition-colors"
          disabled={mintAmount === 10}
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.1 }}
        >
          <AiOutlinePlus />
        </motion.button>
      </div>
      <div className="max-w-xs mx-auto">
        <button
          onClick={mint}
          className="bg-green text-black w-full py-2 rounded-lg uppercase font-bold text-xl"
        >
          Mint
        </button>
      </div>
    </div>
  );
}
