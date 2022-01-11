import sanity, { PortableText } from '@lib/sanity';
import { PortableTextEntry } from '@sanity/block-content-to-react';
import groq from 'groq';

export interface PostProps {
  _id: string;
  title: string;
  slug: string;
  body: PortableTextEntry[];
  publishedAt: Date;
}

interface Props {
  story: PostProps;
}

export default function WhitePaperPage({ story }: Props) {
  return (
    <div className="py-24 max-w-3xl mx-auto">
      <h1 className="text-6xl font-headings text-purple">
        Do What Man! The Genesis Collection - Story
      </h1>

      <div className="prose">
        <PortableText blocks={story.body} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const story = await sanity.fetch(
    groq`*[_type == 'post' && slug.current == 'story'][0]`,
  );
  return { props: { story } };
}
