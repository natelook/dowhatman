import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { useState } from 'react';
import Web3 from 'web3';

const navLinks = [
  {
    name: 'Home',
    slug: '/',
  },
  {
    name: 'Roadmap',
    slug: '/roadmap',
  },
];

export default function Nav() {
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>();
  const connectWallet = async () => {
    if (window.ethereum) {
      const wallet = await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      setWalletConnected(true);
      setWalletAddress(wallet.result[0]);
      return;
    }
  };
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between mb-3 mt-10">
        <Link href="/">
          <a>
            <div className="transform -rotate-12">
              <Image
                src="/DoWhatMan_logo.svg"
                height="100px"
                width="230px"
                alt="Do What Man Logo"
              />
            </div>
          </a>
        </Link>
        <ul className="font-bold text-xl tracking-wide  text-right">
          {navLinks.map(link => (
            <li key={link.slug}>
              <Link href={link.slug}>
                <a>{link.name}</a>
              </Link>
            </li>
          ))}
          <li
            className="flex items-center space-x-1 cursor-pointer"
            onClick={connectWallet}
          >
            <span
              className={classNames('h-3 w-3 rounded-full block', {
                'bg-red-500': !isWalletConnected,
                'bg-green-500': isWalletConnected,
              })}
            />
            <span className="">
              {isWalletConnected ? walletAddress : 'Connect Wallet'}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
