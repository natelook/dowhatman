import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
import { FaTwitter, FaDiscord } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <link href="/favicon.ico" rel="icon" />
        <title>DO WHAT MAN! NFT Collection</title>
      </Head>
      <div className="flex h-screen w-screen justify-center items-center bg-black">
        <div>
          <div className="flex justify-center mb-3">
            <Image
              src="/DoWhatMan_logo.svg"
              height="100px"
              width="230"
              alt="hello"
            />
          </div>
          <p className="text-white text-xl text-center font-bold tracking-widest uppercase">
            NFT Collection Coming Soon
          </p>
          <div className="text-white text-3xl flex mt-5 justify-center space-x-5">
            <Link href="https://twitter.com/DO_WHAT_MAN">
              <a>
                <FaTwitter />
              </a>
            </Link>
            <Link href="https://discord.gg/kBH8EV53CG">
              <a>
                <FaDiscord />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
