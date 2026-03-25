export default `
§ plugin.team_departments.sidebar: Departments
§ plugin.team_departments.employmentsChart.title: Current team sizes
§ plugin.team_departments.employmentsChart.item: teams
§ plugin.team_departments.employmentsChart.less1: one staff member
§ plugin.team_departments.employmentsChart.less2: two staff members
§ plugin.team_departments.employmentsChart.less3: three staff members
§ plugin.team_departments.employmentsChart.less6: up to six staff members
§ plugin.team_departments.employmentsChart.less9: up to nine staff members
§ plugin.team_departments.employmentsChart.less12: up to 12 staff members
§ plugin.team_departments.employmentsChart.less15: up to 15 staff members
§ plugin.team_departments.employmentsChart.more: more than 15
§ plugin.team_departments.daysChart.title: Project duration
§ plugin.team_departments.daysChart.item: projects
§ plugin.team_departments.title: Project list
§ plugin.team_departments.status: Status
§ plugin.team_departments.active.yes: Development in progress
§ plugin.team_departments.active.no: No new tasks
§ plugin.team_departments.author.work: works
§ plugin.team_departments.author.dismissed: left
§ plugin.team_departments.author.staff: staff
§ plugin.team_departments.code: Code
§ plugin.team_departments.from: First commit
§ plugin.team_departments.to: Last
§ plugin.team_departments.authors: people
§ plugin.team_departments.tasks: tasks
§ plugin.team_departments.totalDays: Duration
§ plugin.team_departments.totalAuthors: Staff members
§ plugin.team_departments.totalTasks: Tasks
§ plugin.team_departments.employments.author: Staff member
§ plugin.team_departments.employments.worked: work
§ plugin.team_departments.employments.losses: days without commits
§ plugin.team_departments.employments.totalDays: Days in department
§ plugin.team_departments.employments.totalTasks: Tasks completed
§ plugin.team_departments.details.title: Actual department data
§ plugin.team_departments.details.totalDays: work duration
§ plugin.team_departments.details.moneyInMonth: development cost per month
§ plugin.team_departments.details.moneyAll: development cost over time
§ plugin.team_departments.details.mainLocation: main location
§ plugin.team_departments.details.activeAuthors.title: works / left
§ plugin.team_departments.details.activeAuthors.description: If a staff member did not make a single commit within a month, they are considered to have left. The status is shown for staff members regardless of this department: they may work in any department or have left the company completely.
§ plugin.team_departments.details.linesInTask.title: lines of code per task
§ plugin.team_departments.details.linesInTask.description: Weighted average number of lines of code per task. Helps estimate task granularity.
§ plugin.team_departments.details.totalTasks.title: tasks were in work
§ plugin.team_departments.details.totalTasks.description: Any mention of a unique task ID is counted. The task may not have been closed in the task tracker.
§ plugin.team_departments.months.title: Possible number of staff members in the department
§ plugin.team_departments.months.description: The task tracker issues sequential task IDs. Knowing the maximum task ID at the beginning and end of the month, we can find the number of *new tasks*. The number of tasks *fixed* this month is visible in the logs. Who fixed them (*worked*) is also visible. The number of tasks fixed later (*backlog*) is also calculated from the logs of subsequent months. We extrapolate the throughput of the programmers we see to the total number of tasks to estimate how many *total programmers* should be in the department. Based on the number of "programmers", we estimate the number of QA engineers, analysts, and managers.
§ plugin.team_departments.months.newTaskInMonth: New tasks
§ plugin.team_departments.months.tasksFixedThisGroup: Fixed
§ plugin.team_departments.months.tasksInBacklog: Backlog
§ plugin.team_departments.months.programmistInThisGroup: Worked
§ plugin.team_departments.months.allProgrammistInDepartment: Should work
§ plugin.team_departments.months.allUsersInDepartment: Total staff
§ plugin.team_departments.forecasting.title: Full cost forecast
§ plugin.team_departments.forecasting.moneyInMonth.title: department costs per month
§ plugin.team_departments.forecasting.moneyInMonth.description: Multiply the number of all potential staff members (development, QA, analytics, management) for the last month by the average salary.
§ plugin.team_departments.forecasting.moneyAll.title: department costs over time
§ plugin.team_departments.forecasting.moneyAll.description: Multiply the number of all potential staff members (development, QA, analytics, management) for each month by the average salary.
`;
