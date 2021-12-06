import { FaDiscord, FaTwitter } from 'react-icons/fa';
import React, { useState } from 'react';
import Link from 'next/link';
import SlideOver from './SlideOver';

export default function Nav() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <React.Fragment>
      <div className="bg-black  fixed w-full z-40 drop-shadow-lg">
        <div className="container mx-auto py-2">
          <div className="flex justify-between items-center">
            <div onClick={() => setMenuOpen(true)}>
              <Hamburger />
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
              <button className="bg-black border border-yellow text-yellow uppercase font-bold  text-sm rounded-md px-4 py-1 hover:text-black hover:bg-yellow transition duration-200">
                Connect Wallet
              </button>
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
