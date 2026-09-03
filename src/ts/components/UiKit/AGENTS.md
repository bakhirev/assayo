# UiKit

Shared form and action controls. Prefer these over raw HTML inputs and one-off buttons.

Import from the barrel when the symbol is exported there; otherwise import the file:

```ts
import { UiKitButton, UiKitSwitch, UiKitDate, UiKitTag, UiKitTags, UiKitTagMode } from 'ts/components/UiKit';
import UiKitCheckbox from 'ts/components/UiKit/components/Checkbox';
```

Barrel (`index.tsx`) only re-exports: `UiKitWrapper`, `UiKitDate`, `UiKitButton`, `UiKitSwitch`, `UiKitTag`, `UiKitTagMode`, `UiKitTags`. Everything else lives under `components/` and is imported by path. Do not add a new public API without exporting it the same way existing consumers already import that control.

`CustomSelect` (`ts/components/CustomSelect`) is **not** UiKit. `SelectWithButtons` uses it on desktop and native `UiKitSelect` on mobile.

## Layout

| Path | Role |
|------|------|
| `components/` | One file per control |
| `styles/*.module.scss` | Classes named `ui_kit_*` (not hashed; keep names stable) |
| `index.tsx` | Public re-exports |

New control: add `components/Foo.tsx` + `styles/foo.module.scss` if needed. Wrap labeled fields with `Wrapper`. Reuse `style.ui_kit_common` from `styles/index.module.scss` for text-like inputs.

## Wrapper (`IUiKitWrapperProps`)

Most fields extend this. `title`, `description`, `help`, `example` are **i18n keys** (`t()` / `text()`). `error` is shown as-is. `help` becomes the wrapper `title` tooltip. `className` is extra classes on the wrapper (or the control, depending on the file).

Do not hardcode UI copy in these props; pass translation keys.

## Options

`Switch`, `Select`, `Tabs`, `SelectWithButtons`, `ButtonMenu` accept `options` as primitives or `{ id, title }`. Titles go through `t()` where the control renders them. `onChange` payloads differ by control — match the existing signature; do not “fix” them to a common type.

## Controls

| Component | Use | Notes |
|-----------|-----|--------|
| `UiKitButton` | Actions | `mode`: `primary` (default), `second`, `border`, `link`, `slim`, `full_size`. `mode` may be an array. `onClick()` takes no args. Label is `children`. |
| `UiKitButtonMenu` | Button + dropdown | `options`; `onClick(option)`. Returns `null` if `options` is empty. |
| `UiKitSwitch` | Segmented choice | `value` + `options` + `onChange`. Always calls `onChange(id[])`. `multiple` toggles ids in the array. |
| `UiKitTabs` | Horizontal tabs | `onChange(formattedOption)` (object, not id). `forwardRef` for scroll-into-view. |
| `UiKitSelect` | Native `<select>` | `onChange(parsedIntOrNull, rawString)`. Values are parsed with `parseInt`. |
| `SelectWithButtons` | Prev / select / next | Options must have `id`. `reverse` swaps prev/next. |
| `UiKitCheckbox` | Boolean | `onChange(!value)`. Label is `title` (translated). |
| `UiKitInputString` | Text | `onChange(string)` plus optional `onChangeDebounce` (default 800ms). |
| `UiKitInputNumber` | Number | `onChange(parseInt \|\| 0)` + same debounce helper. |
| `UiKitInputRange` | Range | `min`/`max` default 0/100; `onChange` gets the string value. |
| `UiKitDate` | Date | Input is `YYYY-MM-DD`; `onChange` emits `` `${date}T00:00:00.000Z` ``. |
| `UiKitTag` / `UiKitTags` | Chips | Modes: `UiKitTagMode.ERROR` / `WARNING` / `SUCCESS`. `Tags` shows the first chip plus `+N`. Item may be a string or `{ title, mode }`. |
| `UiKitColumns` | CSS columns | `columns` default 2. |
| `UiKitWrapper` | Label + description around custom children | Use when composing a field that is not a stock control. |

## Conventions

- Functional components; no MobX here. Callers that pass store values wrap themselves in `observer`.
- JSX: one prop per line, callbacks last (project ESLint).
- Do not invent a second button/input for filters, settings, or dialogs — extend an existing control or add a `mode`.
- Table cells already render tags via `getDefaultProps.tsx`; reuse `UiKitTag` / `UiKitTags` there instead of ad-hoc chips.
- Placeholders still default to Russian in a few inputs; new copy should be i18n keys, not more hardcoded strings.
