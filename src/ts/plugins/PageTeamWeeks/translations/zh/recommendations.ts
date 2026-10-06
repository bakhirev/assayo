export default `
§ plugin.team_weeks.recommendations.lazyDays.down.title: 缺勤减少
§ plugin.team_weeks.recommendations.lazyDays.down.description: 近三周该指标已下降
§ plugin.team_weeks.recommendations.lazyDays.up.title: 缺勤增加
§ plugin.team_weeks.recommendations.lazyDays.up.description: 没有任务，或需要更严格的管控
§ plugin.team_weeks.recommendations.notWork.title: 持续未满负荷工作
§ plugin.team_weeks.recommendations.notWork.description: 因为每周编写代码的时间不足 100%
§ plugin.team_weeks.recommendations.upWork.title: 持续加班
§ plugin.team_weeks.recommendations.upWork.description: 因为每周在周末编写代码
§ plugin.team_weeks.recommendations.task.up.title: 生产率正在上升
§ plugin.team_weeks.recommendations.task.up.description
或者任务变得过小。
 
需要核实。若粒度相同，则巩固该结果。
§ plugin.team_weeks.recommendations.task.lazyMaintainer.description: 在缺少 commits 方面稳定领先。
§ plugin.team_weeks.recommendations.task.down.title: 生产率正在下降
§ plugin.team_weeks.recommendations.task.down.description
或者任务拆分变差。需要核实。若粒度相同，则纳入管控。

# 评估方法:
- 每天正在处理的任务数量在近三周持续下降。

# 可能的误差:
- 任务可能比看起来更难；
- 任务的工作量可能很大（需核实同期变更数量是否下降）
`;
