import type { ComponentProps } from 'react';
import { join } from '../../utils';
import styles from './Badge.module.css';

export type BadgeKind = 'good' | 'warning' | 'critical' | 'info' | 'neutral' | 'ai';

export interface BadgeProps extends Omit<ComponentProps<'span'>, 'className'> {
  kind?: BadgeKind;
  /** `subtle` (tinted background) or `solid` (status colour as background). */
  variant?: 'subtle' | 'solid';
  /** Leading status dot. */
  dot?: boolean;
  className?: string;
}

/**
 * Anatomy: root > dot? + label
 * Props as data attributes: data-kind, data-variant.
 * The label always carries the meaning; the colour only repeats it (principle 5).
 */
export function Badge({
  kind = 'neutral',
  variant = 'subtle',
  dot = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={join(styles.root, className)}
      data-kind={kind}
      data-variant={variant}
      {...rest}
    >
      {dot && <span className={styles.dot} aria-hidden />}
      <span className={styles.label}>{children}</span>
    </span>
  );
}
