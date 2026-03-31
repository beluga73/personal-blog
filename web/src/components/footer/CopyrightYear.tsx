import { unstable_cache } from 'next/cache';

const getYear = unstable_cache(
  async () => new Date().getFullYear(),
  ['copyright-year'],
  { revalidate: 86400 } // Revalidate once a day (86400 seconds)
);

export const CopyrightYear = async () => {
  const year = await getYear();
  return <span>{year}</span>;
};
