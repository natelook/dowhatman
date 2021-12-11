import { ethers } from 'ethers';
import requestAccount from '@lib/request-account';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import DoWhatManNFT from '../artifacts/contracts/NFT.sol/DoWhatManNFT.json';

const MINT_CONTRACT_ADDRESS = '0x1659BCb99359f2c1016Fe14685c3C0Db37CB2106';

const test = atom({
  default: 'Hello',
  key: 'test',
});

export default function MintPage() {
  const [testing, setTesting] = useRecoilState(test);

  console.log({ testing });

  async function getURI() {
    if (typeof window.ethereum === undefined) return;
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      MINT_CONTRACT_ADDRESS,
      DoWhatManNFT.abi,
      provider,
    );
    try {
      const hello = await contract.tokenURI(1);
      console.log({ hello });
    } catch (error) {
      console.log('Error: ', error);
    }
  }

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
    await transaction.wait();
  }

  async function requestAccount() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
  }

  return (
    <main>
      <h1>Mint</h1>
      <div className="flex space-x-5">
        <button
          className="px-3 py-1 bg-yellow text-black rounded hover:bg-black hover:text-yellow border border-yellow transition duration-200"
          onClick={mint}
        >
          Mint
        </button>
        <button
          className="px-3 py-1 bg-yellow text-black rounded hover:bg-black hover:text-yellow border border-yellow transition duration-200"
          onClick={getURI}
        >
          Get Token URI
        </button>
      </div>
    </main>
  );
}
