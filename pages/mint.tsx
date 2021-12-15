import { ethers } from 'ethers';
import { useState } from 'react';
import DoWhatManNFT from '../artifacts/contracts/NFT.sol/DoWhatManNFT.json';

const MINT_CONTRACT_ADDRESS = '0x1659BCb99359f2c1016Fe14685c3C0Db37CB2106';

export default function MintPage() {
  const [isMinting, setMinting] = useState(false);
  async function mint() {
    // @ts-ignore
    if (typeof window.ethereum === undefined) return;
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      MINT_CONTRACT_ADDRESS,
      DoWhatManNFT.abi,
      signer,
    );
    const amount = 1;
    const price = 0.03;
    const transaction = await contract.mint(amount, {
      value: ethers.utils.parseEther(`${amount * price}`),
      gasLimit: 300000 * amount,
    });
    setMinting(true);
    console.log({ transaction });
    const tdata = await transaction.wait();
    console.log({ tdata });
    setMinting(false);
  }

  async function requestAccount() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
  }

  return (
    <main>
      <h1>Mint</h1>
      {isMinting && <span>I&apos;m minting</span>}
      <div className="flex space-x-5">
        <button
          className="px-3 py-1 bg-yellow text-black rounded hover:bg-black hover:text-yellow border border-yellow transition duration-200"
          onClick={mint}
        >
          Mint
        </button>
      </div>
    </main>
  );
}
