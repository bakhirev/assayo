export default `
§ plugin.team_pull_requests.sidebar: Code einfüllen
§ plugin.team_pull_requests.task: Task
§ plugin.team_pull_requests.tasks: tasks
§ plugin.team_pull_requests.firstCommitTime: First commit
§ plugin.team_pull_requests.lastCommitTime: Last
§ plugin.team_pull_requests.workDays: Development days
§ plugin.team_pull_requests.delayDays: Days waiting for merge
§ plugin.team_pull_requests.backlogDays: The delay of the task in the backlog before the start of development
§ plugin.team_pull_requests.middleTimeRelease: Average delivery time (days)
§ plugin.team_pull_requests.chart.1day: day
§ plugin.team_pull_requests.chart.3day: three days
§ plugin.team_pull_requests.chart.7day: week
§ plugin.team_pull_requests.chart.14day: two weeks
§ plugin.team_pull_requests.chart.30day: month
§ plugin.team_pull_requests.chart.more: more
§ plugin.team_pull_requests.date: Merge Date
§ plugin.team_pull_requests.mergeAuthor: Merged by
§ plugin.team_pull_requests.author: Employee
§ plugin.team_pull_requests.work: development
§ plugin.team_pull_requests.delay: waiting
§ plugin.team_pull_requests.days: days
§ plugin.team_pull_requests.oneTaskDays: Time spent on one task
§ plugin.team_pull_requests.description1: *Development time* is the time difference from the first to the last commit on a task. It does not matter if there were breaks of several days between commits or not. Any commit increases the time.
§ plugin.team_pull_requests.description2: *Waiting time* is the time between the last commit and the code merge. It shows the actual downtime while waiting for something.
§ plugin.team_pull_requests.description3: *Task creation date* in the task tracker is calculated by its sequential number and the minimum date of any next Issue in the code. The method has a margin of error and, as a rule, the tasks turn out to be older. Frequent releases, fast bugfixes, and a large number of employees working on the code reduce this margin of error.
§ plugin.team_pull_requests.statByAuthors: Statistics by employees
§ plugin.team_pull_requests.longDelay: Prolonged Waiting for merge
§ plugin.team_pull_requests.anonymous: PR without task number
§ plugin.team_pull_requests.branch: Branch
`;