import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { ComponentProps, ReactNode } from 'react';
import { CloseIcon } from '../../icons';
import { join } from '../../utils';
import styles from './Dialog.module.css';

type PopupProps = Omit<ComponentProps<typeof BaseDialog.Popup>, 'className' | 'title'> & {
  className?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Buttons, right-aligned. Put the primary action last. */
  footer?: ReactNode;
  /** Hide the corner close button (keep a Close in the footer then). */
  hideClose?: boolean;
};

function Popup({
  className,
  title,
  description,
  footer,
  hideClose,
  children,
  ...rest
}: PopupProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={styles.backdrop} />
      <BaseDialog.Popup className={join(styles.root, className)} {...rest}>
        <header className={styles.header}>
          <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
          {!hideClose && (
            <BaseDialog.Close className={styles.close} aria-label="Close">
              <CloseIcon />
            </BaseDialog.Close>
          )}
        </header>
        {description && (
          <BaseDialog.Description className={styles.description}>
            {description}
          </BaseDialog.Description>
        )}
        {children && <div className={styles.body}>{children}</div>}
        {footer && <footer className={styles.footer}>{footer}</footer>}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

/**
 * Anatomy: Root > Trigger + Popup(backdrop, header(title, close), description?, body?, footer?)
 * State from Base UI: data-open / data-closed on popup and backdrop, data-popup-open on the trigger.
 * Root, Trigger and Close are Base UI's; Trigger composes any element through `render`.
 */
export const Dialog = {
  Root: BaseDialog.Root,
  Trigger: BaseDialog.Trigger,
  Close: BaseDialog.Close,
  Popup,
};
