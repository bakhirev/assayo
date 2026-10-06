export default `
§ plugin.team_weeks.recommendations.lazyDays.down.title: Fewer absences
§ plugin.team_weeks.recommendations.lazyDays.down.description: this figure has fallen over the last three weeks
§ plugin.team_weeks.recommendations.lazyDays.up.title: More absences
§ plugin.team_weeks.recommendations.lazyDays.up.description: there are no tasks, or tighter control is needed
§ plugin.team_weeks.recommendations.notWork.title: Consistently underworking
§ plugin.team_weeks.recommendations.notWork.description: because every week code is written for less than 100% of the time
§ plugin.team_weeks.recommendations.upWork.title: Consistently overworking
§ plugin.team_weeks.recommendations.upWork.description: because every week code is written on weekends
§ plugin.team_weeks.recommendations.task.up.title: Productivity is rising
§ plugin.team_weeks.recommendations.task.up.description
or the tasks have become too small.
 
This needs to be checked. If the granularity is the same, lock in the result.
§ plugin.team_weeks.recommendations.task.lazyMaintainer.description: a consistent leader in the absence of commits.
§ plugin.team_weeks.recommendations.task.down.title: Productivity is falling
§ plugin.team_weeks.recommendations.task.down.description
or tasks are split up less well. This needs to be checked. If the granularity is the same, place it under control.

# Assessment method:
- the number of tasks per day being worked on has been steadily falling over the last three weeks.

# Possible errors:
- tasks may have been more difficult than they appeared;
- tasks may have involved a large volume of work (check whether the number of changes is falling over the same period)
`;
