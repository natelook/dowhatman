import Accordion from '@components/Accordion';
import Image from 'next/image';
import sanity from '@lib/sanity';
import { PortableTextEntry } from '@sanity/block-content-to-react';
import { AnimateSharedLayout, motion } from 'framer-motion';
import groq from 'groq';
import { useState } from 'react';

interface FAQProps {
  allFAQs: { _key: string; title: string; body?: PortableTextEntry[] }[];
}

interface FAQPageProps {
  faqs: FAQProps;
}

export default function FAQPage({ faqs }: FAQPageProps) {
  const [expanded, setExpanded] = useState<false | string>(false);
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between items-center md:items-start">
        <h1 className="max-w-xs md:max-w-max pt-2 mb-10 text-yellow">
          Frequently Asked Questions
        </h1>
        <div className="absolute right-0 md:relative w-40 md:w-96 ">
          <Image
            src="/deezy1_nobg.png"
            height="200px"
            width="200px"
            alt="Deezy"
            layout="responsive"
            priority
          />
        </div>
      </div>
      {faqs.allFAQs.map(faq => (
        <Accordion
          key={faq._key}
          i={faq._key}
          expanded={expanded}
          setExpanded={setExpanded}
          faq={faq}
        />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const faqs = await sanity.fetch(groq`*[_type == 'faq'][0] {
    allFAQs
  }`);
  return { props: { faqs } };
}
