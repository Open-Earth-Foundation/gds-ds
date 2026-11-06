# Table

Rows of records. Semantic HTML with the GDS classes; behavior (sorting, selection, pagination) belongs to the module that owns the data.

## Anatomy

```
.gds-table__scroll
  table.gds-table[data-striped]
    thead.gds-table__head > tr > th.gds-table__header-cell[data-numeric]*
    tbody.gds-table__body > tr.gds-table__row[data-selected]* > td.gds-table__cell[data-numeric]*
    tr > td.gds-table__empty (Table.Empty)
```

## Parts

`Table.Root` (`striped`), `Table.Head`, `Table.Body`, `Table.Row` (`selected`), `Table.HeaderCell` (`numeric`), `Table.Cell` (`numeric`), `Table.Empty` (`colSpan`).

## Tokens

`table.header.*`, `table.row.*`, `table.cell.*`, `table.empty.fg`.

Numbers are right-aligned and tabular. Missing values show as "—" with a word next to them (not estimated, pending), never blank (principle 6).
