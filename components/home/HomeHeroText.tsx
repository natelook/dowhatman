import LogoText from '@components/LogoText';
import { motion } from 'framer-motion';
import { FaDiscord } from 'react-icons/fa';

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const children = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export default function HomeHeroText() {
  return (
    <div className="text-center">
      <motion.div
        variants={variants}
        className="text-green font-headings space-x-2 text-6xl"
      >
        <motion.span variants={children}>Do</motion.span>
        <motion.span variants={children}>What</motion.span>
        <motion.span variants={children}>Man!</motion.span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h3 className="text-4xl max-w-lg mx-auto">
          A collection to fulfill the needs and desires of others.
        </h3>
        <div className="flex justify-center mt-5">
          <a
            className="flex items-center space-x-1 text-lg font-bold bg-black border-yellow border text-yellow hover:bg-yellow hover:text-black transition-colors duration-300 uppercase  px-4 py-2 rounded-lg"
            rel="noreferrer"
            href="https://discord.gg/kBH8EV53CG"
            target="_blank"
          >
            <FaDiscord /> <span>Discord</span>
          </a>
        </div>
        <span className="uppercase text-xs block mt-2 text-center">
          Mint coming soon.
        </span>
      </motion.div>
    </div>
  );
}
