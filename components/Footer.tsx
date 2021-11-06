import { FaTwitter, FaDiscord } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-5">
      <div className="max-w-5xl mx-auto py-10">
        <p className="text-center mb-5">&copy; 2021 builtbynate</p>
        <div className="text-3xl flex justify-center space-x-5">
          <Link href="https://twitter.com/DO_WHAT_MAN">
            <a className="hover:text-blue-400 transition-colors duration-200">
              <FaTwitter />
            </a>
          </Link>
          <Link href="https://discord.gg/kBH8EV53CG">
            <a className="hover:text-blue-700 transition-colors duration-200">
              <FaDiscord />
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
