import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdExpandMore } from 'react-icons/md';
import cn from 'classnames';
import { PortableText } from '@lib/sanity';
import { PortableTextEntry } from '@sanity/block-content-to-react';

interface AccordionProps {
  i: string;
  faq: { title: string; body?: PortableTextEntry[] };
  expanded: false | string;
  setExpanded: (index: false | string) => void;
}

export default function Accordion({
  i,
  faq,
  expanded,
  setExpanded,
}: AccordionProps) {
  const isOpen = i === expanded;
  return (
    <React.Fragment>
      <motion.div
        onClick={() => setExpanded(isOpen ? false : i)}
        className={cn(
          'cursor-pointer select-none border border-green  px-5 py-3 rounded flex justify-between items-center hover:bg-green hover:text-black transition-colors duration-300 mb-8 relative z-10',
          {
            'bg-black text-white': !isOpen,
            'bg-green text-black': isOpen,
          },
        )}
      >
        <span className="leading-none text-3xl font-bold font-headings">
          {faq.title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ power: 9000 }}
          className={cn('text-4xl')}
        >
          <MdExpandMore />
        </motion.span>
      </motion.div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto', marginBottom: '30px' },
              collapsed: { opacity: 0, height: 0, marginBottom: '0px' },
            }}
            className="px-10 text-lg"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {faq.body ? (
              <PortableText blocks={faq.body} />
            ) : (
              'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat dignissimos aut eligendi iste natus recusandae expedita voluptas. Saepe, eum, nam, veniam nulla sint suscipit voluptates alias optio incidunt et rem!'
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
