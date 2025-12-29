import React, { FC } from 'react';

import { cn } from '@/lib/utils';

/**
 * A lightweight, responsive Container component similar to MUI's Container.
 * Centers content and applies horizontal padding. Use `size` for max-width.
 */
export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const Container: FC<ContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[min(1400px,90vw)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
