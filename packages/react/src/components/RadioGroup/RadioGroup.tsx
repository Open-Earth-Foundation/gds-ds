import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import type { ComponentProps, ReactNode } from 'react';
import { join } from '../../utils';
import styles from './RadioGroup.module.css';

export interface RadioGroupProps extends Omit<ComponentProps<typeof BaseRadioGroup>, 'className'> {
  /** Group label, read by assistive technology. */
  label: ReactNode;
  className?: string;
}

/**
 * Anatomy: group.root[role=radiogroup] > legend + Radio*
 * Each Radio: label.item > control(indicator) + text
 * State from Base UI Radio.Root: data-checked, data-unchecked, data-disabled.
 */
export function RadioGroup({ label, className, children, ...rest }: RadioGroupProps) {
  return (
    <BaseRadioGroup
      className={join(styles.root, className)}
      aria-label={typeof label === 'string' ? label : undefined}
      {...rest}
    >
      <span className={styles.legend}>{label}</span>
      {children}
    </BaseRadioGroup>
  );
}

export interface RadioProps extends Omit<
  ComponentProps<typeof BaseRadio.Root>,
  'className' | 'children'
> {
  children: ReactNode;
  className?: string;
}

export function Radio({ children, className, ...rest }: RadioProps) {
  return (
    <label className={join(styles.item, className)}>
      <BaseRadio.Root className={styles.control} {...rest}>
        <BaseRadio.Indicator className={styles.indicator} />
      </BaseRadio.Root>
      <span className={styles.text}>{children}</span>
    </label>
  );
}
