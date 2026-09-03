# Helpers

Non-UI engine: parse dumps, build statistics, config, i18n maps, plugin host. Plugins should **read** `statisticStore.statisticsByCommits` / `statisticsByFiles` (MobX). Do not call `addCommit` / `updateTotalInfo` from a page except when changing this pipeline.

Import from `ts/helpers/<folder>` (or a file). There is no barrel for the whole tree.

This folder is not React UI. The exception is `File.ts` (Excel export walks `Table` column children).

Nested notes:

- `StatisticsByCommits/AGENTS.md` — commit dimensions, `addCommit` routing, `updateTotalInfo` order

Nested notes:

- `getCommitObjectsFromText/AGENTS.md` — dump line parser (`ICommit` / `ISystemCommit`)

## Pipeline

Dump (`log.txt` lines or dropped files) → parse → group → totals → store swap for render.

1. **Ingest** — `getDataFromFiles` (drop zone: git log / `package.json` / dependency dumps) or `loadSource.loadGitLog` (`?dump=`). Offline dumps may be wrapped as `R(f\`...\`);`; `getCleanStringFromFuncWrapper` strips that.
2. **Parse** — `getCommitObjectsFromText(lines)` → `ICommit | ISystemCommit[]`. Header line is `date>author>email>subject`. `--raw` (`:…`) and `--numstat` (tab) lines attach `fileChanges`. Conventional commits fill `type` / `scope` / `task`. Merges become system commits (`commitType`).
3. **Group** — `statisticsByCommits.addCommit` then `statisticsByFiles.addCommit` (driven by `StatisticsByCommitsStore`). Author `GitHub` is skipped for most commit aggregators. System commits go to `pr` / `release` / `service`, not author/type/scope.
4. **Totals** — `statisticsByFiles.updateTotalInfo()` then `statisticsByCommits.updateTotalInfo()`. Order inside the latter is fixed (authors before team, tasks before PR/release, scoring last). Then `achievement/byCompetition.updateByGrip`.
5. **Render** — store replaces `statisticsByCommits` / `statisticsByFiles` and bumps `hash`. Header date filter / depersonalize **rebuilds** from `sourceData.commits` via `updateStatistic()`; do not mutate commits in place.

Re-running analysis always `clear()` both singletons first.

## Statistics aggregators

Singletons:

| Module | Default export | Typical fields |
|--------|----------------|----------------|
| `StatisticsByCommits` | `statisticsByCommits` | `author`, `company`, `country`, `team`, `scope`, `type`, `month`, `week`, `tasks`, `taskCodes`, `pr`, `release`, `absence`, `email`, `recommendations`, `firstLastCommit`, … |
| `StatisticsByFiles` | `statisticsByFiles` | `files`, `extension`, `type`, `tree`, `removedTree`, `refactor` |
| `StatisticsByPackageJson` | `statisticsByPackageJson` | `licenses`, `packages` (from dropped `package.json`) |

Pattern for a dimension class: `clear()`, `addCommit(commit)`, `updateTotalInfo(...)`. After totals, UI usually uses `totalInfo` (sorted array) and `totalInfoByName` / `list`. Copy `components/author` or `components/type` rather than inventing a new shape.

New commit metric: add a class under `StatisticsByCommits/components/`, construct it on `StatisticsByCommits`, wire `clear` / `addCommit` / `updateTotalInfo` in `index.ts`. Same idea for files under `StatisticsByFiles`. Shared counters: `MinMaxCounter`, `helpers/index.ts` (`createMap`, `incrementMap`, …), `Math.ts` (`WeightedAverage`).

`timestamp` is marked deprecated; prefer `month` / `week` for new work.

`Recommendations` is filled in `updateTotalInfo` as `recommendations.team` / `recommendations.person` (by scope, author, type, week, hour, …). Achievement ids live in `achievement/`; do not mix them into aggregator `addCommit`.

## Parse and ingest

| Path | Role |
|------|------|
| `getCommitObjectsFromText/` | Line parser. `getCommitInfo` splits `>`. Email → company/country/device (`getInfoFromEmail`, `getCountryBy*`). `getTypeAndScope` for feat/fix and task ids. `getFileChanges` for paths/line counts. |
| `getDataFromFiles/` | Classify dropped files: git log vs packages vs dependency graphs. |
| `loadSource.ts` | Fetch dump/JSON/CSS. |
| `Depersonalized/` | Stable fake author/email/company/task prefix when anonymize is on. |

Commit message format is Conventional Commits plus tracker id (see root README). Parser is tolerant; do not require a perfect message to ingest a line.

## Config, plugins, i18n

`ApplicationConfig`: `getConfig` → URL params (`getParametersFromURL`, search **and** hash) + optional `?config=` JSON + `getDefaultConfig`, merged in `getSummaryConfig` (URL wins for `dump`/`lang`/`theme`/`title`). Plugin ids: `config.plugins` minus `disabledPlugins`. Defaults list every enabled `static id`.

`Plugins/` — host: `setPlugins`, `getMenuItems` / `getHeaderItems`, `getPage`, `getTranslations`. See root `AGENTS.md` and `plugins/index.tsx`. `IPlugin` is `helpers/Plugins/interfaces/Plugin.ts`.

`Localization` — `§ key: value` maps; `t(key)` / `localization.get(key, …)` with `$1` placeholders. `i18n.ts` sets language (URL, localStorage, browser). `initializationI18n` does not load plugin strings; boot in `src/index.tsx` does. Default language on the Localization class is `ru` until init runs.

## Small utilities

| Path | Role |
|------|------|
| `formatter/` | Dates (`ONE_DAY`, `ONE_WEEK`), money, numbers, strings, language names. `updateExchangeRate` from config. |
| `charts/` | Day/year grouping + max helpers for chart components. |
| `File.ts` | `downloadExcel` / `downloadFile` from DataView. |
| `DOMEvents/` | Scroll lock (splash), resize. |
| `isMobile.ts` | Viewport flag. |
| `copyInBuffer.ts` | Clipboard. |
| `copyPasteFormatter.ts` | `MARKER` (`\u200B`) on KPI values so copy/paste turns cards into a text list. |
| `getTitle.ts` | `document.title` from task code + dominant file type + year range. |
| `random.ts` | Random helpers. |

## Conventions

- Keep aggregators pure data. No JSX, no `useTranslation`.
- Types: `ts/interfaces/Commit.ts`, `FileInfo`, `ApplicationConfig`, `SourceData`. Stats objects are often `any` already; do not add a parallel typed tree unless you migrate a whole aggregator.
- Plugins must not import aggregator internals to mutate them. Read `totalInfo` / maps from the store after `hash` changes.
- Do not reorder `updateTotalInfo` without checking dependents (team needs authors, PR/release need tasks).
- Prefer extending an existing dimension over a one-off reduce in a plugin when the metric is reused.
