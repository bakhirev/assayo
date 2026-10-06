export default `
§ plugin.team_weeks.recommendations.lazyDays.down.title: 欠勤が減少した
§ plugin.team_weeks.recommendations.lazyDays.down.description: 過去3週間でこの指標は低下した
§ plugin.team_weeks.recommendations.lazyDays.up.title: 欠勤が増加した
§ plugin.team_weeks.recommendations.lazyDays.up.description: タスクがないか、より厳格な管理が必要である
§ plugin.team_weeks.recommendations.notWork.title: 安定して所定時間に達していない
§ plugin.team_weeks.recommendations.notWork.description: 毎週、時間の100%未満しかコードを書いていないため
§ plugin.team_weeks.recommendations.upWork.title: 安定して超過勤務している
§ plugin.team_weeks.recommendations.upWork.description: 毎週、週末にコードを書いているため
§ plugin.team_weeks.recommendations.task.up.title: 生産性が上昇している
§ plugin.team_weeks.recommendations.task.up.description
またはタスクが細かすぎるようになった。
 
確認が必要である。粒度が同じであれば、結果を定着させる。
§ plugin.team_weeks.recommendations.task.lazyMaintainer.description: commits がない点で安定した首位。
§ plugin.team_weeks.recommendations.task.down.title: 生産性が低下している
§ plugin.team_weeks.recommendations.task.down.description
またはタスクの分割が悪化している。確認が必要である。粒度が同じであれば、管理下に置く。

# 評価方法:
- 作業対象となる1日あたりのタスク数が、過去3週間にわたり安定して減少している。

# 起こり得る誤り:
- タスクは見た目より難しかった可能性がある;
- タスクの作業量が大きかった可能性がある（同じ期間で変更数が減少しているか確認する必要がある）
`;
