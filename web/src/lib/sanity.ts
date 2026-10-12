import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url'; // Sử dụng named export

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
  useCdn: true, 
});

// Dùng createImageUrlBuilder thay cho imageUrlBuilder cũ
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}