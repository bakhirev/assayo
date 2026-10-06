import recommendations from './recommendations';

export default `
§ plugin.team_weeks.sidebar: 週別
§ plugin.team_weeks.title: 週別統計
§ plugin.team_weeks.numberTasks: タスク数
§ plugin.team_weeks.people: スタッフ数
§ plugin.team_weeks.line: 行の変更
§ plugin.team_weeks.lossesDetails: commit しなかった人
§ plugin.team_weeks.add: 追加
§ plugin.team_weeks.change: 変更
§ plugin.team_weeks.remove: 削除
§ plugin.team_weeks.hasCommits: commits があった
§ plugin.team_weeks.hasNotCommits: commits がなかった
§ plugin.team_weeks.last.title: 選択した週の統計
§ plugin.team_weeks.last.titleDefault: 直近の週
§ plugin.team_weeks.last.tasks.title: 今週のタスク
§ plugin.team_weeks.last.tasks.description: この期間に見つかった一意のタスク番号
§ plugin.team_weeks.last.tasks.scoring: 前週の値 / 前月の平均値
§ plugin.team_weeks.last.changes.title: 行の変更
§ plugin.team_weeks.last.changes.description: 追加、変更、削除された行
§ plugin.team_weeks.last.changes.scoring: 前週の値 / 前月の平均値
§ plugin.team_weeks.last.types.title: commit の種類
§ plugin.team_weeks.last.days.title: 実際の人日
§ plugin.team_weeks.last.best.title: 最も活発
§ plugin.team_weeks.last.best.description: 今週のタスクが最多
§ plugin.team_weeks.last.quiet.title: 静かな週
§ plugin.team_weeks.last.quiet.description: 今週のタスクが最少
§ plugin.team_weeks.last.vsPrev: 前週比
${recommendations}
`;
