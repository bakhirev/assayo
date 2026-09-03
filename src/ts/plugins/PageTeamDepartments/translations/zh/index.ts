export default `
§ plugin.team_departments.sidebar: 部门
§ plugin.team_departments.employmentsChart.title: 当前团队规模
§ plugin.team_departments.employmentsChart.item: 团队
§ plugin.team_departments.employmentsChart.less1: 一名员工
§ plugin.team_departments.employmentsChart.less2: 两名员工
§ plugin.team_departments.employmentsChart.less3: 三名员工
§ plugin.team_departments.employmentsChart.less6: 最多六名员工
§ plugin.team_departments.employmentsChart.less9: 最多九名员工
§ plugin.team_departments.employmentsChart.less12: 最多 12 名员工
§ plugin.team_departments.employmentsChart.less15: 最多 15 名员工
§ plugin.team_departments.employmentsChart.more: 超过 15 名
§ plugin.team_departments.daysChart.title: 项目持续时间
§ plugin.team_departments.daysChart.item: 项目
§ plugin.team_departments.title: 项目列表
§ plugin.team_departments.status: 状态
§ plugin.team_departments.active.yes: 开发进行中
§ plugin.team_departments.active.no: 无新任务
§ plugin.team_departments.author.work: 在职
§ plugin.team_departments.author.dismissed: 已离职
§ plugin.team_departments.author.staff: 辅助人员
§ plugin.team_departments.code: 代码
§ plugin.team_departments.from: 首次 commit
§ plugin.team_departments.to: 最后
§ plugin.team_departments.authors: 人
§ plugin.team_departments.tasks: 任务
§ plugin.team_departments.totalDays: 持续时间
§ plugin.team_departments.totalAuthors: 员工
§ plugin.team_departments.totalTasks: 任务
§ plugin.team_departments.employments.author: 员工
§ plugin.team_departments.employments.worked: 工作
§ plugin.team_departments.employments.losses: 无 commits 的天数
§ plugin.team_departments.employments.totalDays: 在部门中的天数
§ plugin.team_departments.employments.totalTasks: 已完成的任务
§ plugin.team_departments.banner.title: 部门详细信息
§ plugin.team_departments.details.title: 部门实际数据
§ plugin.team_departments.details.totalDays: 工作时长
§ plugin.team_departments.details.moneyInMonth: 每月开发成本
§ plugin.team_departments.details.moneyAll: 整个期间的开发成本
§ plugin.team_departments.details.mainLocation: 主要所在地
§ plugin.team_departments.details.activeAuthors.title: 在职 / 离职
§ plugin.team_departments.details.activeAuthors.description: 如果员工在一个月内没有任何 commit，则视为已离职。该状态不绑定本部门：他们可能在任意部门工作，或已完全离开公司。
§ plugin.team_departments.details.linesInTask.title: 每个任务的代码行数
§ plugin.team_departments.details.linesInTask.description: 每个任务代码行数的加权平均值。有助于估算任务的粒度。
§ plugin.team_departments.details.totalTasks.title: 曾处于处理中的任务
§ plugin.team_departments.details.totalTasks.description: 任何提及唯一任务 ID 的记录都会被计入。该任务可能尚未在任务跟踪系统中关闭。
§ plugin.team_departments.months.title: 部门可能的员工数量
§ plugin.team_departments.months.description: 任务跟踪系统会发放连续的任务 ID。根据月初和月末的最大任务 ID，可以得到 *新任务* 的数量。本月 *已修复* 的任务数可在日志中看到。谁修复了它们（*工作过*）也可看到。稍后修复的任务数（*积压*）根据后续月份的日志计算。我们将可见程序员的产能外推到任务总数，以估计部门应有多少 *程序员总数*。再根据「程序员」人数估算 QA 工程师、分析师和管理者的人数。
§ plugin.team_departments.months.newTaskInMonth: 新任务
§ plugin.team_departments.months.tasksFixedThisGroup: 已修复
§ plugin.team_departments.months.tasksInBacklog: 积压
§ plugin.team_departments.months.programmistInThisGroup: 已工作
§ plugin.team_departments.months.allProgrammistInDepartment: 应当工作
§ plugin.team_departments.months.allUsersInDepartment: 员工总数
§ plugin.team_departments.forecasting.title: 全部成本预测
§ plugin.team_departments.forecasting.moneyInMonth.title: 部门每月成本
§ plugin.team_departments.forecasting.moneyInMonth.description: 将上个月所有潜在人员（开发、QA、分析、管理）数量乘以平均工资。
§ plugin.team_departments.forecasting.moneyAll.title: 整个期间的部门成本
§ plugin.team_departments.forecasting.moneyAll.description: 将每个月所有潜在人员（开发、QA、分析、管理）数量乘以平均工资。
`;
