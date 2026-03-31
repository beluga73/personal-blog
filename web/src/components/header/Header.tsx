import Link from 'next/link';
import { Suspense } from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { api } from '@/lib/api';
import { parseNavigation } from '@/lib/strapi-utils';

import { ThemeToggle } from './ThemeToggle';
import { UserMenuSkeleton } from './UserMenuSkeleton';
import { UserMenuWrapper } from './UserMenuWrapper';

export const Header = async () => {
  // Only fetch navigation statically
  let navItems: ReturnType<typeof parseNavigation> = [];
  try {
    const navData = await api.getHeader();
    navItems = parseNavigation(navData);
  } catch {}

  return (
    <header className="border-b px-2 py-2 sm:px-6 sm:py-3 flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.items ? (
                  <>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 w-fit">
                        {item.items.map((subItem) => (
                          <li key={subItem.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={subItem.path}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none whitespace-nowrap">
                                  {subItem.title}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.path}
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <ThemeToggle />
        <Suspense fallback={<UserMenuSkeleton />}>
          <UserMenuWrapper />
        </Suspense>
      </div>
    </header>
  );
};
