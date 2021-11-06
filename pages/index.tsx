import React from 'react';
import Image from 'next/image';
import sanity, { urlFor } from '@lib/sanity';
import groq from 'groq';

interface HomeProps {
  data: {
    _id: string;
    name: string;
    image: string;
  }[];
}

const fetcher = async () => await sanity.fetch(groq`*[_type == 'robsart']`);

export default function Home({ data }: HomeProps) {
  return (
    <React.Fragment>
      <section className="max-w-5xl mx-auto my-20">
        <h2 className="text-3xl text-center font-bold tracking-widest uppercase mb-10">
          NFT Collection Coming Soon
        </h2>
        <div className="grid grid-cols-3 place-items-center gap-5">
          {data.map(item => (
            <div key={item._id} className="w-full border">
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
      </section>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const data = await fetcher();
  return { props: { data } };
}
