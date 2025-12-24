import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getStrapiMedia } from '@/lib/strapi-utils';
import { StrapiMedia } from '@/types/strapi-utils';

describe('getStrapiMedia', () => {
  const mockBaseUrl = 'http://localhost:1337';

  beforeEach(() => {
    // Mock the environment variable
    vi.stubEnv('NEXT_PUBLIC_STRAPI_URL', mockBaseUrl);
  });

  const mockMedia = {
    url: '/uploads/default.png',
    formats: {
      thumbnail: { url: '/uploads/thumbnail.png' },
      small: { url: '/uploads/small.png' },
    },
  } as unknown as StrapiMedia;

  it('should return the full URL using the default media URL when no format is specified', () => {
    const result = getStrapiMedia(mockMedia);
    expect(result).toBe(`${mockBaseUrl}/uploads/default.png`);
  });

  it('should return the full URL for a preferred format if it exists', () => {
    const result = getStrapiMedia(mockMedia, 'small');
    expect(result).toBe(`${mockBaseUrl}/uploads/small.png`);
  });

  it('should fallback to the default URL if the preferred format does not exist', () => {
    const result = getStrapiMedia(mockMedia, 'large');
    expect(result).toBe(`${mockBaseUrl}/uploads/default.png`);
  });

  it('should fallback to the default URL if formats object is missing', () => {
    const mediaWithoutFormats = { url: '/uploads/default.png' } as StrapiMedia;
    const result = getStrapiMedia(mediaWithoutFormats, 'small');
    expect(result).toBe(`${mockBaseUrl}/uploads/default.png`);
  });
});
