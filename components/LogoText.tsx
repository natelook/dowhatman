import { motion } from 'framer-motion';

export default function LogoText() {
  return (
    <motion.span
      animate={{
        color: ['#00BBF9', '#FEE440', '#F15BB5', '#00F5D4', '#9B5DE5'],
      }}
      transition={{
        duration: 20,
        delay: 0.5,
        repeat: Infinity,
        repeatType: 'mirror',
      }}
      layoutId="logo-text"
    >
      DO WHAT MAN!
    </motion.span>
  );
}
