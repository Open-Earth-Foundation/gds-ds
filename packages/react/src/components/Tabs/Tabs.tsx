import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import type { ComponentProps, ReactNode } from 'react';
import { join } from '../../utils';
import styles from './Tabs.module.css';

type RootProps = Omit<ComponentProps<typeof BaseTabs.Root>, 'className'> & { className?: string };
type ListProps = Omit<ComponentProps<typeof BaseTabs.List>, 'className'> & { className?: string };
type TabProps = Omit<ComponentProps<typeof BaseTabs.Tab>, 'className'> & {
  className?: string;
  /** A count shown after the label, e.g. number of rows. */
  count?: ReactNode;
};
type PanelProps = Omit<ComponentProps<typeof BaseTabs.Panel>, 'className'> & { className?: string };

function Root({ className, ...rest }: RootProps) {
  return <BaseTabs.Root className={join(styles.root, className)} {...rest} />;
}
function List({ className, children, ...rest }: ListProps) {
  return (
    <BaseTabs.List className={join(styles.list, className)} {...rest}>
      {children}
      <BaseTabs.Indicator className={styles.indicator} />
    </BaseTabs.List>
  );
}
function Tab({ className, count, children, ...rest }: TabProps) {
  return (
    <BaseTabs.Tab className={join(styles.tab, className)} {...rest}>
      {children}
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </BaseTabs.Tab>
  );
}
function Panel({ className, ...rest }: PanelProps) {
  return <BaseTabs.Panel className={join(styles.panel, className)} {...rest} />;
}

/**
 * Anatomy: root > list(tab*, indicator) + panel*
 * State from Base UI: data-active on the selected tab, data-disabled, data-orientation.
 */
export const Tabs = { Root, List, Tab, Panel };
