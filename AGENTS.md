# Assayo — agent notes

Assayo is a client-side React app that turns a Git log dump into an HTML report. This repo is the visualization UI. Logs come from `git log` (or Assayo Crawler). Related services: [assayo-showcase](https://github.com/bakhirev/assayo-showcase), [assayo-crawler](https://github.com/bakhirev/assayo-crawler).

## Stack

- React 19 + TypeScript, Vite
- HashRouter (`react-router-dom` v6)
- MobX (`mobx-react-lite` observers)
- i18next plus a custom `§ key: value` translation format
- SCSS modules (`generateScopedName` is `[local]`, so class names stay as written)
- Path alias: `baseUrl` is `src`, so import from `ts/...` (e.g. `ts/store/StatisticsByCommitsStore`)

## Commands

```bash
npm install
npm run dev              # PORT=3006
npm run build:local      # offline HTML in /build (strip hashes, local wiring)
npm run build:website    # public site + analytics
npm run build:docker
npm test
npm run js:check         # eslint src/**/*.{ts,tsx,js}
npm run js:fix
npm run css:check        # stylelint
npm run css:fix
```

Windows: `dev` uses Vite on port 3006. ESLint enforces Unix line endings (`linebreak-style: unix`). JSX: one prop per line, callbacks last (`react/jsx-sort-props`). Style: Airbnb TypeScript + React.

Do not commit generated files under `/build` unless the user asks.

## Layout

| Path | Role |
|------|------|
| `src/index.tsx` | Boot: config, plugins, i18n, load git log / CSS, render |
| `src/ts/pages/` | Shell: Welcome, Team/Person routes, PageWrapper (sidebar/header) |
| `src/ts/plugins/` | Feature pages; each plugin is a class implementing `IPlugin` |
| `src/ts/plugins/index.tsx` | Plugin registry (order matters for menu grouping) |
| `src/ts/helpers/Plugins/` | Plugin host: menu, pages, translations, enable/disable |
| `src/ts/helpers/` | Log parse, statistics, config, localization, recommendations |
| `src/ts/store/` | MobX stores (config, git log, commit/file stats, filters) |
| `src/ts/components/` | Shared UI (charts, table, layout, recommendations) |
| `src/ts/translations/` | Shared strings (not plugin-specific) |
| `public/` | Static assets; `build/` is the report output |

Data flow: dump (`log.txt` or `?dump=`) → `sourceData` → `StatisticsByCommitsStore` → `statisticsByCommits` / `statisticsByFiles` → plugin pages.

Config: `src/ts/helpers/ApplicationConfig/getDefaultConfig.ts`, URL `?config=`, `?dump=`, `?lang=`, `?theme=`. Plugin ids in `config.plugins` / `disabledPlugins` must match `static id` on the plugin class.

## Plugins

A page is a plugin class in `src/ts/plugins/<Name>/index.tsx`:

- `static id` — enable key (e.g. `team_total`)
- `getMenuItems()` — sidebar: `link`, `group`, `order`, `title` (i18n key), `icon`
- `getPage(path)` — return JSX for that path (`/team/...`, `/person/...`, `/settings`, `/print`)
- `getTranslations()` — per-locale strings
- optional `getHeaderItems()`

Register the class in `src/ts/plugins/index.tsx` and add its `id` to `getDefaultConfig().plugins`. Team routes: `/team/:page`. Person: `/person/:page/:userId`. HashRouter, so URLs are `#/team/total`.

Copy an existing plugin (e.g. `PageTeamTotal`) rather than inventing a new shape.

## Translations

Plugin strings live in `src/ts/plugins/<Name>/translations/<lang>/index.ts` as a template string of `§ key: value` lines. Keys use `plugin.<id>....`. Shared copy is under `src/ts/translations/<lang>/`.

Locales: `ar`, `de`, `en`, `es`, `fr`, `he`, `hi`, `ja`, `ko`, `pt`, `ru`, `zh`. When adding or changing a key, update **all** locale files. UI copy goes through these keys, not hardcoded English.

## Conventions

- Functional components; wrap views that read MobX with `observer`.
- Prefer existing layout/table/chart components over new one-off UI.
- CSS: colocated `*.module.scss`. Keep class names stable (they are not hashed).
- Types under `src/ts/interfaces/`. Avoid `any` except where the codebase already does (stats objects).
- Tests are sparse (`npm test` / Vitest). Add a test only when it protects non-obvious logic.
- Do not reformat unrelated files. Do not expand README unless asked.

## Local report

Offline dump format is described in README (wrapper for `log.txt`). For source development, drop a dump into `/build` or use `?dump=` after `npm run dev`.
