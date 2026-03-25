export default `
§ plugin.team_pull_requests.sidebar: 代码注入
§ plugin.team_pull_requests.task: 任务
§ plugin.team_pull_requests.tasks: 任务
§ plugin.team_pull_requests.firstCommitTime: 第一个 Commits
§ plugin.team_pull_requests.lastCommitTime: 最后一次
§ plugin.team_pull_requests.workDays: 完成任务的平均时间
§ plugin.team_pull_requests.delayDays: PR审查的平均时间
§ plugin.team_pull_requests.backlogDays: The delay of the task in the backlog before the start of development
§ plugin.team_pull_requests.all.workDays: 任务完成时间
§ plugin.team_pull_requests.all.delayDays: PR请求的审议时间
§ plugin.team_pull_requests.middleTimeRelease: 开发时间与审查时间的比率
§ plugin.team_pull_requests.chart.1day: day
§ plugin.team_pull_requests.chart.3day: three days
§ plugin.team_pull_requests.chart.7day: week
§ plugin.team_pull_requests.chart.14day: two weeks
§ plugin.team_pull_requests.chart.30day: month
§ plugin.team_pull_requests.chart.more: more
§ plugin.team_pull_requests.date: 注射日期
§ plugin.team_pull_requests.mergeAuthor: 填写
§ plugin.team_pull_requests.author: 雇员
§ plugin.team_pull_requests.work: 发展
§ plugin.team_pull_requests.delay: 期望
§ plugin.team_pull_requests.days: 天数
§ plugin.team_pull_requests.oneTaskDays: 花在一项任务上的时间
§ plugin.team_pull_requests.description1: *花在一项任务上的时间* 这是从第一个到最后一个的时间差 Commits 按任务划分. 如果之间有几天的休息时间也没关系 Commits 还是不是. 任何一个事实 Commits 增加时间.
§ plugin.team_pull_requests.description2: *轮候时间* 这是最后一次之间的时间 Commits 通过输入代码. 它显示了实际的空闲等待的东西.
§ plugin.team_pull_requests.description3: *Task creation date* in the task tracker is calculated by its sequential number and the minimum date of any next Issue in the code. The method has a margin of error and, as a rule, the tasks turn out to be older. Frequent releases, fast bugfixes, and a large number of employees working on the code reduce this margin of error.
§ plugin.team_pull_requests.statByAuthors: 雇员统计数字
§ plugin.team_pull_requests.longDelay: 长时间等待输液
§ plugin.team_pull_requests.anonymous: PR without task number
§ plugin.team_pull_requests.branch: Branch
`;