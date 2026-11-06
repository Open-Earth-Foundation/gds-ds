import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import { join } from '../../utils';
import styles from './Tooltip.module.css';

export interface TooltipProps extends Omit<ComponentProps<typeof BaseTooltip.Root>, 'children'> {
  /** The short text. Tooltips never hold anything the user needs to act on. */
  content: ReactNode;
  /** The element that triggers it; must accept a ref and be focusable. */
  children: ReactElement;
  side?: ComponentProps<typeof BaseTooltip.Positioner>['side'];
  className?: string;
}

/**
 * Anatomy: Root > Trigger(children) + Portal > Positioner > Popup(content)
 * State from Base UI: data-popup-open on the trigger; data-open/closed, data-side on the popup.
 * Wrap the app once in <TooltipProvider> for shared delays.
 */
export function Tooltip({ content, children, side = 'top', className, ...rest }: TooltipProps) {
  return (
    <BaseTooltip.Root {...rest}>
      <BaseTooltip.Trigger render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} sideOffset={6} className={styles.positioner}>
          <BaseTooltip.Popup className={join(styles.root, className)}>{content}</BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}

export const TooltipProvider = BaseTooltip.Provider;
