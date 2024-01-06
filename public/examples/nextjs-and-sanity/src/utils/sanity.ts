// lib/sanity.ts
import { createClient } from '@sanity/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from '@sanity/image-url';

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || '';

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || '',
  apiVersion: '2023-12-26',
  useCdn: process.env.USE_CDN === 'true', // Assuming USE_CDN is a string representation of boolean
});

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
