import { ethers } from 'ethers';
import requestAccount from './request-account';

export const infura = new ethers.providers.InfuraProvider(
  4,
  '5e52170a7c0e442b9152b7b34ca3f80d',
);

export const signer = async (provider: any) => {
  await requestAccount();
  const web3Provider = new ethers.providers.Web3Provider(provider);
  const signer = web3Provider.getSigner();
  return signer;
};
