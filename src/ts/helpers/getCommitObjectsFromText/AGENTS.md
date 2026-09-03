# getCommitObjectsFromText

Line parser for Assayo dumps. Turns `git log` text into `ICommit | ISystemCommit[]`. Not React. Callers: `StatisticsByCommitsStore.processingStringToCommit`. Downstream aggregators read the objects; do not parse dump lines in plugins.

```ts
import getCommitObjectsFromText from 'ts/helpers/getCommitObjectsFromText';
```

Expected dump (see root README): `--raw --numstat --pretty=format:"%ad>%aN>%aE>%s"` with `--date=iso-strict`. Parser is tolerant; a bad date or message still yields a commit.

## Line loop (`index.ts`)

Walk `string[]` in order. Skip empty lines. First character decides the kind of line:

| Line | Detect | Action |
|------|--------|--------|
| `--raw` | starts with `:` | `getRawInfo` + `getInfoFromPath`; push onto the current file list (`action` A/M/D/R…) |
| `--numstat` | tab in positions 1–7 (`isNumStatLine`) | `getNumStatInfo`; merge added/removed/changed into `files[fileNumIndex]` (or create a path-only entry); add to commit totals |
| Header | otherwise | flush previous `fileChanges`, `getCommitInfo`, set `week`, push commit |

`week` is **not** ISO week. It is relative to the **first header in this dump**: that commit’s Monday is week `0`. Later headers get `floor((firstMonday - monday) / ONE_WEEK)`. The store sorts by `milliseconds` after parse; week numbers stay as computed.

`fileChanges` attach when the **next** header is seen. After the last header, remaining `--raw` / `--numstat` lines are not flushed onto that commit unless you add an end-of-loop assign. If you change the loop, keep that flush explicit.

At the end always `clearRenameCache()` and `clearCache()` (module-level Maps / PR id counter). A second parse without clear mixes authors and `prId`.

Do not call `getCommitInfo` from aggregators. Re-parse the dump via the store.

## Header (`getCommitInfo`)

Shape: `date>author>email>subject`. Split on `>` only for the first three fields. Subject is the rest of the string (`substring` after the three parts) so `>` inside the message is kept.

Invalid `Date` → reuse the previous header’s date (`prevDate`). `day` is Monday=0 … Sunday=6 (`getDay() - 1`, Sunday → 6). `year` is `getUTCFullYear()`. `timezone` is `sourceDate.substring(19, 25)` (ISO offset). `timestamp` is the first 10 chars (`YYYY-MM-DD`).

Author/email/company/country/device come from `getEmailAuthor(parts, timezone)`.

If the subject looks like a merge/PR, return `ISystemCommit` (`commitType` from `COMMIT_TYPE`). Else return `ICommit` with `added` / `removed` / `changes` starting at `0` (filled later from numstat).

System prefixes (order in code):

- GitHub: `Merge pull request #` → `PR_GITHUB`, `getGithubPrInfo`
- Bitbucket: `Pull request #` → `PR_BITBUCKET`
- `Automatic merge from` → `AUTO_MERGE`
- `Merge commit ` / `Merge remote-tracking branch` / `Merge branch ` → `MERGE`
- GitLab PR (`getGitlabPrInfo`) is wired but `isGitlabPR` is hardcoded `false`

`prId` is a per-parse counter (`uniqPrId`), not the GitHub number (`prExternalId`). Task/type/scope for PRs are parsed from the branch or Bitbucket description.

## Message (`getTypeAndScope`)

Conventional-ish, not strict. Task first: `ABC-123`, `#123`, `gh-123` / `GH-123` (`getTask`). Strip that, then `type(scope):` or a substring from `POPULAR_TYPES`. Aliases: `add`→`feat`, `remove`/`delete`/`update`/`improve`/`optimize`/`rename`→`refactor`, `eslint`→`style`. `getTaskCode` keeps letters (`ABC`); `getTaskNumber` keeps digits (cached `parseInt`).

Do not require a perfect conventional message to ingest a line.

## Files (`getFileChanges`)

- `getRawInfo` — prefers a tab at index 36 (fixed-width hashes); else last tab-separated field. `action` is the last character of the meta chunk (`A`, `M`, `D`, `R`…).
- `getNumStatInfo` — tab split by character index (hot path). Git’s added/removed are rewritten: overlapping lines become `changedLines`; only the remainder stays added or removed.
- `getInfoFromPath` — `id` is lowercased path; rename `path{old => new}` fills `newId` when it differs. Quoted octal paths: strip `"`.

## Identity (`getEmailAuthor`, `getInfoFromEmail`)

First-seen author spelling and email win for later aliases (same normalized name, or same email). Display name is spaced (`getFormattedName`). Returned `email` is still `parts[2]` (original), not the aliased one.

Company: `[TAG]` in the author name, else second-level domain when `emailType` is `COMPANY` / `ACCOUNT` (skip `dev` / `local` / `prod` and extra subdomains). Country: timezone table in `getCountryByTimeZone`, then TLD (`getCountryByDomain` maps), then name-suffix heuristics. Device: MacBook-like tokens in the email (`MACBOOK`, `-AIR`, `-IMAC`).

`getInfoFromEmail` also computes `yearOfBirth` and `githubLogin`; they are not copied onto the commit today. `getDevice.ts` is unused (device lives in `getInfoFromEmail`).

`getVpnList` / `getTravels` (`getCountryDistance`) are for `StatisticsByCommits/components/country`, not the line loop.

## Conventions

- Types: `ts/interfaces/Commit.ts` (`ICommit`, `ISystemCommit`, `IFileChange`, `COMMIT_TYPE`, `EmailType`).
- Keep this folder side-effect caches reset at the end of every full parse.
- Prefer extending prefix checks / `POPULAR_TYPES` / timezone `LINE` over a second parser.
- Hot path: dumps can be huge. Avoid `split('\t')` on every numstat line; match existing index scans.
- No i18n, no MobX, no JSX here.
