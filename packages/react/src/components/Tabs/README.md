# Tabs

Sections of one page, one visible at a time. Base UI `Tabs` with the indicator sliding under the active tab.

## Anatomy

```
.gds-tabs
  .gds-tabs__list[role=tablist]
    .gds-tabs__tab[data-active][data-disabled]*   (+ .gds-tabs__count)
    .gds-tabs__indicator                           (Base UI Tabs.Indicator; position from --active-tab-left/width)
  .gds-tabs__panel[role=tabpanel]*
```

The selected state is Base UI's `data-active`, kept as is rather than renamed.

## Usage

```tsx
<Tabs.Root defaultValue="a">
  <Tabs.List aria-label="Sectors">
    <Tabs.Tab value="a" count={12}>
      Stationary
    </Tabs.Tab>
    <Tabs.Tab value="b">Transport</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="a">…</Tabs.Panel>
  <Tabs.Panel value="b">…</Tabs.Panel>
</Tabs.Root>
```

## Tokens

`tabs.fg`, `tabs.fg-active`, `tabs.indicator`, `tabs.border`, `tabs.type`.

Tabs are for views of the same thing; for navigation between pages use the side nav.
