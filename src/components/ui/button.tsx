import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import styles from './button.module.scss';

const buttonVariants = cva(styles.buttonBase, {
  variants: {
    variant: {
      default: styles.variantDefault,
      destructive: styles.variantDestructive,
      outline: styles.variantOutline,
      secondary: styles.variantSecondary,
      ghost: styles.variantGhost,
      link: styles.variantLink
    },
    size: {
      default: styles.sizeDefault,
      sm: styles.sizeSm,
      lg: styles.sizeLg,
      icon: styles.sizeIcon
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

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

export { Button, buttonVariants };
