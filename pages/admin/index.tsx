import { ethers } from 'ethers';
import requestAccount from '@lib/request-account';
import DoWhatManNFT from '../../artifacts/contracts/NFT.sol/DoWhatManNFT.json';

const MINT_CONTRACT_ADDRESS = '0xdFfaF258d6589c61955eD43375bd6c2379199d1e';

export default function AdminPage() {
  async function withdraw() {
    // @ts-ignore
    if (typeof window.ethereum === 'underfined') return;
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      MINT_CONTRACT_ADDRESS,
      DoWhatManNFT.abi,
      signer,
    );
    const hello = await contract.withdraw();
    console.log({ hello });
  }

  return (
    <main>
      <h1>Admin</h1>
      <button
        className="px-3 py-1 bg-yellow text-black rounded hover:bg-black hover:text-yellow border border-yellow transition duration-200"
        onClick={withdraw}
      >
        Withdraw
      </button>
    </main>
  );
}
