import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { navLinks } from './Nav';

export default function SlideOver({
  isOpen,
  setMenuClosed,
}: {
  isOpen: boolean;
  setMenuClosed: (closed: false) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            variants={{
              open: { y: 0 },
              closed: { y: -230 },
            }}
            initial={'closed'}
            animate={'open'}
            exit={'closed'}
            transition={{
              type: 'spring',

              duration: 0.5,
            }}
            className="fixed z-40 w-full bg-black top-0 pt-16 px-5 space-y-3 pb-5 rounded-b"
          >
            {navLinks.map(link => (
              <div key={link.slug}>
                <Link href={link.slug}>
                  <a className="text-2xl font-headings">{link.name}</a>
                </Link>
              </div>
            ))}
            <div className="flex space-x-4 text-2xl">
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
            </div>
          </motion.div>
          <div onClick={() => setMenuClosed(false)}>
            <Overlay />
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}

function Overlay() {
  return (
    <motion.div
      initial={'closed'}
      exit={'closed'}
      animate={'open'}
      variants={{
        open: { opacity: 0.7 },
        closed: { opacity: 0 },
      }}
      className="bg-black fixed h-screen w-screen z-30"
    />
  );
}
