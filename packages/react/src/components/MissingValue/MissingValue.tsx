import type { ComponentProps, ReactNode } from 'react';
import { join } from '../../utils';
import styles from './MissingValue.module.css';

/**
 * Why a value is absent. The first four are the GPC notation keys; pending and not applicable
 * cover workflow and other modules. Principle 10: absence of data is data.
 */
export type MissingReason =
  | 'not-estimated'
  | 'not-occurring'
  | 'included-elsewhere'
  | 'confidential'
  | 'pending'
  | 'not-applicable';

const LABEL: Record<MissingReason, string> = {
  'not-estimated': 'not estimated',
  'not-occurring': 'not occurring',
  'included-elsewhere': 'included elsewhere',
  confidential: 'confidential',
  pending: 'pending',
  'not-applicable': 'not applicable',
};

/** GPC notation keys, shown in the title for inventory experts. */
const NOTATION_KEY: Partial<Record<MissingReason, string>> = {
  'not-estimated': 'NE',
  'not-occurring': 'NO',
  'included-elsewhere': 'IE',
  confidential: 'C',
};

export interface MissingValueProps extends Omit<ComponentProps<'span'>, 'className' | 'children'> {
  /** Why the value is missing. Defaults to `not-estimated`. */
  reason?: MissingReason;
  /** Replaces the default English word, e.g. a translated label. */
  children?: ReactNode;
  className?: string;
}

/**
 * Anatomy: root[data-reason] > dash(aria-hidden) + label
 * Props as data attributes: data-reason.
 * Use wherever a value would go: a table cell, a key figure, a summary line. Never leave a blank
 * or write a zero.
 */
export function MissingValue({
  reason = 'not-estimated',
  className,
  children,
  title,
  ...rest
}: MissingValueProps) {
  const key = NOTATION_KEY[reason];
  return (
    <span
      className={join(styles.root, className)}
      data-reason={reason}
      title={title ?? (key ? `${LABEL[reason]} (${key})` : undefined)}
      {...rest}
    >
      <span className={styles.dash} aria-hidden>
        —
      </span>
      <span className={styles.label}>{children ?? LABEL[reason]}</span>
    </span>
  );
}
