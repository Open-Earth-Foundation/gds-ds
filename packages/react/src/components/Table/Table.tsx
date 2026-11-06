import type { ComponentProps } from 'react';
import { join } from '../../utils';
import styles from './Table.module.css';

type RootProps = Omit<ComponentProps<'table'>, 'className'> & {
  className?: string;
  /** Alternate row backgrounds with table.row.striped.bg. */
  striped?: boolean;
};
type CellProps = Omit<ComponentProps<'td'>, 'className'> & {
  className?: string;
  /** Right-aligned, tabular figures (table.cell.numeric-type). */
  numeric?: boolean;
};
type HeaderCellProps = Omit<ComponentProps<'th'>, 'className'> & {
  className?: string;
  numeric?: boolean;
};
type RowProps = Omit<ComponentProps<'tr'>, 'className'> & {
  className?: string;
  selected?: boolean;
};

function Root({ className, striped, ...rest }: RootProps) {
  return (
    <div className={styles.scroll}>
      <table
        className={join(styles.root, className)}
        data-striped={striped || undefined}
        {...rest}
      />
    </div>
  );
}
const Head = ({ className, ...rest }: ComponentProps<'thead'>) => (
  <thead className={join(styles.head, className)} {...rest} />
);
const Body = ({ className, ...rest }: ComponentProps<'tbody'>) => (
  <tbody className={join(styles.body, className)} {...rest} />
);
const Row = ({ className, selected, ...rest }: RowProps) => (
  <tr
    className={join(styles.row, className)}
    data-selected={selected || undefined}
    aria-selected={selected}
    {...rest}
  />
);
const HeaderCell = ({ className, numeric, ...rest }: HeaderCellProps) => (
  <th
    scope="col"
    className={join(styles.headerCell, className)}
    data-numeric={numeric || undefined}
    {...rest}
  />
);
const Cell = ({ className, numeric, ...rest }: CellProps) => (
  <td className={join(styles.cell, className)} data-numeric={numeric || undefined} {...rest} />
);
/** A full-width row for "no rows" and similar states; the text is table.empty.fg. */
const Empty = ({ className, colSpan, ...rest }: ComponentProps<'td'>) => (
  <tr className={styles.row}>
    <td className={join(styles.empty, className)} colSpan={colSpan} {...rest} />
  </tr>
);

/**
 * Anatomy: scroll > table.root[data-striped] > head(row > header-cell*) + body(row[data-selected]* > cell[data-numeric]*)
 * Plain semantic HTML; sorting, selection and pagination are the module's concern.
 */
export const Table = { Root, Head, Body, Row, HeaderCell, Cell, Empty };
