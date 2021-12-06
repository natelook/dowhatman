import sanity from '@lib/sanity';
import groq from 'groq';
import { GetServerSidePropsContext } from 'next';
// @ts-ignore
import BlockContent from '@sanity/block-content-to-react';
import dayjs from 'dayjs';

export interface PostProps {
  _id: string;
  title: string;
  slug: string;
  body: string;
  publishedAt: Date;
}

interface PageProps {
  post: PostProps;
}

export default function ArticlePage({ post }: PageProps) {
  return (
    <article className="pt-24 max-w-3xl mx-auto">
      <div className="mb-10">
        <h1 className="text-6xl font-headings text-blue ">{post.title}</h1>
        <span className="text-grayText uppercase tracking-wider">
          {dayjs(post.publishedAt).format('MMMM DD, YYYY')}
        </span>
      </div>
      <div className="prose">
        <BlockContent blocks={post.body} />
      </div>
    </article>
  );
}

export async function getStaticPaths() {
  const posts = await sanity.fetch(groq`*[_type == 'post'] {
    "slug": slug.current
  }`);
  const paths = posts.map((post: { slug: string }) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetServerSidePropsContext) {
  const post = await sanity.fetch(
    groq`*[_type == 'post' && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      body,
      publishedAt
    }`,
    { slug: params?.slug },
  );
  return { props: { post } };
}
