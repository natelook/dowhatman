import { infura } from '@lib/providers';
import { ethers } from 'ethers';
import DoWhatManNFT from '../artifacts/contracts/DoWhatManNFT.sol/DoWhatManNFT.json';

export const MINT_CONTRACT_ADDRESS =
  '0x1659BCb99359f2c1016Fe14685c3C0Db37CB2106';

const nftContract = (provider?: any) => {
  const contract = new ethers.Contract(
    MINT_CONTRACT_ADDRESS,
    DoWhatManNFT.abi,
    provider ? provider : infura,
  );
  return contract;
};

export default nftContract;
