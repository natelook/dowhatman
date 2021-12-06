import React, { useEffect } from 'react';
import Image from 'next/image';
import sanity, { urlFor } from '@lib/sanity';
import groq from 'groq';
import { motion, useAnimation } from 'framer-motion';

interface HomeProps {
  data: {
    _id: string;
    name: string;
    image: string;
  }[];
}

const fetcher = async () => await sanity.fetch(groq`*[_type == 'robsart']`);

const exitAnimation = {
  opacity: 0,
  y: -1000,
  transition: {
    duration: 0.2,
  },
};

export default function Home({ data }: HomeProps) {
  const introTextAnimation = useAnimation();
  const introImages = useAnimation();
  const subtitleAnimation = useAnimation();

  useEffect(() => {
    const animations = async () => {
      await introTextAnimation.start(i => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2 },
      }));
      await introImages.start(i => ({
        opacity: 1,
        x: 0,
        transition: { delay: i + 0.1 },
      }));
      await subtitleAnimation.start({ opacity: 1 });
    };

    animations();

    return introTextAnimation.stop;
  }, [introTextAnimation, subtitleAnimation, introImages]);
  return (
    <React.Fragment>
      <section className="h-screen grid grid-cols-2 items-center justify-center relative">
        <div className="bg-blue-600 h-full flex items-center ">
          <h1 className="text-9xl font-bold flex flex-col leading-none uppercase ml-10">
            <span>Do</span>
            <span>What</span>
            <span>Man!</span>
          </h1>
        </div>
        <div className="bg-gray-600 h-full relative flex items-center">
          <div className="h-full w-full">
            <ImagesFlex data={data} />
          </div>
        </div>
        {/* <ImagesGrid data={data} /> */}
      </section>
      <section className="bg-pink-300">
        <h1>Hello There</h1>
      </section>
    </React.Fragment>
  );
}

function ImagesFlex({ data }: { data: any }) {
  return (
    <div className="flex items-center h-full justify-center">
      <div className="grid grid-cols-3 gap-3">
        {data.map((item: any) => (
          <div key={item._id} className="">
            <Image
              src={`${urlFor(item.image).url()}`}
              height="150px"
              width="150px"
              alt={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ImagesGrid({ data }: { data: any }) {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center gap-5 px-5 w-full h-full">
      {data.map((item: any) => (
        <div key={item._id} className="w-full border shadow-md">
          <Image
            src={`${urlFor(item.image).url()}`}
            height="350px"
            width="350px"
            layout="responsive"
            alt={item.name}
          />
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const data = await fetcher();
  return { props: { data } };
}
