import Image from 'next/image';
import { motion } from 'framer-motion';
import { HomeHeroText } from '@components/home';
import sanity, { PortableText } from '@lib/sanity';
import groq from 'groq';
import { PortableTextEntry } from '@sanity/block-content-to-react';

interface FAQProps {
  _key: string;
  title: string;
  body: PortableTextEntry[];
}

export default function Home({ faq }: { faq: FAQProps }) {
  return (
    <main>
      <section>
        <div className="md:h-screen flex items-center">
          <div className="container">
            <div className="flex flex-col md:flex-row pt-24 md:p-0 justify-center items-center md:space-x-32 pb-10">
              <HomeHeroText />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: -20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="hidden md:block"
              >
                <motion.div
                  initial={{ y: -10 }}
                  animate={{ y: 10 }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    repeatType: 'reverse',
                  }}
                >
                  <Image
                    src="/deezy1_nobg.png"
                    height="600px"
                    width="600px"
                    alt="deezy"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-black py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'all' }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto px-5"
        >
          <h3 className="text-4xl md:text-6xl font-headings text-purple text-center">
            A Product of Need vs desire
          </h3>
          <div className="flex flex-col md:flex-row justify-between mt-5">
            <div className="md:block">
              <Image
                src="/bear_nobg.png"
                height="600px"
                width="600px"
                alt="Bear created by Rob."
              />
            </div>
            <div className="space-y-3 text-grayText text-xl">
              <p>
                “My need was to have a platform to share my work with others. My
                desire is to have my work shown and appreciated.
              </p>
              <p>
                Do What Man! is for all people not knowing how you get an image
                from your head to the pages below.
              </p>
              <p>
                Do What Man! from the guy who had a stroke, now is saying
                &quot;do what man!&quot;”
              </p>
              <div className=" float-right">
                <span className="font-headings text-right text-black">
                  - Rob, Creator of Do What Man!
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      <section>
        <div className="max-w-3xl mx-auto px-5 py-10">
          <h3 className="text-4xl md:text-7xl text-green text-center">
            THE NFTs
          </h3>
        </div>
        <motion.div
          variants={{
            open: {
              transition: { staggerChildren: 0.07, delayChildren: 0.2 },
            },
          }}
          initial="closed"
          whileInView="open"
          className="flex justify-evenly"
        >
          {[1, 2, 3, 4, 5].map(i => (
            <NFT key={i} index={i} />
          ))}
        </motion.div>
      </section>

      <section className="py-24">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'all' }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="max-w-3xl mx-auto px-5 md:px-0"
        >
          <h3 className="text-4xl md:text-7xl text-yellow font-headings text-center mb-5">
            What is do what man!?
          </h3>
          <div className="">
            <div className="space-y-3 text-xl prose">
              <PortableText blocks={faq.body} />
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function NFT({ index }: { index: number }) {
  return (
    <motion.div
      className="relative"
      whileHover={{
        scale: 1.1,
        zIndex: 10,
        transition: { duration: 0.3, delay: 0.2 },
      }}
      viewport={{ once: true, amount: 'all' }}
      variants={{
        open: {
          opacity: 1,
          y: 0,
        },
        closed: {
          opacity: 0,
          y: -50,
        },
      }}
    >
      <Image
        src={`/nfts/${index}.png`}
        height="300px"
        width="300px"
        alt="test"
      />
    </motion.div>
  );
}

export async function getStaticProps() {
  const faq = await sanity.fetch(groq`*[_type == 'faq'][0] {
    allFAQs
  }`);
  return { props: { faq: faq.allFAQs[0] } };
}
