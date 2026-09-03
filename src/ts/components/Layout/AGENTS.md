# Layout

Page chrome for plugin screens: headings, empty states, metric cards, table/card views, search filters, and tracker links. Prefer these over ad-hoc layout.

Import from the barrel:

```ts
import {
  Title, TitleBig, Description, Gap, If, NothingFound,
  Section, SectionColumn, SectionWithBg,
  CardWithIcon, SmallCardWithIcon, CardWithBanner,
  DataView, Search as LayoutSearch,
  TaskLink, PRLink, GithubLink,
  splashScreenStore,
} from 'ts/components/Layout';
```

Callers often alias `Search` as `LayoutSearch`. Do not import internals (`DataView/store`, `Search/helpers`) from plugins unless you are changing that behavior.

This folder is **not** the app shell (`ts/pages/PageWrapper`). UiKit is for form controls; Layout is for page structure and report widgets.

## Headings and copy

| Export | Role |
|--------|------|
| `Title` | Section `<h3>`. `title` is an i18n key. Optional `id`, `addPadding`, `className`. Also writes `<a name={title}>` for in-page anchors. |
| `TitleBig` | Page header: optional `prefix` (h6), `title` (h3), `children` (usually a select) on the right. |
| `Description` | Body copy. Pass `text` or `translationId`. Splits on blank lines. Line prefix `- ` → list, `# ` → subtitle. `*bold*` and `[label\|url]` links. |
| `Gap` | Spacer. `width` / `height`: token (`xxxs`…`xxl`) or a number (px). |
| `If` | Render `children` only if `value` is truthy and not an empty array. `0` / `''` hide. |

Do not hardcode English/Russian in `Title` / `Description`; pass translation keys.

Typical page order: `Title` or `TitleBig` → optional `Description` → `LayoutSearch` → `NothingFound` or content → `Gap` between blocks.

## Sections and cards

`Section` is a horizontal row; wrap metric cards in `SectionColumn`. `SectionWithBg` is the same row with a white background and no top padding.

`CardWithIcon` — KPI tile. `title` / `description` are i18n keys. Returns `null` if `value` is empty (`0` is shown). `size`: `s` \| `m` (default) \| `l`. Optional `icon` (asset path), `suffix`, `scoring={{ title, value, total }}`.

`SmallCardWithIcon` — compact tile. Same idea; `value` may be a node or string array. Returns `null` if `!value` (so `0` is hidden).

`CardWithBanner` — promo tile using `Banner` / `referenceStore`. Same `size` values.

Put several cards in one `Section` with one `SectionColumn` per card (or group). Do not invent a new KPI card.

## DataView

Table (and unused cards mode) for row lists. `children` are **`Table` column configs**, same as `ts/components/Table`.

- `rows` — if empty, renders nothing (pair with `NothingFound` in the parent).
- `mode="details"` — table only, no Excel button / page wrapper.
- `type` — force `table` or `cards`; otherwise localStorage via `dataViewStore` (default table, cards on mobile).
- `rowsForExcel` — export payload; Excel uses column children.
- `sort`, `updateSort`, `disabledRow` — forwarded to `Table`.

Do not replace `DataView` with a raw `Table` on plugin list pages.

## Search

Client-side filter bar. `onChange(filteredRows, hash, filters)` fires when `filters.hash` changes (setters bump `hash` with `Math.random()`).

`elements` turns widgets on: `search` (wide query), `search_small`, `author`, `company`, `taskCode`, `type`, `scope`. Omit `elements` → all default selects. Example: `elements={['search', 'author']}`.

Default filter matches `item.author` / `company` / `taskCode` / `scope` / `type`. Override with `onFilter(filters) => (item) => boolean`. `properties` / `examples` / `placeholder` apply to text search. `children` are cloned with `filters` and `onChange: setFilters`.

## Empty and loading

`NothingFound` — illustration + copy. `mode` omitted: commit-format hint. `mode="staff"` / `mode="search"` for those empty states.

`SplashScreen` — overlay; drive it with `splashScreenStore.show()` / `setDelay(logSize)` (used from `StatisticsByCommitsStore`). Rendered from the pages shell, not inside plugins.

`Logo` — config logo + optional sponsor line (`showDescription`).

## Links and extras

`TaskLink` (`task`) and `PRLink` (`prId`, optional `text`) prepend `prefixForTask` / `prefixForPR` from app config. `GithubLink` (`email`) uses `name+login@users.noreply.github.com` → `github.com/login`. All no-op if the id is missing.

`DayInfo` — commits/tasks for a `timestamp` (year-chart / calendar). Optional `author` and `events` sets (first/last day, vacation, travel).

`Console` — fake terminal; `textForCopy` adds a copy button. `Banner` — promo from `referenceStore`; usually via `CardWithBanner`.

## Conventions

- Functional components. Only `SplashScreen` / `Logo` / Search `Filters` are MobX observers.
- `title` / `description` / `prefix` on layout widgets are i18n keys (`useTranslation`).
- JSX: one prop per line, callbacks last.
- Extend an existing widget (`mode`, `size`, `elements`) before adding a new folder under Layout.
