export default `
§ page.welcome.step1: Execute the command in the root of your project.
§ page.welcome.step3: Drag and drop
§ page.welcome.step4: the log.txt file onto this page.
§ page.welcome.description: Git will create a log.txt file. It contains data for report generation. Or use git shortlog -s -n -e if you don't need a report. Create a [.mailmap|https://git-scm.com/docs/gitmailmap] file in the root of the project to consolidate employee statistics.
§ page.welcome.warning1: The service *DOES NOT SAVE* and *DOES NOT TRANSFER* your data. All calculations are performed locally in your browser on your machine.
§ page.welcome.warning2: The service *DOES NOT COLLECT STATISTICS* on projects. You can disconnect the internet, check traffic, and even build a local version from the [source|https://github.com/bakhirev/assayo].
§ page.common.words.title: Word Statistics.
§ page.common.words.description: the most popular word. Occurs $1 times.
§ page.common.commits.title: Number of commits by days.
§ page.common.commits.description: ($1) the most productive day in terms of the number of commits.
§ page.common.commits.title2: $1 commits made: $2
§ page.common.filter.allUsers: Does not matter
§ page.print.modal.title: What are we printing?
§ page.print.modal.page: Current page
§ page.print.modal.type: Current section
§ page.print.modal.all: All statistics
§ page.print.modal.cancel: Cancel
§ page.print.tableOfContents: Table of contents
§ page.print.title: Git repository report
§ page.print.sub_title: «$1»
§ page.print.description: The data for the report was obtained from the commit history.
§ page.team.author.statusChart.title: Status
§ page.team.author.daysChart.title: Days of work
§ page.team.author.daysChart.item: days
§ page.team.author.days.half: half year
§ page.team.author.days.one: year
§ page.team.author.days.15: year and a half
§ page.team.author.days.two: two years
§ page.team.author.days.more: more than two years
§ page.team.author.title: Details
§ page.team.author.description1: *Part of the statistics* (work speed, costs, etc.) *for employees with the 'Assistant' type is not counted*, as it is an episodic role in the project. It is assumed that they do not affect the project, and their edits can be disregarded in the context of the overall volume of work.
§ page.team.author.description2: *Default sorting* is by the number of tasks and groups (current, fired, assisting employees).
§ page.team.author.status: Status
§ page.team.author.company: Company
§ page.team.author.firstCommit: First commit
§ page.team.author.lastCommit: Last
§ page.team.author.daysAll: Total days
§ page.team.author.types: Types of work
§ page.team.author.commits: Commits
§ page.team.author.commitsSmall: commits
§ page.team.author.tasks: Tasks
§ page.team.author.tasksSmall: tasks
§ page.team.author.workedLosses: Days with and without commits
§ page.team.author.worked: work
§ page.team.author.losses: days without commits
§ page.team.author.days: days
§ page.team.author.daysForTask: Days per task
§ page.team.author.scopes: Features
§ page.team.author.moneyAll: Received
§ page.team.author.moneyWorked: Worked for
§ page.team.author.moneyLosses: Overpayment
§ page.team.author.type.work: works
§ page.team.author.type.dismissed: dismissed
§ page.team.author.type.staff: staff
§ page.team.hours.title: Distribution of commits during each day of the week
§ page.team.month.title: Project work calendar
§ page.team.month.first: (first work day)
§ page.team.month.last: (last work day)
§ page.team.month.authors: All employees
§ page.team.month.types: All types
§ page.team.scope.title: Feature statistics
§ page.team.scope.scope: Feature
§ page.team.scope.days: Working Days
§ page.team.scope.authorsDays: Person-Days
§ page.team.scope.tasks: Tasks
§ page.team.scope.commits: Commits
§ page.team.scope.commitsSmall: commits
§ page.team.scope.types: Types of work
§ page.team.scope.authors: Personal contribution
§ page.team.scope.cost: Cost
§ page.team.type.title: Task type statistics
§ page.team.type.description: *Personal contribution* is counted by the number of commits, not the volume of changed lines or files. Therefore, the "File Analysis" section should also be consulted to assess the scale of changes.
§ page.team.type.type: Type of work
§ page.team.type.unknown: unknown
§ page.team.type.tasks: Tasks
§ page.team.type.tasksSmall: tasks
§ page.team.type.days: Days
§ page.team.type.daysSmall: days
§ page.team.type.authorsDays: Person-days
§ page.team.type.commits: Commits
§ page.team.type.authors: Personal contribution
§ page.team.total.titleA: Volume of work
§ page.team.total.titleB: Cost
§ page.team.total.daysWorked.title: person-days
§ page.team.total.daysWorked.description: Only days with commits are counted
§ page.team.total.commits.title: commits
§ page.team.total.commits.description: Deleted branches are not counted
§ page.team.total.daysLosses.title: days without commits
§ page.team.total.daysLosses.description: All days minus: holidays, weekends, vacation, days with commits
§ page.team.total.employment.title: working / dismissed
§ page.team.total.employment.description: If an employee does not make any commits within a month, they are considered dismissed
§ page.team.total.moneyAll.title: total
§ page.team.total.moneyAll.description: Total salary expenses
§ page.team.total.moneyWorked.title: actual
§ page.team.total.moneyWorked.description: Actual days worked multiplied by average salary
§ page.team.total.moneyLosses.title: possible overpayment
§ page.team.total.moneyLosses.description: Paid working days when there were no commits
§ page.team.total.weekendPayment.title: weekend work
§ page.team.total.weekendPayment.description: Total overpayment for weekend work
§ page.team.total.workSpeed.title: tasks per day
§ page.team.total.workSpeed.description: Average work speed of the team with the current composition of employees
§ page.team.total.moneySpeed.title: per month
§ page.team.total.moneySpeed.description: Forecasted salary payment amount with the current team composition, excluding taxes and related expenses
§ page.team.total.description1: *Person-days* — the work of one employee during a single working day. For example, in one calendar day, a team of three employees produces a work volume of three person-days.
§ page.team.total.description2: *Absentee days* are counted only as working days when commits could have been made. Weekends, public holidays, and vacations are not included in the calculation.
§ page.team.total.description3: The *working and dismissed* card shows the actual composition of employees who are continuously involved in work. Additionally, there are "assistants" — typically employees of a different specialization who may occasionally make commits to the project.
§ page.team.total.description4: *Overpayment* includes only working days when commits could have been made. Weekends, public holidays, and vacations are not included in the calculation. This is why overpayment + actual cost != total. The total cost includes payment for weekends, public holidays, and vacations.
§ page.team.total.description5: *Weekend work* is calculated at a rate of x2 the payment of a regular day. The displayed amount is specifically the overpayment (x1), as the fact of overtime in this context is not of interest. We focus on overpayment when increasing work speed.
§ page.team.tree.title: Project tree considering selected filters
§ page.team.tree.filters.author: Employee
§ page.team.tree.filters.commits: Number of commits
§ page.team.tree.filters.help: The minimum number of commits an employee has made in a file
§ page.team.tree.filters.all: All employees
§ page.team.tree.totalLines: Lines
§ page.team.tree.totalTasks: Tasks
§ page.team.tree.totalDays: Days
§ page.team.tree.tasks: tasks
§ page.team.tree.days: days
§ page.team.tree.add: Who added
§ page.team.tree.change: Who changed
§ page.team.tree.remove: Who removed
§ page.team.tree.line: lines
§ page.team.tree.linesAdded: added
§ page.team.tree.linesChanged: changed
§ page.team.tree.linesRemoved: removed
§ page.team.company.title: Details
§ page.team.company.employments.title: By number of employees
§ page.team.company.employments.item: employments
§ page.team.company.daysChart.title: By duration of the contract
§ page.team.company.daysChart.item: companies
§ page.team.company.active.yes: active
§ page.team.company.active.no: contract has expired
§ page.team.country.byTimezone: By the time of the last commit
§ page.team.country.filters.active: Works
§ page.team.country.filters.dismissed: Dismissed
§ page.team.country.filters.staff: Staff
§ page.team.country.pieByDomain.title: By email, timezone and language
§ page.team.country.pieByTimezone.title: By timezone
§ page.team.country.chart.item: employments
§ page.team.country.table.title: List of employees
§ page.team.country.table.country: Country
§ page.team.country.table.employments: Employments
§ page.team.country.travel.title: Trips (or VPN, or rebase)
§ page.team.country.travel.author: Employee
§ page.team.country.travel.fly: Number of flights
§ page.team.country.travel.path: Locations list
§ page.team.country.travel.date: Arrival date
§ page.team.country.travel.country: Location
§ page.team.refactor.title: Candidates for refactoring
§ page.team.refactor.lines: lines
§ page.team.refactor.tasks: tasks
§ page.team.refactor.days: days
§ page.team.refactor.path: Path
§ page.team.refactor.firstCommit: First commit
§ page.team.refactor.totalLines: Lines
§ page.team.refactor.totalTasks: Tasks
§ page.team.refactor.totalDays: Days in development
§ page.team.day.commits: Commits
§ page.team.day.activity: Activity
§ page.team.week.title: Weekly statistics
§ page.team.week.date: Date
§ page.team.week.numberTasks: Number of tasks
§ page.team.week.people: Number of people
§ page.team.week.line: Line changes
§ page.team.week.days: Days with and without commits
§ page.team.week.lossesDetails: Who did not commit
§ page.team.week.add: added
§ page.team.week.change: changed
§ page.team.week.remove: removed
§ page.team.week.hasCommits: had commits
§ page.team.week.hasNotCommits: had no commits
§ page.team.week.days: days
§ page.team.week.tasks: tasks
§ page.team.pr.task: Task
§ page.team.pr.tasks: tasks
§ page.team.pr.firstCommitTime: First commit
§ page.team.pr.lastCommitTime: Last
§ page.team.pr.workDays: Development days
§ page.team.pr.delayDays: Days waiting for merge
§ page.team.pr.backlogDays: The delay of the task in the backlog before the start of development
§ page.team.pr.middleTimeRelease: Average delivery time (days)
§ page.team.pr.chart.1day: day
§ page.team.pr.chart.3day: three days
§ page.team.pr.chart.7day: week
§ page.team.pr.chart.14day: two weeks
§ page.team.pr.chart.30day: month
§ page.team.pr.chart.more: more
§ page.team.pr.date: Merge Date
§ page.team.pr.mergeAuthor: Merged by
§ page.team.pr.author: Employee
§ page.team.pr.work: development
§ page.team.pr.delay: waiting
§ page.team.pr.days: days
§ page.team.pr.oneTaskDays: Time spent on one task
§ page.team.pr.description1: *Development time* is the time difference from the first to the last commit on a task. It does not matter if there were breaks of several days between commits or not. Any commit increases the time.
§ page.team.pr.description2: *Waiting time* is the time between the last commit and the code merge. It shows the actual downtime while waiting for something.
§ page.team.pr.description3: *Task creation date* in the task tracker is calculated by its sequential number and the minimum date of any next Issue in the code. The method has a margin of error and, as a rule, the tasks turn out to be older. Frequent releases, fast bugfixes, and a large number of employees working on the code reduce this margin of error.
§ page.team.pr.statByAuthors: Statistics by employees
§ page.team.pr.longDelay: Prolonged Waiting for merge
§ page.team.pr.anonymous: PR without task number
§ page.team.pr.branch: Branch
§ page.team.tasks.task: Task
§ page.team.tasks.author: First commit author
§ page.team.tasks.createdBefore: Created before
§ page.team.tasks.backlog: Development waiting
§ page.team.tasks.from: First commit
§ page.team.tasks.to: Last commit
§ page.team.tasks.daysInWork: Days in work
§ page.team.tasks.comments: Comments
§ page.team.tasks.backlogTitle: Tasks undeveloped for over four months after being added to the task-tracker
§ page.team.tasks.charts.authors.title: Who is doing these tasks?
§ page.team.tasks.charts.authors.other: and etc.
§ page.team.tasks.charts.relative.title: Count relative to other tasks
§ page.team.tasks.charts.relative.backlog: backlog
§ page.team.tasks.charts.relative.all: other tasks
§ page.team.extension.extension: File extensions
§ page.team.extension.type: File sub types
§ page.team.extension.name: Type
§ page.team.extension.path: Path
§ page.team.extension.current.count: Number
§ page.team.extension.removed.count: Number of removed
§ page.team.extension.files: files
§ page.team.release.download: CHANGELOG.md
§ page.team.release.title: Release
§ page.team.release.from: Created date
§ page.team.release.to: Delivery date
§ page.team.release.prLength: Tasks
§ page.team.release.delay: Preparation days
§ page.team.release.waiting: Days of waiting for next release
§ page.team.department.employments.title: The size of the current teams
§ page.team.department.employments.item: of teams
§ page.team.author.employments.less1: one employee
§ page.team.author.employments.less2: two employees
§ page.team.author.employments.less3: three employees
§ page.team.author.employments.less6: up to six employees
§ page.team.author.employments.less9: up to nine employees
§ page.team.author.employments.less12: up to 12 employees
§ page.team.author.employments.less15: up to 15 employees
§ page.team.author.employments.more: more than 15
§ page.team.department.daysChart.title: Duration of the project
§ page.team.department.daysChart.item: projects
§ page.team.department.title: List of projects
§ page.team.department.code: Code
§ page.team.department.from: First commit
§ page.team.department.to: Last
§ page.team.department.authors: employees
§ page.team.department.tasks: tasks
§ page.team.department.totalDays: Working days
§ page.team.department.totalAuthors: Number of employees
§ page.team.department.months.title: Possible number of employees in the department
§ page.team.department.months.description: It is assumed that the task tracker issues the serial numbers of the tasks. Knowing the maximum task number at the beginning and end of the month, we can find out the number of completed tasks. Knowing how many tasks the authors we know have closed this month, we can interpolate their work speed to all new tasks and assume the total number of employees whose work was not reflected in the git log.
§ page.team.department.months.date: Date
§ page.team.department.months.tasks: New tasks
§ page.team.department.months.tasksInWeek: in week
§ page.team.department.months.fixed: was fixed
§ page.team.department.months.authors: Worked
§ page.team.department.months.allAuthors: total number of employees in the department
§ page.team.building.races.title: The speed of closing tasks
§ page.team.building.races.go: Let's go!
§ page.team.building.swimmingPool.title: Maximum commit message length
§ page.team.building.quiz.start: Start a quiz
§ page.team.building.quiz.next: Next question
§ page.team.building.quiz.replay: Re-play?
§ page.team.building.quiz.question01: Who made the first commit?
§ page.team.building.quiz.question02: Who closed more tasks?
§ page.team.building.quiz.question03: Who is the fastest at completing tasks?
§ page.team.building.quiz.question04: Who has been working on the project the longest?
§ page.team.building.quiz.question05: Who worked the least on the project?
§ page.team.building.quiz.question08: Who has the longest commit signatures?
§ page.team.building.quiz.question09: Who has the shortest commit signatures?
§ page.team.building.quiz.question11: How many people have quit?
§ page.team.building.quiz.question12: How many people helped the project?
§ page.team.building.quiz.question13: How many maximum tasks did $1 per day?
§ page.team.building.quiz.question14: What type of tasks have been added more?
§ page.team.building.quiz.question15: How many days do they work on the project on average?
§ page.team.building.quiz.question16: Who created the most directories?
§ page.team.building.quiz.question17: Who was the first to create the file with the deepest path?
§ page.team.building.quiz.question18: Who clicks the "Merge" button for PR more often than others?
§ page.team.building.quiz.question19: Who had the longest commit signature of all time?
§ page.team.building.quiz.question20: Who created the PR that hung on the review for more than a month?
§ page.team.building.quiz.begin: How well do you know the team?
§ page.team.building.quiz.result1.title: Not enough
§ page.team.building.quiz.result1.description: The correct answers are less than 40%. Check out the information about your team in the adjacent sections and try again!
§ page.team.building.quiz.result2.title: Well
§ page.team.building.quiz.result2.description: The correct answers range from 40% to 70%. You have a good idea of your team, but you can get to know it better. Check out the data in the adjacent sections and try again!
§ page.team.building.quiz.result3.title: Great
§ page.team.building.quiz.result3.description: There are more than 70% correct answers. You know the statistics on your team perfectly well!
§ page.team.recommendations.alert: Warning
§ page.team.recommendations.warning: Pay attention
§ page.team.recommendations.fact: Facts about the project
§ page.team.recommendations.info: General tips
§ page.person.print.photo.title: Photo
§ page.person.print.photo.description: space for a photo
§ page.person.total.title: Main characteristics
§ page.person.total.daysWorked.title: days of work
§ page.person.total.daysWorked.description: Only days with commits are counted
§ page.person.total.tasks.title: tasks
§ page.person.total.tasks.description: If commits are properly signed
§ page.person.scoring.toolbar: The position according to this metric, relative to others. Two employees can take the same position if the values matches. Therefore, the total number of positions may be less than the number of employees.
§ page.person.character.title: Character
§ page.person.achievement.title: Achievements
§ page.person.achievement.positive: Positive
§ page.person.achievement.normal: Neutral
§ page.person.achievement.negative: Negative
§ page.person.achievement.description: The more negative achievements an employee accumulates, the higher the likelihood that the situation is unusual. It may be necessary to change their work mode, tasks, or reporting. A discussion with them to understand what problems are hindering their work is advisable.
§ page.person.gets.title: Gets taken:
§ page.person.gets.description: "Taking a get" in this context means being the first to leave a commit on a task with a "nice" number.
§ page.person.business.days.title: days of work
§ page.person.business.days.description: Only days with commits are counted
§ page.person.business.tasks.title: tasks
§ page.person.business.tasks.description: If commits are properly signed
§ page.person.business.losses.title: days without commits
§ page.person.business.losses.description: All days minus: holidays, weekends, vacation, days with commits
§ page.person.business.commits.title: commits
§ page.person.business.commits.description: Deleted branches are not counted
§ page.person.business.time.description: Time from the first to the last commit (including non-working days)
§ page.person.business.time.title: Days on the project:
§ page.person.business.time.dismissed: (dismissed)
§ page.person.business.time.staff: (not in the team)
§ page.person.business.achievements: Achievements
§ page.person.changes.title: Achievements
§ page.person.changes.description: 
With some types of formatting, git marks lines as "deleted" and "added",
although in reality, they were "changed". Therefore, if you conducted a major refactoring,
git might show a small number of changes in the statistics, but the actual result
will be marked as a jump in "deleted" and "added" lines.
§ page.person.changes.description: List of commits and the number of changes in them for that day:
§ page.person.commits.title: List of commits:
§ page.person.money.title.total: Total over time
§ page.person.money.title.middle: Average cost
§ page.person.money.moneyAll.title: received
§ page.person.money.moneyAll.description: Assumed total salary from the project (see settings)
§ page.person.money.moneyWorked.title: worked for
§ page.person.money.moneyWorked.description: Actual days worked multiplied by average salary
§ page.person.money.moneyLosses.title: possible overpayment
§ page.person.money.moneyLosses.description: Days without commits multiplied by average salary
§ page.person.money.tasks.title: task
§ page.person.money.tasks.description: Number of closed tasks to the cost of the day
§ page.person.money.commits.title: commit
§ page.person.money.commits.description: Number of commits to the cost of the workday
§ page.person.speed.task: One task on average is
§ page.person.speed.max: Maximum speed per day
§ page.person.speed.days.title: days
§ page.person.speed.days.description: Refers to workdays, if commits are properly signed
§ page.person.speed.commits.title: commits
§ page.person.speed.commits.description: Top and bottom 10% of values are trimmed
§ page.person.speed.line.title: lines of code
§ page.person.speed.line.description: Top and bottom 10% of values are trimmed
§ page.person.speed.tasks.title: tasks
§ page.person.speed.tasks.description: A task may not be completed, but work should be done on it
§ page.person.speed.maxCommits.title: commits
§ page.person.speed.maxCommits.description: A task may not be completed, but work should be done on it
§ page.person.hours.title: Distribution of commits during each day of the week
§ page.person.week.date: Date
§ page.person.week.tasks: Number of tasks
§ page.person.week.workDays: Days with commits
§ page.person.week.taskInDay: Tasks per day
§ page.person.week.days: days
§ page.person.week.workDay: weekdays
§ page.person.week.weekends: weekends
§ page.sponsor.title: Please, support this project
§ page.sponsor.share.description: Tell about our [project|https://github.com/bakhirev/assayo] on social networks! You can share [article|https://habr.com/ru/articles/852782/], [post|https://www.reddit.com/r/ITManagers/comments/1e5k291/the_visualization_and_analysis_of_git_commit/] or [video|https://www.youtube.com/watch?v=jwCp_-bhrCQ].
§ page.sponsor.share.button: Copy the link
§ page.sponsor.money.description: We will be glad if you support us with any amount! All funds will be used for the further development of the project.
§ page.sponsor.money.qr: One-time payment (only Russia)
§ page.sponsor.money.github: GitHub Sponsor
`;
