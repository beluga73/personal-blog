import type {
  NavItem,
  StrapiMedia,
  StrapiNavigationItem,
  StrapiNavigationResponse,
} from '@/types/strapi-utils';

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

/**
 * Parses Strapi Navigation RFR response into a nested tree structure
 */
export function parseNavigation(data: StrapiNavigationResponse): NavItem[] {
  const itemsMap: Record<string, NavItem> = {};

  // First pass: create all items
  Object.entries(data.pages).forEach(([key, page]) => {
    itemsMap[key] = {
      title: page.title,
      path: page.path,
      items: [],
    };
  });

  // Second pass: build the tree by assigning children to parents
  Object.entries(data.pages).forEach(([key, page]) => {
    const item = itemsMap[key];
    if (page.parent && itemsMap[page.parent]) {
      itemsMap[page.parent].items?.push(item);
    }
  });

  // Determine roots: use nav.root if available, otherwise items without parents
  let roots: NavItem[];
  if (data.nav.root && data.nav.root.length > 0) {
    // Use the ordered root items from nav.root
    roots = data.nav.root.map((id) => itemsMap[id]).filter(Boolean);
  } else {
    // Fallback: find items that weren't assigned to any parent
    roots = Object.entries(data.pages)
      .filter(([key, page]) => !page.parent)
      .map(([key]) => itemsMap[key]);
  }

  // Clean up empty items arrays
  const cleanItems = (items: NavItem[]): NavItem[] => {
    return items.map((item) => {
      const cleaned: NavItem = { title: item.title, path: item.path };
      if (item.items && item.items.length > 0) {
        cleaned.items = cleanItems(item.items);
      }
      return cleaned;
    });
  };

  return cleanItems(roots);
}
