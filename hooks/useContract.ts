import DoWhatManNFT from '../artifacts/contracts/NFT.sol/DoWhatManNFT.json';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import useWallet from './useWallet';

const MINT_CONTRACT_ADDRESS = process.env.CONTRACT!;

export default function useContract() {
  const [contractBalance, setContractBalance] = useState<string | null>();
  const [isRevealed, setIsRevealed] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [contract, setContract] = useState<ethers.Contract | null>();
  const [isPaused, setIsPaused] = useState<boolean | null>();

  console.log(typeof isPaused);

  const { wallet } = useWallet();

  useEffect(() => {
    async function getSigner() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (provider) {
        return provider.getSigner();
      }
      return undefined;
    }
    const connect = async () => {
      const signer = await getSigner();
      if (!signer) return null;
      const c = new ethers.Contract(
        MINT_CONTRACT_ADDRESS,
        DoWhatManNFT.abi,
        signer,
      );
      setContract(c);
    };
    connect();
  }, []);

  useEffect(() => {
    async function getContractBalance() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (provider) {
        const balance = await provider.getBalance(MINT_CONTRACT_ADDRESS);
        const contractBalanceWEI = ethers.BigNumber.from(balance).toString();
        const contractBalanceETH = ethers.utils.formatEther(contractBalanceWEI);
        setContractBalance(contractBalanceETH);
      }
    }
    getContractBalance();
  }, []);

  useEffect(() => {
    async function getOwnerOfContract() {
      if (!contract || !wallet) return;
      const owner: string = await contract.owner();
      setIsOwner(owner === wallet);
    }

    getOwnerOfContract();
  }, [contract, wallet]);

  useEffect(() => {
    async function checkIfRevealed() {
      if (!contract || !wallet) return;
      const revealed: boolean = await contract.revealed();
      setIsRevealed(revealed);
    }
    checkIfRevealed();
  }, [contract, wallet]);

  useEffect(() => {
    async function checkIfPaused() {
      if (!contract || !wallet) return;
      const paused: boolean = await contract.paused();
      setIsPaused(paused);
    }
    checkIfPaused();
  }, [contract, wallet]);

  const withdraw = async () => {
    if (!contract || !wallet) return;
    const withdrawFromContract = await contract.withdraw();
    console.log(withdrawFromContract);
  };

  const reveal = async () => {
    if (!contract || !wallet) return;
    const revealNFTs = await contract.reveal();
    await revealNFTs.wait();
    console.log(revealNFTs);
    setIsRevealed(true);
  };

  const pause = async () => {
    if (!contract || !wallet) return;
    const pauseSale = await contract.pause(!isPaused);
    await pauseSale.wait();
    setIsPaused(!isPaused);
  };

  return {
    contractBalance,
    contract,
    withdraw,
    isOwner,
    isRevealed,
    reveal,
    isPaused,
    pause,
  };
}
