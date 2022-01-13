import useWallet from '@hooks/useWallet';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import DoWhatManNFT from '../artifacts/contracts/DoWhatManNFT.sol/DoWhatManNFT.json';
import MintUI from '@components/mint/mint-ui';

import { shortenHex } from 'utils';
import Image from 'next/image';
import useContract from '@hooks/useContract';
import Link from 'next/link';

const MINT_CONTRACT_ADDRESS = process.env.CONTRACT!;

export default function MintPage() {
  const [isMinting, setMinting] = useState(false);
  const [mintAmount, setMintAmount] = useState(0);
  const [transactionHash, setTransactionHash] = useState<
    string | null | undefined
  >();
  const { ENSName, wallet, connectWallet, getSigner } = useWallet();
  const { isPaused } = useContract();

  async function mint() {
    const price = 0.03;
    if (!mintAmount) return;
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
    const tx: { value: ethers.BigNumber } = {
      value: ethers.utils.parseEther(`${amount * price}`),
    };
    const transaction = await contract.mint(amount, tx);

    console.log('After Transaction');
    const tdata = await transaction.wait();
    console.log({ tdata });
    setTransactionHash(tdata.transactionHash);
    setMinting(false);
  }

  return (
    <main>
      <div className="flex justify-between">
        <div className="mb-10">
          <h1 className="text-yellow">Mint</h1>
          <a
            href={`https://etherscan.io/address/${process.env.CONTRACT}`}
            rel="noreferrer"
            target="_blank"
            className="block text-sm uppercase font-bold tracking-wider transition duration-200 hover:text-blue"
          >
            View Contract
          </a>
        </div>
        {wallet && (
          <Image
            src="/bear_nobg.png"
            height="200px"
            width="200px"
            alt="bear"
            priority
          />
        )}
      </div>
      <div className="mb-5">
        <p>
          Mint will begin on January 13th at 2 pm PST. The cost of mint will be
          .04 ETH. If you have any questions please visit our{' '}
          <Link href="/faq">
            <a className="text-green">FAQ</a>
          </Link>{' '}
          page or read the{' '}
          <Link href="/story">
            <a className="text-green">story</a>
          </Link>
          .
        </p>
      </div>
      <div className="flex space-x-5">
        {!wallet ? (
          <div className="text-center flex w-full">
            <button
              className="wallet-button"
              disabled
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
            {!isPaused ? (
              <MintUI
                setMintAmount={setMintAmount}
                mintAmount={mintAmount}
                mint={mint}
                isMinting={isMinting}
                transactionHash={transactionHash}
              />
            ) : (
              <div className="text-center space-y-5 mt-5">
                <p>Mint is not live.</p>
                <p>
                  Follow us on{' '}
                  <Link href="https://twitter.com/do_what_man">
                    <a className="text-green">Twitter</a>
                  </Link>{' '}
                  for updates
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
