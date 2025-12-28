import Link from 'next/link';

import { Home } from 'lucide-react';

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';

export default function Custom404() {
  return (
    <Container className="flex min-h-screen flex-col items-center justify-center text-center">
      <div className="space-y-4">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Page Not Found
        </h2>
        <p className="mx-auto max-w-md text-base leading-7 text-muted-foreground">
          Looks like you&apos;ve wandered into uncharted territory.
          <br />
          Let&apos;s get you back on track.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="size-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
