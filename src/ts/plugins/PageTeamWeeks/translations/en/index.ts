import recommendations from './recommendations';

export default `
§ plugin.team_weeks.sidebar: By weeks
§ plugin.team_weeks.title: Statistics by weeks
§ plugin.team_weeks.numberTasks: Number of tasks
§ plugin.team_weeks.people: Number of employees
§ plugin.team_weeks.line: Line changes
§ plugin.team_weeks.lossesDetails: Who did not commit
§ plugin.team_weeks.add: added
§ plugin.team_weeks.change: changed
§ plugin.team_weeks.remove: removed
§ plugin.team_weeks.hasCommits: had commits
§ plugin.team_weeks.hasNotCommits: had no commits
§ plugin.team_weeks.last.title: Statistics for the selected week
§ plugin.team_weeks.last.titleDefault: Last week
§ plugin.team_weeks.last.tasks.title: Tasks this week
§ plugin.team_weeks.last.tasks.description: Unique task numbers found in this time range
§ plugin.team_weeks.last.tasks.scoring: Value for the previous week / Average value for the previous month
§ plugin.team_weeks.last.changes.title: Line changes
§ plugin.team_weeks.last.changes.description: Added, changed and removed lines
§ plugin.team_weeks.last.changes.scoring: Value for the previous week / Average value for the previous month
§ plugin.team_weeks.last.types.title: Commit types
§ plugin.team_weeks.last.days.title: Actual person-days
§ plugin.team_weeks.last.best.title: Most active
§ plugin.team_weeks.last.best.description: Most tasks this week
§ plugin.team_weeks.last.quiet.title: Quiet week
§ plugin.team_weeks.last.quiet.description: Fewest tasks this week
§ plugin.team_weeks.last.vsPrev: versus the previous week
${recommendations}
`;
