import type { ComponentProps, ReactNode } from 'react';
import { join } from '../../utils';
import styles from './Card.module.css';

export interface CardProps extends Omit<ComponentProps<'section'>, 'title' | 'className'> {
  /** Small label above the title (a section, a sector). */
  eyebrow?: ReactNode;
  title?: ReactNode;
  /** Right-aligned controls in the header: a menu, a link. */
  actions?: ReactNode;
  footer?: ReactNode;
  /** Lift the card off the page with elevation.raised. Default: border only. */
  elevated?: boolean;
  className?: string;
}

/**
 * Anatomy: root > header(eyebrow?, title, actions?) + body + footer?
 * Props as data attributes: data-elevated.
 */
export function Card({
  eyebrow,
  title,
  actions,
  footer,
  elevated,
  className,
  children,
  ...rest
}: CardProps) {
  const hasHeader = eyebrow || title || actions;
  return (
    <section
      className={join(styles.root, className)}
      data-elevated={elevated || undefined}
      {...rest}
    >
      {hasHeader && (
        <header className={styles.header}>
          <div>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            {title && <h3 className={styles.title}>{title}</h3>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </header>
      )}
      <div className={styles.body}>{children}</div>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </section>
  );
}
