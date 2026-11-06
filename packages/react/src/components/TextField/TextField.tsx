import { Field } from '@base-ui/react/field';
import { Input } from '@base-ui/react/input';
import type { ComponentProps, ReactNode } from 'react';
import { join } from '../../utils';
import styles from './TextField.module.css';

export interface TextFieldProps extends Omit<ComponentProps<typeof Input>, 'className'> {
  label: ReactNode;
  /** Shown under the control when there is no error. */
  description?: ReactNode;
  /** Shown instead of the description; sets the field invalid. */
  error?: ReactNode;
  /** Text after the value: a unit, a currency. */
  suffix?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  className?: string;
}

/**
 * Anatomy: field > label + control(input, suffix?) + help|error
 * State on the field (Base UI Field.Root): data-invalid, data-disabled, data-focused, data-filled.
 */
export function TextField({
  label,
  description,
  error,
  suffix,
  required,
  disabled,
  name,
  className,
  ...input
}: TextFieldProps) {
  return (
    <Field.Root
      className={join(styles.root, className)}
      invalid={!!error}
      disabled={disabled}
      name={name}
    >
      <Field.Label className={styles.label}>
        {label}
        {required ? <span className={styles.required}> required</span> : null}
      </Field.Label>
      <div className={styles.control}>
        <Input className={styles.input} required={required} {...input} />
        {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
      </div>
      {error ? (
        <Field.Error className={styles.error} match>
          {error}
        </Field.Error>
      ) : description ? (
        <Field.Description className={styles.help}>{description}</Field.Description>
      ) : null}
    </Field.Root>
  );
}
