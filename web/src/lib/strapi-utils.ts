import type { StrapiMedia } from '@/types/strapi-utils';

/**
 * Helper to get the full Strapi URL for media/assets
 */
export function getStrapiMedia(
  media: StrapiMedia,
  preferredFormat?: 'large' | 'medium' | 'small' | 'thumbnail'
) {
  const formats = media.formats;
  const url =
    preferredFormat && formats?.[preferredFormat]?.url
      ? formats[preferredFormat].url
      : media.url;

  // if (!url) return null;
  // if (url.startsWith('http') || url.startsWith('//')) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}
