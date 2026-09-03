# Components

Shared React UI for plugins and the app shell. Feature pages live in `ts/plugins/`; chrome (sidebar, routes) lives in `ts/pages/`. Do not add a one-off widget under a plugin if a package here already covers it.

Import from each package dir (`ts/components/Layout`, `ts/components/Table`, …). Some UiKit controls are path-only — see `UiKit/AGENTS.md`.

Nested notes (read those when editing that package):

- `UiKit/AGENTS.md` — buttons, inputs, switch, tags
- `Layout/AGENTS.md` — titles, cards, DataView, Search, empty states, tracker links

## Which package

| Package | Use for |
|---------|---------|
| `UiKit` | Form controls and actions |
| `Layout` | Page structure, KPI cards, `DataView`, filters, `NothingFound` |
| `Table` | Column configs; used by `DataView` and rare raw tables |
| `DataLoader` | Client-side pagination over in-memory arrays (`FakeDataLoader`) |
| `Charts` | Bar, pie, line, hours, gantt, candy |
| `YearChart` | GitHub-style year/month heatmap |
| `Tempo`, `TempoByTable`, `TempoLikeList` | Week/day commit tempo views |
| `TimeZoneMap` | Author dots on a world map |
| `Recommendations` | Insight cards from `statisticsByCommits.recommendations` |
| `Achievement`, `BeautifulTaskNumbers` | Person-page badges / pretty task ids |
| `Translation` | `useTranslation()` — not i18next’s hook |
| `ModalWindow` | Portaled dialog (`Modal` + `Header` / `Body` / `Footer`); `Confirm` is global |
| `Notifications` | Toast portal; `notificationsStore.show(i18nKey)` |
| `DropZone` | Body-level file drop (welcome / load dump) |
| `Page` | White content frame (`wrapper` `template="table"\|"box"`, `Box` with remove) |
| `Loading` | `...` placeholder inside DataLoader |
| `CustomSelect` | Searchable dropdown; used by UiKit `SelectWithButtons` on desktop, not a public form API |
| `Extension` | File-type sidebar; currently short-circuits to `null` |

`ts/pages/PageWrapper` is the app layout. `ts/components/Page/wrapper` is only a padded white box (DataView tables use it).

## Typical plugin page

```tsx
<Title title="plugin.team_x.sidebar" />
<LayoutSearch elements={[...]} content={rows} onChange={...} />
<If value={!rows.length}><NothingFound /></If>
<FakeDataLoader content={rows} watch={statisticStore.hash}>
  <Pagination />
  <DataView rows={response.content}>
    <Column title="..." properties="..." />
  </DataView>
</FakeDataLoader>
<Recommendations recommendations={statisticStore.statisticsByCommits.recommendations.team.byX} />
```

KPI rows: `Section` + `SectionColumn` + `CardWithIcon` / `SmallCardWithIcon`. Filters: UiKit, not raw inputs.

## Table and DataView

`Column` children are **config**, not cells (`getDefaultProps` reads props). Prefer `DataView` wrapping columns so Excel export and table chrome stay consistent. Raw `Table` only when DataView extras must not appear (or `DataView` `mode="details"`).

`ColumnTypes`: `STRING`, `NUMBER`, `SHORT_NUMBER`, `DETAILS`, `PULL_REQUESTS`, `TASK`, `TAGS` (PR/task/tags use Layout links and UiKit tags). `title` is an i18n key. `properties` is the row field; `formatter` / `template` as a function for custom cells.

## DataLoader

There is no server. `FakeDataLoader` + `getFakeLoader` / `sendFakeRequest` slice `content` by page and sort. Pair with `<Pagination />` as a sibling (not inside DataView). `watch={statisticStore.hash}` (or filter hash) reloads when stats or filters change. `DataLoader` with a custom `loader` is the same store; Fake is the usual plugin path.

## Charts and calendars

Import named charts from `ts/components/Charts`. Grouping helpers: `ts/helpers/charts` and `Charts/helpers`. `YearChart` takes `months` from commit stats plus `events` / `filters`. Tempo family is for hourly/daily grids, not generic bar charts.

## Translation

```ts
const { t, text, wrapper } = useTranslation();
```

- `t(key)` — React node (editable when translation editor is on). Use in JSX.
- `text(key)` — plain string (`title=`, placeholders, `document`).
- `wrapper(id, children)` — editor wrap for `Description`.

Do not use `react-i18next` in this tree. Keys belong in `ts/translations` or plugin `translations/`.

## Overlays

`Modal` portals to `document.body` and locks scroll. Compose `Header` / `Body` / `Footer`. Global confirm: `ts/components/ModalWindow/store/Confirm` (already mounted from pages). Toasts: `notificationsStore`. DropZone listens on `document.body`.

## Conventions

- Functional components; `observer` only when reading MobX (`Filters`, splash, notifications, confirm).
- SCSS modules; class names are not hashed — keep `ui_kit_*` / existing BEM-like names stable.
- JSX: one prop per line, callbacks last. Unix line endings.
- Copy is i18n keys, not hardcoded UI strings (a few placeholders are still Russian).
- Prefer extending `mode` / `size` / `ColumnTypes` / chart props over a new top-level folder.
- Do not import plugin pages from here (dependency should point plugins → components).
