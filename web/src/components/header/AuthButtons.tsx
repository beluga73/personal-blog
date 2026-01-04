import Link from 'next/link';

import { UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const AuthButtons = () => {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Button variant="ghost" asChild className="hidden sm:inline-flex">
        <Link href="/auth/login">Sign In</Link>
      </Button>
      <Button asChild className="sm:inline-flex">
        <Link href="/auth/register" className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Up</span>
        </Link>
      </Button>
    </div>
  );
};
