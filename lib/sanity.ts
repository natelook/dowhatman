import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const config = {
  projectId: '500giqho',
  dataset: 'production',
  apiVersion: '2021-03-25',
  useCdn: process.env.NODE_ENV !== 'production' ? false : true,
};

const builder = imageUrlBuilder(config);

export function urlFor(source: any) {
  return builder.image(source);
}

const sanity = sanityClient(config);

export default sanity;
