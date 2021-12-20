import { FaDiscord, FaTwitter } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SlideOver from './SlideOver';
import LogoText from '@components/LogoText';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export const navLinks = [
  {
    name: 'Home',
    slug: '/',
  },
  {
    name: 'Mint',
    slug: '/mint',
  },
  {
    name: 'Whitepaper',
    slug: '/whitepaper',
  },
  {
    name: 'FAQ',
    slug: '/faq',
  },
];

export default function Nav() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { events } = useRouter();

  useEffect(() => {
    events.on('routeChangeStart', () => setMenuOpen(false));
  }, [events]);

  return (
    <React.Fragment>
      <div className="bg-black fixed w-full z-50 drop-shadow-lg px-5 md:p-0">
        <div className="container max-w-5xl mx-auto py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <a className="text-4xl mt-0.5 font-headings">
                  <LogoText />
                </a>
              </Link>
            </div>
            <button
              className="block md:hidden"
              onClick={() => setMenuOpen(isMenuOpen ? false : true)}
            >
              <Hamburger isOpen={isMenuOpen} />
            </button>
            <NavLinks />
          </div>
        </div>
      </div>

      <SlideOver isOpen={isMenuOpen} setMenuClosed={setMenuOpen} />
    </React.Fragment>
  );
}

function Hamburger({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="h-10 w-10 flex items-center relative">
      <motion.span
        animate={{
          rotate: isOpen ? 45 : 0,
          margin: isOpen ? '0px' : undefined,
        }}
        className="w-full h-0.5 block bg-white -mt-5 absolute rounded-lg"
      />
      <motion.span
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.1 }}
        className="w-full h-0.5 block bg-white  absolute rounded-lg"
      />
      <motion.span
        animate={{
          rotate: isOpen ? -45 : 0,
          margin: isOpen ? '0px' : undefined,
        }}
        className="w-full h-0.5 block bg-white -mb-5 absolute rounded-lg"
      />
    </div>
  );
}

function NavLinks() {
  return (
    <ul className="md:flex space-x-6 font-headings text-xl items-center hidden">
      {navLinks.map(link => (
        <li key={link.slug}>
          <Link href={link.slug}>
            <a className="hover:text-green">{link.name}</a>
          </Link>
        </li>
      ))}
      <li>
        <Link href="https://discord.gg/kBH8EV53CG">
          <a
            className="hover:text-yellow transition-colors duration-200"
            target="_blank"
            rel="noreferrer"
          >
            <FaDiscord />
          </a>
        </Link>
      </li>
      <li>
        <Link href="https://twitter.com/DO_WHAT_MAN">
          <a
            className="hover:text-yellow transition-colors duration-200"
            rel="noreferrer"
            target="_blank"
          >
            <FaTwitter />
          </a>
        </Link>
      </li>
    </ul>
  );
}
