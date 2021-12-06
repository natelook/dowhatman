import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { FaDiscord } from 'react-icons/fa';

const sleep = async (delay: number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};

export default function Home() {
  const [isAnimationOver, setIsAnimationOver] = useState(false);
  const [allAnimationsDone, setAllAnimationsDone] = useState(false);
  const headingImage = useAnimation();

  useEffect(() => {
    if (isAnimationOver) {
      // setAllAnimationsDone(true);
    }
  }, [headingImage, isAnimationOver]);
  return (
    <main>
      <section>
        <div className="h-screen flex items-center">
          <div className="container">
            <div className="flex justify-center items-center space-x-32">
              <AnimatePresence>
                {allAnimationsDone ? (
                  <HomeHeroText />
                ) : (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    layout
                  >
                    <IntroDoWhatManAnimations
                      animationOver={(over: boolean) =>
                        setIsAnimationOver(over)
                      }
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isAnimationOver && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: -20 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    onAnimationComplete={async () => {
                      console.log('animation over');
                      await sleep(1000);
                      setAllAnimationsDone(true);
                    }}
                    // onAnimationEnd={}
                  >
                    <Image
                      src="/images-grid.png"
                      height="600px"
                      width="598px"
                      alt="grid of images"
                      priority
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white text-black py-24">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-7xl font-headings text-purple text-center">
            A Product of Need vs desire
          </h3>
          <div className="flex justify-between mt-5">
            <div>
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
      <section>
        <div className="max-w-3xl mx-auto py-24 text-xl">
          <h3 className="text-7xl text-yellow font-headings text-center">
            What is do what man!
          </h3>
          <div className="flex justify-bewtween mt-5">
            <div className="space-y-3">
              <p>
                Do What Man! was a product of need vs desire. in 2021, Rob had a
                stroke. This affected his way of living drastically. He now has
                to relearn how to speak, walk, draw, write... everything. NFTs
                have now given Rob the opportunity to share and distrubute his
                work in a way he was never able to in the past.
              </p>
              <p>
                The initial collection will launch with 1,000 NFTs which will
                grant you ownership to the Do What Man! DAO. This DAO will act
                as a governance to display and distrubte the work of other
                artists who also have a need and a desire.
              </p>
            </div>
            <div>
              <Image
                src="/bear_nobg.png"
                height="800px"
                width="800px"
                alt="Deezy"
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

function HomeHeroText() {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-green font-headings text-9xl "
        layoutId="homeHeading"
      >
        DO WHAT MAN!
      </motion.span>
      <div>
        <h3 className="text-3xl max-w-lg mx-auto">
          A collection to fulfill the needs and desires of other people.
        </h3>
        <div className="flex justify-center mt-5">
          <a className="flex items-center space-x-1 text-xl bg-purple px-4 py-2 rounded-lg">
            <FaDiscord /> <span>Join the Discord</span>
          </a>
        </div>
        <span className="uppercase text-xs block mt-2 text-center">
          Mint coming soon.
        </span>
      </div>
    </motion.div>
  );
}
