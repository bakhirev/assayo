export default `
§ plugin.team_pull_requests.sidebar: 代码合并
§ plugin.team_pull_requests.total.title: 所有 PR 的总体统计
§ plugin.team_pull_requests.total.daysWorkOnTask: 创建 PR 前的平均工作时间
§ plugin.team_pull_requests.total.daysInReview: 平均 PR review 时间
§ plugin.team_pull_requests.total.description1: *工作时间* 是任务的第一个 commit 到最后一个 commit 之间的时间。如果一个任务有多个 PR，则下一个的 *工作时间* 从上一个 PR 的合并日期起算。
§ plugin.team_pull_requests.total.description11: 例如：如果您为一项任务工作一周，并在每天结束时创建并合并一个 PR，那么这些 PR 中每一个的工作时间将是一天。但「该任务的总工作时间」（参见「任务列表」部分）将是一周。
§ plugin.team_pull_requests.total.description2: *Review 时间* 是最后一个 commit 到代码合并之间的时间。它显示等待时的实际停顿时间。
§ plugin.team_pull_requests.author.title: 按员工的统计
§ plugin.team_pull_requests.author.author: 员工
§ plugin.team_pull_requests.author.daysWorkOnTask: PR 前的平均工作时间
§ plugin.team_pull_requests.author.daysInReview: 平均 PR review 时间
§ plugin.team_pull_requests.author.middleTimeRelease: 开发时间与 review 时间
§ plugin.team_pull_requests.author.work: 开发
§ plugin.team_pull_requests.author.review: review
§ plugin.team_pull_requests.yearChart.title: 按年份细分
§ plugin.team_pull_requests.authorChart.title: 按员工细分
§ plugin.team_pull_requests.chart.suffix: pull requests
§ plugin.team_pull_requests.all.title: 与任务关联的 PR
§ plugin.team_pull_requests.all.task: 任务
§ plugin.team_pull_requests.all.pr: PR
§ plugin.team_pull_requests.all.message: commit message 或 branch
§ plugin.team_pull_requests.all.dateCreate: 已创建
§ plugin.team_pull_requests.all.dateMerge: 已合并
§ plugin.team_pull_requests.all.daysWorkOnTask: 开发天数
§ plugin.team_pull_requests.all.daysInReview: review 天数
§ plugin.team_pull_requests.anonymous.title: 没有任务 ID 的 PR
§ plugin.team_pull_requests.anonymous.date: 合并日期
§ plugin.team_pull_requests.anonymous.author: 合并者
§ plugin.team_pull_requests.anonymous.message: commit message 或 branch
§ plugin.team_pull_requests.chart.1day: 天
§ plugin.team_pull_requests.chart.3day: 三天
§ plugin.team_pull_requests.chart.7day: 一周
§ plugin.team_pull_requests.chart.14day: 两周
§ plugin.team_pull_requests.chart.30day: 一个月
§ plugin.team_pull_requests.chart.more: 超过
`;
