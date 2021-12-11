import { FaDiscord, FaTwitter } from 'react-icons/fa';
import React, { useState } from 'react';
import Link from 'next/link';
import SlideOver from './SlideOver';
import Wallet from './Wallet';
import LogoText from '@components/LogoText';
import { useRouter } from 'next/router';

export default function Nav() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { pathname } = useRouter();

  return (
    <React.Fragment>
      <div className="bg-black  fixed w-full z-40 drop-shadow-lg">
        <div className="container mx-auto py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div onClick={() => setMenuOpen(true)}>
                <Hamburger />
              </div>
              {pathname !== '/' && (
                <Link href="/">
                  <a>
                    <h1 className="text-3xl mt-0.5 font-headings">
                      <LogoText />
                    </h1>
                  </a>
                </Link>
              )}
            </div>
            <div className="text-2xl flex space-x-5 items-center">
              <Link href="https://discord.gg/kBH8EV53CG">
                <a
                  className="hover:text-yellow transition-colors duration-200"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaDiscord />
                </a>
              </Link>
              <Link href="https://twitter.com/DO_WHAT_MAN">
                <a
                  className="hover:text-yellow transition-colors duration-200"
                  rel="noreferrer"
                  target="_blank"
                >
                  <FaTwitter />
                </a>
              </Link>
              <Wallet />
            </div>
          </div>
        </div>
      </div>
      <SlideOver
        open={isMenuOpen}
        setOpen={() => setMenuOpen(isMenuOpen ? false : true)}
      />
    </React.Fragment>
  );
}

function Hamburger() {
  return (
    <div className="h-10 w-10 flex items-center relative">
      <span className="w-full h-0.5 block bg-white -mt-5 absolute rounded-lg" />
      <span className="w-full h-0.5 block bg-white  absolute rounded-lg" />
      <span className="w-full h-0.5 block bg-white -mb-5 absolute rounded-lg" />
    </div>
  );
}
