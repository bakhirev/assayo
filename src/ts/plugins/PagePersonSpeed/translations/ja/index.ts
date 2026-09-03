export default `
§ plugin.person_speed.sidebar: 速度
§ plugin.person_speed.task: 平均して 1 件のタスクは
§ plugin.person_speed.max: 1 日あたりの最大速度
§ plugin.person_speed.days.title: 日
§ plugin.person_speed.days.description: 見つかったタスク数を、commits があった日数で割ります。
§ plugin.person_speed.commits.title: commits
§ plugin.person_speed.commits.description: 最も稀で最大の値の 10% を切り捨てた加重平均。
§ plugin.person_speed.line.title: コード行
§ plugin.person_speed.line.description: 同一タスク内の異なる commits で同じ行が変更されても、システムはそれを区別せず合算します。
§ plugin.person_speed.files.title: ファイル
§ plugin.person_speed.files.description: 最も稀で最大の値の 10% を切り捨てた加重平均。
§ plugin.person_speed.tasks.title: タスク
§ plugin.person_speed.tasks.description: タスクは未完了の場合があります。特定の日に作業した事実のみが記録されます。
§ plugin.person_speed.maxCommits.title: commits
§ plugin.person_speed.maxCommits.description: 特定の 1 日に行われた commits の合計数。1 件のタスク内でも、複数のタスクにわたっても作成され得ます。
`;
