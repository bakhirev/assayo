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
§ page.team.author.title: Employee statistics
§ page.team.author.description1: *Part of the statistics* (work speed, costs, etc.) *for employees with the 'Assistant' type is not counted*, as it is an episodic role in the project. It is assumed that they do not affect the project, and their edits can be disregarded in the context of the overall volume of work.
§ page.team.author.description2: *Default sorting* is by the number of tasks and groups (current, fired, assisting employees).
§ page.team.author.status: Status
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
§ page.team.tree.add: Who added
§ page.team.tree.change: Who changed
§ page.team.tree.remove: Who removed
§ page.team.tree.line: lines
§ page.team.tree.linesAdded: added
§ page.team.tree.linesChanged: changed
§ page.team.tree.linesRemoved: removed
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
§ page.team.pr.middleTimeRelease: Average delivery time (days)
§ page.team.pr.chart.1day: day
§ page.team.pr.chart.3day: three days
§ page.team.pr.chart.7day: week
§ page.team.pr.chart.14day: two weeks
§ page.team.pr.chart.30day: month
§ page.team.pr.chart.more: more
§ page.team.pr.commits: Commits
§ page.team.pr.date: Merge Date
§ page.team.pr.mergeAuthor: Merged by
§ page.team.pr.author: Employee
§ page.team.pr.work: development
§ page.team.pr.delay: waiting
§ page.team.pr.days: days
§ page.team.pr.oneTaskDays: Time spent on one task
§ page.team.pr.description1: *Development time* is the time difference from the first to the last commit on a task. It does not matter if there were breaks of several days between commits or not. Any commit increases the time.
§ page.team.pr.description2: *Waiting time* is the time between the last commit and the code merge. It shows the actual downtime while waiting for something.
§ page.team.pr.description3: *Why display development time* without splitting into coding and code review? To show the business the actual delivery time of the code. Waiting for testing, review comments, DevOps problems, and other process imperfections are already included in this term.
§ page.team.pr.statByAuthors: Statistics by employees
§ page.team.pr.longDelay: Prolonged Waiting for merge
§ page.team.tasks.task: Task
§ page.team.tasks.author: First commit author
§ page.team.tasks.from: First commit
§ page.team.tasks.to: Last commit
§ page.team.tasks.daysInWork: Days in work
§ page.team.tasks.commits: Commits number
§ page.team.tasks.pr: Merge date
§ page.team.tasks.prAuthor: Merged by user
§ page.team.tasks.prDelayDays: Delay before merge in days
§ page.team.tasks.comments: Comments
§ page.team.extension.extension: File extensions
§ page.team.extension.type: File sub types
§ page.team.extension.name: Type
§ page.team.extension.path: Path
§ page.team.extension.current.count: Number
§ page.team.extension.removed.count: Number of removed
§ page.team.extension.files: files
§ page.team.release.title: Release
§ page.team.release.from: Created date
§ page.team.release.to: Delivery date
§ page.team.release.prLength: Tasks
§ page.team.release.delay: Preparation days
§ page.team.release.waiting: Days of waiting for next release
§ page.person.print.photo.title: Photo
§ page.person.print.photo.description: space for a photo
§ page.person.total.title: Main characteristics
§ page.person.total.daysWorked.title: days of work
§ page.person.total.daysWorked.description: Only days with commits are counted
§ page.person.total.tasks.title: tasks
§ page.person.total.tasks.description: If commits are properly signed
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
§ page.sponsor.share.description: Tell about our [project|https://github.com/bakhirev/assayo] on social networks! You can share [article|https://habr.com/ru/articles/763342/], [post|https://www.reddit.com/r/github/comments/1bvtsl3/how_i_parsed_git_statistics/] or make a video review.
§ page.sponsor.share.button: Copy the link
§ page.sponsor.money.description: We will be glad if you support us with any amount! All funds will be used for the further development of the project.
§ page.sponsor.money.qr: One-time payment (only Russia)
§ page.sponsor.money.github: GitHub Sponsor
`;
