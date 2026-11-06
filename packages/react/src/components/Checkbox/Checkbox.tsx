import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import type { ComponentProps, ReactNode } from 'react';
import { CheckIcon } from '../../icons';
import { join } from '../../utils';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<
  ComponentProps<typeof BaseCheckbox.Root>,
  'className' | 'children'
> {
  /** The visible label. Wraps the control so the whole row is the hit area. */
  children: ReactNode;
  className?: string;
}

/**
 * Anatomy: label.root > box(indicator) + text
 * State from Base UI Checkbox.Root: data-checked, data-unchecked, data-indeterminate, data-disabled.
 */
export function Checkbox({ children, className, ...rest }: CheckboxProps) {
  return (
    <label className={join(styles.root, className)}>
      <BaseCheckbox.Root className={styles.box} {...rest}>
        <BaseCheckbox.Indicator className={styles.indicator}>
          <CheckIcon />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      <span className={styles.text}>{children}</span>
    </label>
  );
}
