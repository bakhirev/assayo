export default `
§ plugin.team_pull_requests.sidebar: Code merge
§ plugin.team_pull_requests.total.title: Overall statistics across all PRs
§ plugin.team_pull_requests.total.daysWorkOnTask: Average time spent working before creating a PR
§ plugin.team_pull_requests.total.daysInReview: Average PR review time
§ plugin.team_pull_requests.total.description1: *Work time* is the time between the first and the last commit for a task. If a task has multiple PRs, then the *work time* for the next one is counted from the merge date of the previous PR.
§ plugin.team_pull_requests.total.description11: For example: if you work on a task for a week and at the end of each day create and merge a PR, then the work time for each of these PRs will be one day. But the "total time spent working on the task" (see in the "Task list" section) will be a week.
§ plugin.team_pull_requests.total.description2: *Review time* is the time between the last commit and the code merge. It shows actual downtime while waiting for something.
§ plugin.team_pull_requests.author.title: Statistics by staff members
§ plugin.team_pull_requests.author.author: Staff member
§ plugin.team_pull_requests.author.daysWorkOnTask: Average time spent working before PR
§ plugin.team_pull_requests.author.daysInReview: Average PR review time
§ plugin.team_pull_requests.author.middleTimeRelease: Development time to review time
§ plugin.team_pull_requests.author.work: work
§ plugin.team_pull_requests.author.review: review
§ plugin.team_pull_requests.yearChart.title: Breakdown by years
§ plugin.team_pull_requests.authorChart.title: Breakdown by staff members
§ plugin.team_pull_requests.chart.suffix: pull requests
§ plugin.team_pull_requests.all.title: PRs linked to tasks
§ plugin.team_pull_requests.all.task: Task
§ plugin.team_pull_requests.all.pr: PR
§ plugin.team_pull_requests.all.message: Commit message or branch
§ plugin.team_pull_requests.all.dateCreate: Created
§ plugin.team_pull_requests.all.dateMerge: Merged
§ plugin.team_pull_requests.all.daysWorkOnTask: Days in development
§ plugin.team_pull_requests.all.daysInReview: Days in review
§ plugin.team_pull_requests.anonymous.title: PRs without task IDs
§ plugin.team_pull_requests.anonymous.date: Merge date
§ plugin.team_pull_requests.anonymous.author: Merged by
§ plugin.team_pull_requests.anonymous.message: Commit message or branch
§ plugin.team_pull_requests.chart.1day: day
§ plugin.team_pull_requests.chart.3day: three days
§ plugin.team_pull_requests.chart.7day: week
§ plugin.team_pull_requests.chart.14day: two weeks
§ plugin.team_pull_requests.chart.30day: month
§ plugin.team_pull_requests.chart.more: more than
`;
