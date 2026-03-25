export default `
§ plugin.team_pull_requests.sidebar: Inyección de código
§ plugin.team_pull_requests.task: Tarea
§ plugin.team_pull_requests.tasks: tareas
§ plugin.team_pull_requests.firstCommitTime: Primer commits
§ plugin.team_pull_requests.lastCommitTime: Last
§ plugin.team_pull_requests.workDays: Average time spent working on a task
§ plugin.team_pull_requests.delayDays: Average time of the PR review
§ plugin.team_pull_requests.backlogDays: The delay of the task in the backlog before the start of development
§ plugin.team_pull_requests.all.workDays: Time spent working on a task
§ plugin.team_pull_requests.all.delayDays: Time of the PR review
§ plugin.team_pull_requests.middleTimeRelease: The ratio of development time to review time
§ plugin.team_pull_requests.chart.1day: day
§ plugin.team_pull_requests.chart.3day: three days
§ plugin.team_pull_requests.chart.7day: week
§ plugin.team_pull_requests.chart.14day: two weeks
§ plugin.team_pull_requests.chart.30day: month
§ plugin.team_pull_requests.chart.more: more
§ plugin.team_pull_requests.date: Date of injection
§ plugin.team_pull_requests.mergeAuthor: I poured it in
§ plugin.team_pull_requests.author: Employee
§ plugin.team_pull_requests.work: development
§ plugin.team_pull_requests.delay: expectation
§ plugin.team_pull_requests.days: days
§ plugin.team_pull_requests.oneTaskDays: Time spent on one task
§ plugin.team_pull_requests.description1: *Development time* this is the time difference from the first to the last commits for the task. It doesn't matter if there were breaks of several days between commits or not. The very fact of any commits increases the time.
§ plugin.team_pull_requests.description2: *Waiting time* this is the time between the last commit and the code injection. It shows the actual idle waiting for something.
§ plugin.team_pull_requests.description3: *Task creation date* in the task tracker is calculated by its sequential number and the minimum date of any next Issue in the code. The method has a margin of error and, as a rule, the tasks turn out to be older. Frequent releases, fast bugfixes, and a large number of employees working on the code reduce this margin of error.
§ plugin.team_pull_requests.statByAuthors: Employee statistics
§ plugin.team_pull_requests.longDelay: Long wait for infusion
§ plugin.team_pull_requests.anonymous: PR without task number
§ plugin.team_pull_requests.branch: Branch
`;