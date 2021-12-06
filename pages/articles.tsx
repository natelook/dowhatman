import sanity from '@lib/sanity';
import dayjs from 'dayjs';
import groq from 'groq';
import { PostProps } from './[slug]';
import Link from 'next/link';

export default function ArticlesPage({ posts }: { posts: PostProps[] }) {
  return (
    <div className="pt-24 max-w-3xl mx-auto">
      <h1 className="font-headings text-6xl mb-10 text-pink">Articles</h1>
      {posts.map(post => (
        <Post
          title={post.title}
          publishedAt={post.publishedAt}
          key={post._id}
          slug={post.slug}
        />
      ))}
    </div>
  );
}

function Post({
  title,
  publishedAt,
  slug,
}: {
  title: string;
  publishedAt: Date;
  slug: string;
}) {
  return (
    <Link href={slug}>
      <a>
        <div>
          <h2 className="text-4xl font-headings">{title}</h2>
          <span className="uppercase text-sm text-grayText">
            {dayjs(publishedAt).format('MMMM DD, YYYY')}
          </span>
        </div>
      </a>
    </Link>
  );
}

export async function getStaticProps() {
  const posts = await sanity.fetch(groq`*[_type == 'post'] {
    title,
    publishedAt,
    _id,
    "slug": slug.current
  }`);
  return { props: { posts } };
}
