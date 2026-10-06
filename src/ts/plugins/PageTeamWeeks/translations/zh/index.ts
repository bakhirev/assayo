import recommendations from './recommendations';

export default `
§ plugin.team_weeks.sidebar: 按周
§ plugin.team_weeks.title: 按周统计
§ plugin.team_weeks.numberTasks: 任务数量
§ plugin.team_weeks.people: 员工人数
§ plugin.team_weeks.line: 行变更
§ plugin.team_weeks.lossesDetails: 谁没有做 commit
§ plugin.team_weeks.add: 已添加
§ plugin.team_weeks.change: 已修改
§ plugin.team_weeks.remove: 已删除
§ plugin.team_weeks.hasCommits: 有 commits
§ plugin.team_weeks.hasNotCommits: 没有 commits
§ plugin.team_weeks.last.title: 所选周的统计
§ plugin.team_weeks.last.titleDefault: 上一周
§ plugin.team_weeks.last.tasks.title: 本周任务
§ plugin.team_weeks.last.tasks.description: 在该时间范围内发现的唯一任务编号
§ plugin.team_weeks.last.tasks.scoring: 上一周的值 / 上一月的平均值
§ plugin.team_weeks.last.changes.title: 行变更
§ plugin.team_weeks.last.changes.description: 新增、修改和删除的行
§ plugin.team_weeks.last.changes.scoring: 上一周的值 / 上一月的平均值
§ plugin.team_weeks.last.types.title: commit 类型
§ plugin.team_weeks.last.days.title: 实际人日
§ plugin.team_weeks.last.best.title: 最活跃
§ plugin.team_weeks.last.best.description: 本周任务最多
§ plugin.team_weeks.last.quiet.title: 安静的一周
§ plugin.team_weeks.last.quiet.description: 本周任务最少
§ plugin.team_weeks.last.vsPrev: 对比上周
${recommendations}
`;
