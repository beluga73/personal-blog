import { User } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const UserMenuSkeleton = () => {
  return (
    <Button variant="ghost" className="flex items-center gap-2">
      <User className="h-4 w-4" />
      <span className="hidden sm:inline w-20 h-4 bg-muted animate-pulse rounded" />
    </Button>
  );
};
