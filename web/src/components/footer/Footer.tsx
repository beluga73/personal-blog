import Link from 'next/link';

import { Linkedin, Mail } from 'lucide-react';

import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { api } from '@/lib/api';
import { parseNavigation } from '@/lib/strapi-utils';

import { CopyrightYear } from './CopyrightYear';

export const Footer = async () => {
  let navItems: ReturnType<typeof parseNavigation> = [];
  try {
    const navData = await api.getFooter();
    navItems = parseNavigation(navData);
  } catch (error) {
    console.error('Failed to fetch footer navigation:', error);
  }

  return (
    <footer className="border-t py-12 mt-auto bg-background">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {navItems.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-lg mb-6">{section.title}</h3>
              {section.items && section.items.length > 0 ? (
                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.path}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : section.title === 'Connect' ? (
                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                    asChild
                  >
                    <Link
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="size-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                    asChild
                  >
                    <Link href="mailto:example@gmail.com" aria-label="Gmail">
                      <Mail className="size-5" />
                    </Link>
                  </Button>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © <CopyrightYear /> Violet. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};
