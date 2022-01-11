import nftContract from '@lib/nft-contract';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface NFTProps {
  title: string;
  image: string;
  description: string;
}

export default function LookUpPage() {
  const [tokenURI, setTokenURI] = useState<null | string>();
  const [lookUpID, setLookUpID] = useState('');
  const [nft, setNFT] = useState<NFTProps | null>();

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    try {
      const theTokenURI: string = await nftContract().tokenURI(1);
      setTokenURI(theTokenURI);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  useEffect(() => {
    async function lookUpNft() {
      if (typeof tokenURI !== 'string') return;
      const { data } = await axios.get(tokenURI);
      setNFT(data);
    }
    lookUpNft();
  }, [tokenURI]);
  return (
    <main className="min-h-screen">
      <h1>Look Up</h1>
      {!nft ? (
        <form className="text-black max-w-md" onSubmit={handleLookup}>
          <div className="mb-2">
            <input
              type="number"
              value={lookUpID}
              placeholder="Token Id..."
              className="px-2 py-1 outline-none border-grayText border-4 rounded w-full"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLookUpID(e.target.value)
              }
            />
          </div>
          <button className="font-headings bg-green text-black px-3 py-1 rounded">
            Look Up
          </button>
        </form>
      ) : (
        <div>
          <Image src={nft.image} height="300px" width="300px" alt={nft.title} />
          <h2 className="">{nft.title}</h2>
          <p>{nft.description}</p>
        </div>
      )}
    </main>
  );
}
