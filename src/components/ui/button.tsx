import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { buttonVariants } from './button.variants';

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      ref={ref}
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...(props as any)}
    />
  );
});

Button.displayName = 'Button';

export { Button };
export type { VariantProps };
