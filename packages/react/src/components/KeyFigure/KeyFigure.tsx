import type { ComponentProps, ReactNode } from 'react';
import { join } from '../../utils';
import styles from './KeyFigure.module.css';

export interface KeyFigureProps extends Omit<ComponentProps<'div'>, 'className'> {
  label: ReactNode;
  /** The figure, already formatted for the locale. */
  value: ReactNode;
  unit?: ReactNode;
  /** Change since the comparison period, e.g. "−4.2 % vs 2023". */
  delta?: ReactNode;
  /** Whether the delta is good or bad news; colour follows meaning, not sign. */
  deltaTone?: 'good' | 'bad' | 'neutral';
  /** Where the number comes from (principle 4): "Reported, 2024 inventory". */
  provenance?: ReactNode;
  className?: string;
}

/**
 * Anatomy: root > label + value(unit?) + delta?[data-tone] + provenance?
 */
export function KeyFigure({
  label,
  value,
  unit,
  delta,
  deltaTone = 'neutral',
  provenance,
  className,
  ...rest
}: KeyFigureProps) {
  return (
    <div className={join(styles.root, className)} {...rest}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>
        {value}
        {unit && <span className={styles.unit}> {unit}</span>}
      </p>
      {delta && (
        <p className={styles.delta} data-tone={deltaTone}>
          {delta}
        </p>
      )}
      {provenance && <p className={styles.provenance}>{provenance}</p>}
    </div>
  );
}
