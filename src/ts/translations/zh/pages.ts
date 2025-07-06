export default `
§ page.welcome.step1: 在项目的根目录运行命令
§ page.welcome.step3: 拖放
§ page.welcome.step4: log.txt 文件到本页
§ page.welcome.description: Git 创建文件 log.txt. 它包含用于构建报表的数据。 运行命令  git shortlog -s -n -e 如果你不需要报告。 创建文件 [.mailmap|https://git-scm.com/docs/gitmailmap] 在项目的根源，结合员工统计.
§ page.welcome.warning1: 该服务不会存储或传输您的数据。 所有计算都在您的计算机上执行.
§ page.welcome.warning2: 该服务不收集项目的统计数据。 你可以看 [源代码|https://github.com/bakhirev/assayo].
§ page.common.words.title: 词汇统计
§ page.common.words.description: 最流行的词。 发生$1次.
§ page.common.commits.title: Количество Commits по дням
§ page.common.commits.description: ($1) 拥有最多 Commits 数的工作日.
§ page.common.commits.title2: $1 完成了 Commits: $2
§ page.common.filter.allUsers: 没关系
§ page.print.modal.title: 我们打印出来的是什么?
§ page.print.modal.page: 当前页面
§ page.print.modal.type: 当前部分
§ page.print.modal.all: 所有统计数字
§ page.print.modal.cancel: 取消
§ page.print.tableOfContents: 目录
§ page.print.title: Git仓库报告
§ page.print.sub_title: «$1»
§ page.print.description: 报告的数据是从历史记录中获得的 Commits.
§ page.team.author.statusChart.title: Status
§ page.team.author.daysChart.title: Days of work
§ page.team.author.daysChart.item: days
§ page.team.author.days.half: half year
§ page.team.author.days.one: year
§ page.team.author.days.15: year and a half
§ page.team.author.days.two: two years
§ page.team.author.days.more: more than two years
§ page.team.author.title: Details
§ page.team.author.description1: 部分统计数字 (工作的速度，花费的钱等。.) 不考虑具有"助理"类型的员工，因为这不是项目中的永久角色。 他们的工作微不足道，可以忽略。.
§ page.team.author.description2: 默认排序是按任务和组数排序 (现任、被解雇、帮助雇员).
§ page.team.author.types: 工作类别
§ page.team.author.commits: Commits
§ page.team.author.commitsSmall: commits
§ page.team.author.tasks: 任务
§ page.team.author.tasksSmall: 任务
§ page.team.author.workedLosses: 有和没有commits的日子
§ page.team.author.worked: 工作
§ page.team.author.losses: 没有commits的日子
§ page.team.author.days: 天数
§ page.team.author.daysForTask: 每项任务的天数
§ page.team.author.scopes: 修改
§ page.team.author.moneyAll: 我拿到钱了
§ page.team.author.moneyWorked: 工作了
§ page.team.author.moneyLosses: 多付
§ page.team.author.type.work: works
§ page.team.author.type.dismissed: dismissed
§ page.team.author.type.staff: staff
§ page.team.author.absence.title: Vacation schedule
§ page.team.author.absence.vacation: Vacation
§ page.team.author.absence.transfer: Department change
§ page.team.author.absence.from: from
§ page.team.author.absence.to: to
§ page.team.author.absence.duration: days
§ page.team.hours.title: Distribution of commits during each day of the week
§ page.team.month.filters.release: Releases
§ page.team.month.filters.absence: Vacations and relocations
§ page.team.month.filters.firstLastDays: First and last days
§ page.team.month.filters.authors: All employees
§ page.team.month.filters.types: All types
§ page.team.month.title: Project work calendar
§ page.team.month.travel: (changed time zone)
§ page.team.month.vacation.first: (goes on vacation)
§ page.team.month.vacation.last: (returned from vacation)
§ page.team.month.work.first: (first work day)
§ page.team.month.work.last: (last work day)
§ page.team.scope.title: 按模块划分的统计数字
§ page.team.scope.scope: 修改
§ page.team.scope.days: 工作天
§ page.team.scope.authorsDays: 人日
§ page.team.scope.tasks: 任务
§ page.team.scope.commits: Commits
§ page.team.scope.commitsSmall: commits
§ page.team.scope.types: 工作类别
§ page.team.scope.authors: 个人贡献
§ page.team.scope.cost: 成本
§ page.team.type.title: 按任务类型划分的统计信息
§ page.team.type.description: *个人贡献* 它是按数字计算的 Commits, 而不是修改的字符串或文件的体积。 因此，您还应该查看"文件分析"部分以评估更改的规模。
§ page.team.type.type: 工作类别
§ page.team.type.unknown: unknown
§ page.team.type.tasks: 任务
§ page.team.type.tasksSmall: 任务
§ page.team.type.days: 天数
§ page.team.type.daysSmall: 天数
§ page.team.type.authorsDays: 人日
§ page.team.type.commits: Commits
§ page.team.type.authors: 个人贡献
§ page.team.total.titleA: 工作范围
§ page.team.total.titleB: 成本
§ page.team.total.daysWorked.title: 人日
§ page.team.total.daysWorked.description: 只考虑制作它们的日子 Commits
§ page.team.total.commits.title: commits
§ page.team.total.commits.description: 删除的分支不算数
§ page.team.total.daysLosses.title: 没有的日子 commits
§ page.team.total.daysLosses.description: 所有的日子都是负数: 假期、周末、假期、休息日 Commits
§ page.team.total.employment.title: 工作/退出
§ page.team.total.employment.description: 如果员工在一个月内没有完成任何工作 Commits, 他被认为被解雇了
§ page.team.total.moneyAll.title: 普通
§ page.team.total.moneyAll.description: 工资费用总额
§ page.team.total.moneyWorked.title: 实际
§ page.team.total.moneyWorked.description: 实际工作天数乘以平均工资
§ page.team.total.moneyLosses.title: 可能多付
§ page.team.total.moneyLosses.description: 带薪工作日, 何时 Commits 没有
§ page.team.total.weekendPayment.title: 周末工作
§ page.team.total.weekendPayment.description: 周末工作多付总额
§ page.team.total.workSpeed.title: 每天的任务
§ page.team.total.workSpeed.description: 团队与当前员工的平均工作速度
§ page.team.total.moneySpeed.title: 每月
§ page.team.total.moneySpeed.description: 现职工作人员的预计薪金支付额，不包括税项和有关费用
§ page.team.total.description1: *人日* — 这是一个员工一个工作日的工作。 例如，在一个日历日，一个由三名员工组成的团队在三个工作日内发出大量的工作量.
§ page.team.total.description2: *旷工的日子* 只有工作日计算在 Commits 可以做到. 周末、公众假期及假期不包括在计算内.
§ page.team.total.description3: 卡片 *工作和退出* 显示经常参与工作的员工的实际组成。 此外，还有"助手—-这些是员工，通常是不同的专业，有时可以这样做 Commits 到项目.
§ page.team.total.description4: *多付* 只有工作日计算在 Commits 可以做到. 周末、公众假期和假期不包括在计算中. 这就是为什么多付+实际成本！=一般. 总费用包括周末、公众假期和假期的付款。
§ page.team.total.description5: *周末工作* 它是由系数x2计算从支付一个正常的一天。 上面显示的是多付（x1），因为在这种情况下，处理的事实并不有趣。 我们不是在看预算燃烧的速度。 我们正在考虑在提高工作速度时多付的款项.
§ page.team.tree.title: 项目树，考虑到选定的过滤器
§ page.team.tree.filters.author: 雇员
§ page.team.tree.filters.commits: 数量 Commits
§ page.team.tree.filters.help: 最低数量 Commits, 雇员在档案中所做的
§ page.team.tree.filters.all: 所有员工
§ page.team.tree.totalLines: Lines
§ page.team.tree.totalTasks: Tasks
§ page.team.tree.totalDays: Days
§ page.team.tree.tasks: tasks
§ page.team.tree.days: days
§ page.team.tree.add: 谁加的
§ page.team.tree.change: 谁改变了它
§ page.team.tree.remove: 谁删除了它
§ page.team.tree.line: 线条
§ page.team.tree.linesAdded: 补充道
§ page.team.tree.linesChanged: changed
§ page.team.tree.linesRemoved: 改变了
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
§ page.team.week.title: 按周划分的统计数字
§ page.team.week.date: 日期
§ page.team.week.numberTasks: 任务数量
§ page.team.week.people: 人数
§ page.team.week.line: 换线
§ page.team.week.days: 日起 Commits 而没有
§ page.team.week.lossesDetails: 谁不 Commits
§ page.team.week.add: 补充道
§ page.team.week.change: 改变了
§ page.team.week.remove: 已删除
§ page.team.week.hasCommits: 是 Commits
§ page.team.week.hasNotCommits: 不是这样的 Commits
§ page.team.week.days: 天数
§ page.team.week.tasks: 任务
§ page.team.pr.task: 任务
§ page.team.pr.tasks: 任务
§ page.team.pr.firstCommitTime: 第一个 Commits
§ page.team.pr.lastCommitTime: 最后一次
§ page.team.pr.workDays: 完成任务的平均时间
§ page.team.pr.delayDays: PR审查的平均时间
§ page.team.pr.backlogDays: The delay of the task in the backlog before the start of development
§ page.team.pr.all.workDays: 任务完成时间
§ page.team.pr.all.delayDays: PR请求的审议时间
§ page.team.pr.middleTimeRelease: 开发时间与审查时间的比率
§ page.team.pr.chart.1day: day
§ page.team.pr.chart.3day: three days
§ page.team.pr.chart.7day: week
§ page.team.pr.chart.14day: two weeks
§ page.team.pr.chart.30day: month
§ page.team.pr.chart.more: more
§ page.team.pr.date: 注射日期
§ page.team.pr.mergeAuthor: 填写
§ page.team.pr.author: 雇员
§ page.team.pr.work: 发展
§ page.team.pr.delay: 期望
§ page.team.pr.days: 天数
§ page.team.pr.oneTaskDays: 花在一项任务上的时间
§ page.team.pr.description1: *花在一项任务上的时间* 这是从第一个到最后一个的时间差 Commits 按任务划分. 如果之间有几天的休息时间也没关系 Commits 还是不是. 任何一个事实 Commits 增加时间.
§ page.team.pr.description2: *轮候时间* 这是最后一次之间的时间 Commits 通过输入代码. 它显示了实际的空闲等待的东西.
§ page.team.pr.description3: *Task creation date* in the task tracker is calculated by its sequential number and the minimum date of any next Issue in the code. The method has a margin of error and, as a rule, the tasks turn out to be older. Frequent releases, fast bugfixes, and a large number of employees working on the code reduce this margin of error.
§ page.team.pr.statByAuthors: 雇员统计数字
§ page.team.pr.longDelay: 长时间等待输液
§ page.team.pr.anonymous: PR without task number
§ page.team.pr.branch: Branch
§ page.team.tasks.task: 任务
§ page.team.tasks.author: 第一篇的作者 Commits
§ page.team.tasks.createdBefore: Created before
§ page.team.tasks.backlog: Development waiting
§ page.team.tasks.from: 第一个 Commits
§ page.team.tasks.to: 最后一次 Commits
§ page.team.tasks.daysInWork: 工作中的日子
§ page.team.tasks.comments: 评论
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
§ page.person.print.photo.title: 照片
§ page.person.print.photo.description: 拍照的地方
§ page.person.total.title: 主要特点
§ page.person.total.daysWorked.title: 工作天
§ page.person.total.daysWorked.description: 只考虑制作它们的日子 Commits
§ page.person.total.tasks.title: 任务
§ page.person.total.tasks.description: 如果 Commits 正确签名
§ page.person.scoring.toolbar: The position according to this metric, relative to others. Two employees can take the same position if the values matches. Therefore, the total number of positions may be less than the number of employees.
§ page.person.character.title: 性格
§ page.person.achievement.title: 进展情况
§ page.person.achievement.positive: 积极
§ page.person.achievement.normal: 中立
§ page.person.achievement.negative: 负面
§ page.person.achievement.publicity: Special
§ page.person.achievement.description: 员工取得的负面成绩越多，情况就越有可能非标准。 可能值得改变其操作模式，任务或报告。 你应该和他谈谈，看看有什么问题妨碍了他的工作.
§ page.person.gets.title: 被带走的木屐:
§ page.person.gets.description: «被带走的木屐» 在这种情况下，它意味着第一个离开 Commits 到"美丽"数字的问题.
§ page.person.business.days.title: 工作天
§ page.person.business.days.description: 只考虑制作它们的日子 Commits
§ page.person.business.tasks.title: 任务
§ page.person.business.tasks.description: 如果 Commits 正确签名
§ page.person.business.losses.title: 没有的日子 Commits
§ page.person.business.losses.description: 所有日子减去：假期，周末，假期，休息日 Commits
§ page.person.business.commits.title: Commits
§ page.person.business.commits.description: 删除的分支不算数
§ page.person.business.time.description: 从第一到最后的时间 Commits (包括非工作日)
§ page.person.business.time.title: 项目日:
§ page.person.business.time.dismissed: (被解雇)
§ page.person.business.time.staff: (不在团队中)
§ page.person.business.achievements: 进展情况
§ page.person.changes.title: 进展情况
§ page.person.changes.description: 
使用某些类型的格式，git将字符串标记为"已删除"和"已添加",
虽然事实上他们已经被"改变"。 因此，如果你已经做了很多重构,
git可以显示统计信息的少量变化，以及实际结果
将在"已删除"和"已添加"行中标记为跳转.
§ page.person.changes.description: 名单 Commits 以及那一天他们的变化数量:
§ page.person.commits.title: 名单 Commits:
§ page.person.money.title.total: 一直如此
§ page.person.money.title.middle: 平均成本
§ page.person.money.moneyAll.title: 收到
§ page.person.money.moneyAll.description: 工程项目的采购订单估计金额 (请参阅设置)
§ page.person.money.moneyWorked.title: 工作了
§ page.person.money.moneyWorked.description: 实际工作天数乘以平均po
§ page.person.money.moneyLosses.title: 可能多付
§ page.person.money.moneyLosses.description: 没有的日子 Commits 乘以平均po
§ page.person.money.tasks.title: 任务
§ page.person.money.tasks.description: 关闭任务的数量到一天的成本
§ page.person.money.commits.title: Commits
§ page.person.money.commits.description: 数量 Commits 到一个工作日的成本
§ page.person.speed.task: 平均一项任务是
§ page.person.speed.max: 每日最高速度
§ page.person.speed.days.title: 天数
§ page.person.speed.days.description: 这意味着如果 Commits 正确签名
§ page.person.speed.commits.title: Commits
§ page.person.speed.commits.description: 最大值和最小值的10％已被切断
§ page.person.speed.line.title: 代码行
§ page.person.speed.line.description: 最大值和最小值的10％已被切断
§ page.person.speed.tasks.title: 任务
§ page.person.speed.tasks.description: 任务可能没有完成，但它的工作应该是
§ page.person.speed.maxCommits.title: Commits
§ page.person.speed.maxCommits.description: 任务可能没有完成，但它的工作应该是
§ page.person.hours.title: 分布情况 Commits 在一周的每一天
§ page.person.week.date: 日期
§ page.person.week.tasks: 任务数量
§ page.person.week.workDays: 日起 Commits
§ page.person.week.taskInDay: 每天的任务
§ page.person.week.days: 天数
§ page.person.week.workDay: 平日
§ page.person.week.weekends: 周末
`;
