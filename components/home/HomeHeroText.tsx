import { motion } from 'framer-motion';
import { FaDiscord } from 'react-icons/fa';

export default function HomeHeroText() {
  return (
    <div className="text-center">
      <motion.span
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-green font-headings text-9xl "
        layoutId="homeHeading"
      >
        DO WHAT MAN!
      </motion.span>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h3 className="text-3xl max-w-lg mx-auto">
          A collection to fulfill the needs and desires of other people.
        </h3>
        <div className="flex justify-center mt-5">
          <a
            className="flex items-center space-x-1 text-xl bg-purple px-4 py-2 rounded-lg"
            rel="noreferrer"
            href="https://discord.gg/kBH8EV53CG"
            target="_blank"
          >
            <FaDiscord /> <span>Join the Discord</span>
          </a>
        </div>
        <span className="uppercase text-xs block mt-2 text-center">
          Mint coming soon.
        </span>
      </motion.div>
    </div>
  );
}
