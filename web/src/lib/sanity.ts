import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url'; // Sử dụng named export

export const sanityClient = createClient({
  projectId: 'oeqzzve8',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-01',
});

// Dùng createImageUrlBuilder thay cho imageUrlBuilder cũ
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}