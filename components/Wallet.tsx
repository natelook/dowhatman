import useENSName from '@hooks/useENSName';
import requestAccount from '@lib/request-account';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { shortenHex } from 'utils';
import { walletState } from './state';

export default function Wallet() {
  const [wallet, setWallet] = useRecoilState(walletState);
  const ENSName = useENSName(wallet);

  async function connectWallet() {
    if (typeof window.ethereum === undefined) return;

    if (window.ethereum.networkVersion !== 1)
      alert(
        `You are not on mainet. You are on ${window.ethereum.networkVersion}`,
      );
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    console.log(accounts);
    if (!accounts) return;
    setWallet(accounts[0]);
  }

  if (!wallet) {
    return (
      <button onClick={connectWallet} className="wallet-button">
        Connect Wallet
      </button>
    );
  }

  return (
    <a className="wallet-button bg-yellow text-black cursor-default">
      {ENSName ? ENSName : shortenHex(wallet)}
    </a>
  );
}
