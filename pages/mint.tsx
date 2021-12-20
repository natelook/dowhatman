import { ethers } from 'ethers';
import React, { useState } from 'react';
import DoWhatManNFT from '../artifacts/contracts/NFT.sol/DoWhatManNFT.json';

const MINT_CONTRACT_ADDRESS = '0x1659BCb99359f2c1016Fe14685c3C0Db37CB2106';

export default function MintPage() {
  const [isMinting, setMinting] = useState(false);
  const [mintAmount, setMintAmount] = useState('');

  async function mint(e: React.FormEvent) {
    e.preventDefault();
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

    const amount = parseInt(mintAmount);

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
      <h1>Mint</h1>
      {isMinting && <span>I&apos;m minting</span>}
      <div className="flex space-x-5">
        <div>
          <form onSubmit={mint}>
            <input
              className="text-black"
              type="number"
              max="1"
              value={mintAmount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMintAmount(e.target.value)
              }
            />
            <button
              className="px-3 py-1 bg-yellow text-black rounded hover:bg-black hover:text-yellow border border-yellow transition duration-200"
              type="submit"
            >
              Mint
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
