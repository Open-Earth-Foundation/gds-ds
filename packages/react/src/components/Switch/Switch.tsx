import { Switch as BaseSwitch } from '@base-ui/react/switch';
import type { ComponentProps, ReactNode } from 'react';
import { join } from '../../utils';
import styles from './Switch.module.css';

export interface SwitchProps extends Omit<
  ComponentProps<typeof BaseSwitch.Root>,
  'className' | 'children'
> {
  children: ReactNode;
  className?: string;
}

/**
 * Anatomy: label.root > track(thumb) + text
 * State from Base UI Switch.Root: data-checked, data-unchecked, data-disabled.
 */
export function Switch({ children, className, ...rest }: SwitchProps) {
  return (
    <label className={join(styles.root, className)}>
      <BaseSwitch.Root className={styles.track} {...rest}>
        <BaseSwitch.Thumb className={styles.thumb} />
      </BaseSwitch.Root>
      <span className={styles.text}>{children}</span>
    </label>
  );
}
