import type { ComponentProps, ReactNode } from 'react';
import { join } from '../../utils';
import styles from './AppShell.module.css';

/*
 * The service shell: top bar across, side nav on the left, main area for whatever module is mounted.
 * Modules render inside <AppShell.Main>; the shell owns nothing about their content.
 *
 * Anatomy: root > top-bar(brand, switcher?, spacer, actions) + side-nav(group*, item*) + main(breadcrumb?, page-header?, content)
 * State: data-current on the current nav item.
 */

type RootProps = Omit<ComponentProps<'div'>, 'className'> & { className?: string };
const Root = ({ className, ...rest }: RootProps) => (
  <div className={join(styles.root, className)} {...rest} />
);

type TopBarProps = Omit<ComponentProps<'header'>, 'className'> & {
  className?: string;
  /** Logo and service name. The brand mark goes here and only here. */
  brand: ReactNode;
  /** Programme, organisation or city switcher. */
  switcher?: ReactNode;
  /** Right side: help, notifications, account. */
  actions?: ReactNode;
};
const TopBar = ({ className, brand, switcher, actions, ...rest }: TopBarProps) => (
  <header className={join(styles.topBar, className)} {...rest}>
    <div className={styles.brand}>{brand}</div>
    {switcher && <div className={styles.switcher}>{switcher}</div>}
    <div className={styles.spacer} />
    {actions && <div className={styles.actions}>{actions}</div>}
  </header>
);

type SideNavProps = Omit<ComponentProps<'nav'>, 'className'> & { className?: string };
const SideNav = ({ className, ...rest }: SideNavProps) => (
  <nav className={join(styles.sideNav, className)} aria-label="Main" {...rest} />
);

const NavGroup = ({
  className,
  ...rest
}: Omit<ComponentProps<'p'>, 'className'> & { className?: string }) => (
  <p className={join(styles.navGroup, className)} {...rest} />
);

type NavItemProps = Omit<ComponentProps<'a'>, 'className'> & {
  className?: string;
  icon?: ReactNode;
  current?: boolean;
  /** Journey step label, e.g. "1 of 4". */
  step?: ReactNode;
};
const NavItem = ({ className, icon, current, step, children, ...rest }: NavItemProps) => (
  <a
    className={join(styles.navItem, className)}
    data-current={current || undefined}
    aria-current={current ? 'page' : undefined}
    {...rest}
  >
    {icon && <span className={styles.navIcon}>{icon}</span>}
    <span className={styles.navLabel}>{children}</span>
    {step && <span className={styles.navStep}>{step}</span>}
  </a>
);

type MainProps = Omit<ComponentProps<'main'>, 'className'> & { className?: string };
const Main = ({ className, ...rest }: MainProps) => (
  <main className={join(styles.main, className)} {...rest} />
);

type BreadcrumbProps = Omit<ComponentProps<'nav'>, 'className'> & {
  className?: string;
  items: ReactNode[];
};
const Breadcrumb = ({ className, items, ...rest }: BreadcrumbProps) => (
  <nav className={join(styles.breadcrumb, className)} aria-label="Breadcrumb" {...rest}>
    <ol className={styles.breadcrumbList}>
      {items.map((item, i) => (
        <li
          key={i}
          className={styles.breadcrumbItem}
          aria-current={i === items.length - 1 ? 'page' : undefined}
        >
          {item}
        </li>
      ))}
    </ol>
  </nav>
);

type PageHeaderProps = Omit<ComponentProps<'div'>, 'className' | 'title'> & {
  className?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
};
const PageHeader = ({ className, title, subtitle, actions, ...rest }: PageHeaderProps) => (
  <div className={join(styles.pageHeader, className)} {...rest}>
    <div>
      <h1 className={styles.pageTitle}>{title}</h1>
      {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
    </div>
    {actions && <div className={styles.pageActions}>{actions}</div>}
  </div>
);

/** The blank canvas state of a module slot. */
type EmptyProps = Omit<ComponentProps<'div'>, 'className' | 'title'> & {
  className?: string;
  title: ReactNode;
};
const Empty = ({ className, title, children, ...rest }: EmptyProps) => (
  <div className={join(styles.empty, className)} {...rest}>
    <p className={styles.emptyTitle}>{title}</p>
    {children && <div className={styles.emptyText}>{children}</div>}
  </div>
);

export const AppShell = {
  Root,
  TopBar,
  SideNav,
  NavGroup,
  NavItem,
  Main,
  Breadcrumb,
  PageHeader,
  Empty,
};
