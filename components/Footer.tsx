import { FaTwitter, FaDiscord } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-5">
      <div className="container mx-auto py-10 grid grid-cols-3 place-items-center text-base">
        <div className="text-base flex justify-center items-center space-x-5">
          <Link href="/">
            <a className="footer-link">Home</a>
          </Link>
          <Link href="/whitepaper">
            <a className="footer-link">Whitepaper</a>
          </Link>
          <Link href="https://twitter.com/DO_WHAT_MAN">
            <a className="footer-link">
              <FaTwitter />
            </a>
          </Link>
          <Link href="https://discord.gg/kBH8EV53CG">
            <a className="footer-link">
              <FaDiscord />
            </a>
          </Link>
        </div>
        <p className="text-center uppercase text-sm">
          &copy; 2021 Do What Man!
        </p>
        <p>
          Built by{' '}
          <Link href="https://natelook.com">
            <a className="text-green">natelook.eth</a>
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
