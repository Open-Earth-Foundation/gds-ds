import { Button as BaseButton } from '@base-ui/react/button';
import type { ComponentProps, ReactNode } from 'react';
import { join } from '../../utils';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ComponentProps<typeof BaseButton>, 'className'> {
  /** Visual weight. Default `primary`; one primary per view (principle 7). */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon before the label. */
  iconStart?: ReactNode;
  /** Icon after the label. */
  iconEnd?: ReactNode;
  /** Icon-only button: square, and `aria-label` is required. */
  iconOnly?: boolean;
  className?: string;
}

/**
 * Anatomy: root > icon? + label + icon?
 * Props as data attributes: data-variant, data-size, data-icon-only.
 * State from Base UI: data-disabled. Focus: :focus-visible.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  iconOnly = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <BaseButton
      className={join(styles.root, className)}
      data-variant={variant}
      data-size={size}
      data-icon-only={iconOnly || undefined}
      {...rest}
    >
      {iconStart && <span className={styles.icon}>{iconStart}</span>}
      {iconOnly ? (
        <span className={styles.icon}>{children}</span>
      ) : (
        <span className={styles.label}>{children}</span>
      )}
      {iconEnd && <span className={styles.icon}>{iconEnd}</span>}
    </BaseButton>
  );
}
