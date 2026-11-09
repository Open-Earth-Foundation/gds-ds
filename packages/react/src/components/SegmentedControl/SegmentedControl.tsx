import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { join } from '../../utils';
import styles from './SegmentedControl.module.css';

type RootProps<V extends string> = Omit<
  ToggleGroup.Props<V>,
  'className' | 'value' | 'defaultValue' | 'onValueChange' | 'multiple'
> & {
  className?: string;
  /** The selected option. Controlled: one option is always selected. */
  value: V;
  onValueChange: (value: V) => void;
};

type ItemProps<V extends string> = Omit<Toggle.Props<V>, 'className' | 'value'> & {
  className?: string;
  value: V;
};

/**
 * Switches between views of the same content, e.g. chart and table. Single-select and never
 * empty: pressing the selected option again keeps it selected.
 *
 * Controlled only, so the component holds no state of its own: the parent owns `value`.
 */
function Root<V extends string>({ className, value, onValueChange, ...rest }: RootProps<V>) {
  return (
    <ToggleGroup<V>
      className={join(styles.root, className)}
      value={[value]}
      onValueChange={(next) => {
        if (next[0] !== undefined) onValueChange(next[0]);
      }}
      {...rest}
    />
  );
}

function Item<V extends string>({ className, ...rest }: ItemProps<V>) {
  return <Toggle<V> className={join(styles.item, className)} {...rest} />;
}

/**
 * Anatomy: root[role=group][data-disabled] > item[data-pressed][data-disabled]*
 * State from Base UI ToggleGroup / Toggle: data-pressed, data-disabled, aria-pressed.
 */
export const SegmentedControl = { Root, Item };
export type { RootProps as SegmentedControlProps, ItemProps as SegmentedControlItemProps };
