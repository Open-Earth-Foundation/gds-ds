# AppShell

The service frame: top bar, side navigation, main area. Modules mount in `AppShell.Main` and own everything below the page header. Plain markup with landmarks; routing is the app's.

## Anatomy

```
.gds-app-shell
  header.gds-app-shell__top-bar   (.brand, .switcher?, .spacer, .actions?)
  nav.gds-app-shell__side-nav[aria-label=Main]
    p.gds-app-shell__nav-group*
    a.gds-app-shell__nav-item[data-current][aria-current=page]*   (.nav-icon?, .nav-label, .nav-step?)
  main.gds-app-shell__main
    nav.gds-app-shell__breadcrumb?  (ol > li[aria-current])
    .gds-app-shell__page-header?    (h1.page-title, .page-subtitle?, .page-actions?)
    .gds-app-shell__empty?          the blank canvas state
```

## Parts

`Root`, `TopBar` (`brand`, `switcher`, `actions`), `SideNav`, `NavGroup`, `NavItem` (`icon`, `current`, `step`, any `<a>` prop; pass `render`-like composition through the app's Link by wrapping), `Main`, `Breadcrumb` (`items`), `PageHeader` (`title`, `subtitle`, `actions`), `Empty` (`title`).

## Tokens

`nav.*` for bars and items, `size.layout.*` for widths and heights, `type.display.lg` for the page title, `space.inset.*` for padding. Below 48rem the side nav hides; a drawer is a v1.1 item.

The brand mark lives in the top bar and nowhere else; the interface colour is `color.interactive.*`, which the brand sets through primitives.
