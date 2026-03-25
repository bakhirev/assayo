export default `
§ plugin.person_speed.sidebar: Speed
§ plugin.person_speed.task: One task on average is
§ plugin.person_speed.max: Maximum speed per day
§ plugin.person_speed.days.title: days
§ plugin.person_speed.days.description: The number of tasks found is divided by the number of days when there were commits.
§ plugin.person_speed.commits.title: commits
§ plugin.person_speed.commits.description: Weighted average trimmed by 10% of the rarest and largest values.
§ plugin.person_speed.line.title: lines of code
§ plugin.person_speed.line.description: The system does not recognize changes to the same lines in different commits within a single task. They are summed up.
§ plugin.person_speed.files.title: files
§ plugin.person_speed.files.description: Weighted average trimmed by 10% of the rarest and largest values.
§ plugin.person_speed.tasks.title: tasks
§ plugin.person_speed.tasks.description: A task may be unfinished. Only the fact of working on it within a specific day is recorded.
§ plugin.person_speed.maxCommits.title: commits
§ plugin.person_speed.maxCommits.description: Total number of commits made during one specific day. They can be made within one task or while working on different tasks.
`;