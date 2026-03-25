export default `
§ plugin.team_total.sidebar: Common info
§ plugin.team_total.common.title: About the project
§ plugin.team_total.workSpeed.title: tasks per day
§ plugin.team_total.workSpeed.description: Average team throughput with the current staff composition
§ plugin.team_total.employment.title: works / left
§ plugin.team_total.employment.description: If a staff member did not make a single commit within a month, they are considered to have left
§ plugin.team_total.common.duration.title: total work duration
§ plugin.team_total.common.duration.description: Total development time from the first to the last commit.
§ plugin.team_total.common.location.title: head office
§ plugin.team_total.common.location.description: Most popular location for the current core staff composition.
§ plugin.team_total.common.employees.title: people in the department
§ plugin.team_total.common.employees.description: Based on the forecast of total staff size by the change rate of task IDs.
§ plugin.team_total.release.title: Release information
§ plugin.team_total.release.total.title: total releases
§ plugin.team_total.release.total.description: A release is a branch with the word "release". As a rule, they appear in "auto-merge" events.
§ plugin.team_total.money.title: Development cost estimate
§ plugin.team_total.moneyAll.title: total
§ plugin.team_total.moneyAll.description: Total payroll costs, including vacation pay and overpayment for weekend work.
§ plugin.team_total.moneyWorked.title: actual
§ plugin.team_total.moneyWorked.description: Actual days worked multiplied by the average salary.
§ plugin.team_total.moneyLosses.title: possible overpayment
§ plugin.team_total.moneyLosses.description: Paid workdays when there were no commits.
§ plugin.team_total.weekendPayment.title: weekend work
§ plugin.team_total.weekendPayment.description: Total overpayment for weekend work.
§ plugin.team_total.moneySpeed.title: per month
§ plugin.team_total.moneySpeed.description: Forecasted payroll amount with the current staff composition, excluding taxes, equipment depreciation, and related costs.
§ plugin.team_total.forecastingMoneyAll.title: project costs over time
§ plugin.team_total.forecastingMoneyAll.description: Possible payroll amount over time for all potential staff members of the department who are not present in the logs but could have been (based on task ID numbering in the task tracker).    
§ plugin.team_total.description1: *Person days* are the work of one staff member during one working day. For example, in one calendar day, a team of three staff members delivers a work volume of three person days.
§ plugin.team_total.description2: *Absence days* include only working days when commits could have been made. Weekends, public holidays, and vacations are not included in the calculation.
§ plugin.team_total.description3: The *works / left* card shows the actual staff members who are consistently involved in the work. In addition, there are “staff” — typically people with a different specialization who may occasionally make commits to the project.
§ plugin.team_total.description4: *Overpayment* includes only working days when commits could have been made. Weekends, public holidays, and vacations are not included in the calculation. That is why overpayment + actual cost != total. The total cost includes payments for weekends, public holidays, and vacations.
§ plugin.team_total.description5: *Weekend work* is calculated using a x2 coefficient relative to a regular day’s pay. Only the overpayment (x1) is shown above, because the overtime fact itself is not important in this context. We are not looking at budget burn rate. We are looking at overpayment when work speed increases.
`;
