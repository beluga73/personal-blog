'use client';

import { useEffect, useState } from 'react';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch — render a visually hidden button placeholder
    return (
      <Button aria-hidden data-variant="ghost" data-size="icon">
        <Sun size={16} />
      </Button>
    );
  }

  const current = resolvedTheme || theme || 'light';
  const isDark = current === 'dark';

  return (
    <Button
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      data-variant="ghost"
      size="icon-lg"
      data-size="icon"
    >
      {isDark ? <Moon size={16} /> : <Sun size={16} />}
    </Button>
  );
}
