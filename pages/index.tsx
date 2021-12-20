import Image from 'next/image';
import { motion } from 'framer-motion';
import { HomeHeroText } from '@components/home';
import { useWeb3React } from '@web3-react/core';

export default function Home() {
  const { chainId, account } = useWeb3React();

  // console.log('Home Components', chainId, account);

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
                <Image
                  src="/images-grid.png"
                  height="600px"
                  width="598px"
                  alt="grid of images"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white text-black py-24">
        <div className="max-w-3xl mx-auto px-5">
          <h3 className="text-4xl md:text-7xl font-headings text-purple text-center">
            A Product of Need vs desire
          </h3>
          <div className="flex flex-col md:flex-row justify-between mt-5">
            <div className="md:block">
              <Image
                src="/deezy1_nobg.png"
                height="800px"
                width="800px"
                alt="Deezy"
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
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-5 md:px-0">
          <h3 className="text-4xl md:text-7xl text-yellow font-headings text-center">
            What is do what man!?
          </h3>
          <div className="flex flex-col justify-between md:flex-row">
            <div className="space-y-3 text-xl">
              <p>
                Do What Man! was a product of need vs desire. In 2021, Rob had a
                stroke. This affected his way of living drastically. He now has
                to relearn how to speak, walk, draw, write... everything. NFTs
                have now given Rob the opportunity to share and distribute his
                work in a way he was never able to in the past.
              </p>
              <p>
                The initial collection will launch with 1,000 NFTs which will
                grant you ownership to the Do What Man! DAO. This DAO will act
                as a governance to display and distribute the work of other
                artists who also have a need and a desire.
              </p>
            </div>
            <div className="">
              <Image
                src="/bear_nobg.png"
                height="800px"
                width="800px"
                alt="Bear"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const introVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
    },
  }),
};

function IntroDoWhatManAnimations({
  animationOver,
}: {
  animationOver: (isOver: boolean) => void;
}) {
  return (
    <div className="flex flex-col">
      <motion.span
        variants={introVariants}
        initial="hidden"
        animate="visible"
        custom={0}
        className="text-blue font-headings text-9xl "
      >
        DO WHAT MAN!
      </motion.span>
      <motion.span
        variants={introVariants}
        initial="hidden"
        animate="visible"
        custom={1}
        className="text-yellow font-headings text-9xl "
      >
        DO WHAT MAN!
      </motion.span>
      <motion.span
        variants={introVariants}
        initial="hidden"
        animate="visible"
        custom={2}
        className="text-pink font-headings text-9xl "
      >
        DO WHAT MAN!
      </motion.span>
      <motion.span
        variants={introVariants}
        initial="hidden"
        animate="visible"
        custom={3}
        className="text-green font-headings text-9xl "
      >
        DO WHAT MAN!
      </motion.span>
      <motion.span
        variants={introVariants}
        initial="hidden"
        animate="visible"
        custom={4}
        className="text-purple font-headings text-9xl"
        onAnimationComplete={() => animationOver(true)}
      >
        DO WHAT MAN!
      </motion.span>
    </div>
  );
}
