# StatisticsByCommits

Singleton that groups parsed commits into report dimensions (author, type, week, tasks, PR, …). Default export is `statisticsByCommits`. The MobX store (`ts/store/StatisticsByCommitsStore`) owns the pipeline: `clear` → `addCommit` per commit → `updateTotalInfo`. Plugins **read** `statisticStore.statisticsByCommits` after `hash` changes. Do not call `addCommit` / `updateTotalInfo` / `clear` from a page.

This folder is pure data. No JSX, no `useTranslation`.

```ts
import statisticsByCommits from 'ts/helpers/StatisticsByCommits';
```

After totals, UI uses `totalInfo` (usually a sorted array) and `totalInfoByName` / `list`. Nested charts may import types from a dimension file (`StatisticsMonth`, `StatisticsDay`, `Email`, `StatisticsAbsenceTime`).

## `addCommit` routing

`index.ts` fans out each commit. Order and skips matter:

1. `server` always (remote URL on the commit).
2. Author `GitHub` → return (bots / GitHub merge noise).
3. `pr` and `release` always (system merge/PR lines).
4. No `commitType` (normal commit) → `firstLastCommit`, `author`, `company`, `scope`, `type`, `timestamp`, `month`, `week`, `beautifulTaskNumbers`, `tasks`, `taskCodes`, `taskNumbersDate`, `absence`, `email`.
5. Has `commitType` (merge / PR / release) → `service` only.

`country` and `team` have no `addCommit`; they are built in `updateTotalInfo` from authors.

## `updateTotalInfo` order

Do not reorder without checking dependents:

1. `author` (needs `firstLastCommit.maxData`) then `team` (sums authors).
2. `scope`, `type`, `timestamp`, `month`, `week`.
3. `recommendations.updateTotalInfo(this)` (`ts/helpers/Recommendations`, not this folder).
4. `tasks` → `taskNumbersDate` / `pr` / `release` (they need task maps) → `tasks.updateTotalInfo2()`.
5. `scoring` (authors + timestamp).
6. `company`, `country`, `taskCodes`, `absence`, `server`, `service`, `email`.

Achievements run **after** this, from the store (`achievement/byCompetition.updateByGrip`). Do not mix achievement ids into dimension `addCommit`.

## Dimensions (`components/`)

| Property | Class | Role |
|----------|--------|------|
| `firstLastCommit` | `MinMaxCounter` | Global min/max commit time + commit objects |
| `author` | `author/` | Per person: days, hours, tasks, money, staff/dismissed. Nested `byHour`, `byTask`, `byCompany` |
| `company` | `company/` | Per company; nested authors and task codes |
| `country` | `country.ts` | From author travel/VPN lists, not raw commits |
| `team` | `team.ts` | One object: sums of author KPIs + hour grid |
| `scope` | `scope/` | Conventional-commit scope; nested `byAuthor` |
| `type` | `type.ts` | feat/fix/… |
| `timestamp` | `timestamp.ts` | **Deprecated** day-keyed maps; scoring still uses it. Prefer `month` / `week` |
| `month` | `month/` | Year-month + `day.ts` for YearChart |
| `week` | `week.ts` | ISO week buckets |
| `tasks` | `tasks.ts` | Tracker id; PR/release attach here in totals |
| `taskCodes` | `taskCodes/` | Prefix (PROJ); nested authors/numbers |
| `taskNumbersDate` | `taskNumbersDate.ts` | First-seen date per task number (backlog) |
| `pr` / `release` | `pr.ts` / `release.ts` | System commits; totals need `tasks` |
| `scoring` | `scoring.ts` | Rank authors on KPI columns |
| `absence` | `absence.ts` | Gaps between an author’s commits |
| `email` | `email.ts` | Email identity over time |
| `server` | `server.ts` | Git remote host from `commit.server` |
| `service` | `service.ts` | Consecutive system-commit runs (skips merge/auto-merge/GitLab PR types) |
| `beautifulTaskNumbers` | `beautifulTaskNumbers.ts` | Pretty task ids (111, 1000, …) per author |
| `recommendations` | `Recommendations` | Filled last as `.team` / `.person` |

`components/extension.ts` is unused here (file extensions live in `StatisticsByFiles`). Do not wire it into this singleton.

Author `getIsStaff` / `isDismissed` and money fields live in `author/helpers.ts`. Staff/bots are still in `author.totalInfo`; team/scoring skip some staff metrics.

## Adding a dimension

1. New class under `components/` with `clear()`, `addCommit(commit)`, `updateTotalInfo(...)`. Copy `type.ts` (simple) or `author/` (nested maps).
2. Construct it on `StatisticsByCommits`, call `clear` in `clear()`, and wire `addCommit` / `updateTotalInfo` in `index.ts` (correct skip + order).
3. UI reads `statisticStore.statisticsByCommits.<name>.totalInfo` (or `totalInfoByName`). Do not keep a second reduce in a plugin if the metric is reused.

During `addCommit`, accumulate in `commits` (Map/object). Convert Sets/Maps to counts and sort only in `updateTotalInfo`.

## Helpers (`helpers/`)

| Export | Use |
|--------|-----|
| `getDaysBetween`, `createMap`, `incrementMap`, `createUniqValues`, `incrementUniqValues` | Shared counters; prefer these over ad-hoc Maps |
| `MinMaxCounter` | Min/max + payload (`firstLastCommit`, lines in a task, …) |
| `getClearTaskMessage` | Strip task/type/scope from a subject for PR/task descriptions |
| `getReleaseAndPR` | Join a task row to PR/release rows (plugins/commit info) |
| `timeToMarket` | Backlog + work + review + release days for a task |

Also use `ts/helpers/Math` (`increment`, `WeightedAverage`, `getDaysFromTo`) and `ONE_DAY` from `ts/helpers/formatter`.

## Conventions

- Stats objects stay `any` like the rest of this tree; do not add a parallel typed model unless you migrate a whole class.
- Commits arrive sorted by `milliseconds` on first ingest. Date filter / depersonalize **rebuilds** from `sourceData.commits`; do not mutate commits in place.
- `totalCommits` passed into `addCommit` is unused by dimensions today; ignore or drop it rather than inventing a use in a plugin.
- Plugins may import helpers (`getReleaseAndPR`, `getTimeToMarketForTask`) and exported types. Do not import a dimension class to mutate it (exception: `PageTeamScope` Calculator instantiates `StatisticsByScope` for a what-if — do not copy that pattern for live stats).
