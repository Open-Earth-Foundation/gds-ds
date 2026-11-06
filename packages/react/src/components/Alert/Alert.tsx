import type { ComponentProps, ReactNode } from 'react';
import { CriticalIcon, GoodIcon, InfoIcon, WarningIcon } from '../../icons';
import { join } from '../../utils';
import styles from './Alert.module.css';

export type AlertKind = 'info' | 'good' | 'warning' | 'critical';

export interface AlertProps extends Omit<ComponentProps<'div'>, 'title' | 'className'> {
  kind?: AlertKind;
  title: ReactNode;
  /** A button or link that resolves the alert. */
  action?: ReactNode;
  className?: string;
}

const icons = { info: InfoIcon, good: GoodIcon, warning: WarningIcon, critical: CriticalIcon };

/**
 * Anatomy: root[role=status|alert] > icon + body(title, text) + action?
 * Props as data attributes: data-kind.
 */
export function Alert({ kind = 'info', title, action, className, children, ...rest }: AlertProps) {
  const Icon = icons[kind];
  return (
    <div
      className={join(styles.root, className)}
      data-kind={kind}
      role={kind === 'critical' ? 'alert' : 'status'}
      {...rest}
    >
      <span className={styles.icon}>
        <Icon />
      </span>
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        {children && <div className={styles.text}>{children}</div>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
