export default `
§ plugin.team_departments.sidebar: Departments
§ plugin.team_departments.employments.title: The size of the current teams
§ plugin.team_departments.employments.item: of teams
§ plugin.team_departments.daysChart.title: Duration of the project
§ plugin.team_departments.daysChart.item: projects
§ plugin.team_departments.title: List of projects
§ plugin.team_departments.code: Code
§ plugin.team_departments.from: First commit
§ plugin.team_departments.to: Last
§ plugin.team_departments.authors: employees
§ plugin.team_departments.tasks: tasks
§ plugin.team_departments.totalDays: Working days
§ plugin.team_departments.totalAuthors: Number of employees
§ plugin.team_departments.months.title: Possible number of employees in the department
§ plugin.team_departments.months.description: It is assumed that the task tracker issues the serial numbers of the tasks. Knowing the maximum task number at the beginning and end of the month, we can find out the number of completed tasks. Knowing how many tasks the authors we know have closed this month, we can interpolate their work speed to all new tasks and assume the total number of employees whose work was not reflected in the git log.
§ plugin.team_departments.months.date: Date
§ plugin.team_departments.months.tasks: New tasks
§ plugin.team_departments.months.tasksInWeek: in week
§ plugin.team_departments.months.fixed: was fixed
§ plugin.team_departments.months.authors: Worked
§ plugin.team_departments.months.allAuthors: total number of employees in the department
`;