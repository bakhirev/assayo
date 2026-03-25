export default `
§ plugin.team_total.sidebar: 总览信息
§ plugin.team_total.common.title: 总览信息
§ plugin.team_total.common.duration.title: 总工作周期
§ plugin.team_total.common.duration.description: 从第一次到最后一次提交的全部开发时间
§ plugin.team_total.common.location.title: 总部
§ plugin.team_total.common.employees.title: 部门人数
§ plugin.team_total.release.title: 发布信息
§ plugin.team_total.release.total.title: 发布总数
§ plugin.team_total.release.total.description: 发布信息
§ plugin.team_total.money.title: 开发成本
§ plugin.team_total.titleA: 工作量
§ plugin.team_total.titleB: 成本
§ plugin.team_total.daysWorked.title: 人日
§ plugin.team_total.daysWorked.description: 仅统计有提交的日期
§ plugin.team_total.commits.title: 提交数
§ plugin.team_total.commits.description: 已删除的分支不计入
§ plugin.team_total.daysLosses.title: 无提交天数
§ plugin.team_total.daysLosses.description: 全部天数减去：节假日、周末、休假、有提交的日期
§ plugin.team_total.employment.title: 在职 / 离职
§ plugin.team_total.employment.description: 如果员工在一个月内没有任何提交，则视为离职
§ plugin.team_total.moneyAll.title: 开发成本
§ plugin.team_total.moneyAll.description: 薪资总成本，包含带薪休假以及周末工作的额外支付。
§ plugin.team_total.moneyWorked.title: 实际
§ plugin.team_total.moneyWorked.description: 实际出勤天数乘以平均薪资
§ plugin.team_total.moneyLosses.title: 可能的多付
§ plugin.team_total.moneyLosses.description: 没有提交但仍支付的工作日
§ plugin.team_total.weekendPayment.title: 周末工作
§ plugin.team_total.weekendPayment.description: 周末工作的额外支付总额
§ plugin.team_total.workSpeed.title: 每日任务数
§ plugin.team_total.workSpeed.description: 在当前人员构成下团队的平均产出速度
§ plugin.team_total.moneySpeed.title: 每月
§ plugin.team_total.moneySpeed.description: 在当前人员构成下预计的薪资支出（不含税费及相关成本）
§ plugin.team_total.description1: *人日* 指一名员工在一个工作日内完成的工作量。例如，在一个日历日里，三名员工的团队可产出三人日的工作量。
§ plugin.team_total.description2: *缺勤天数* 仅指本可进行提交的工作日。周末、法定节假日和休假不参与计算。
§ plugin.team_total.description3: 卡片 *在职 / 离职* 展示持续参与工作的实际人员构成。此外还有“助手”——通常为其他专业的员工，他们可能偶尔向项目提交代码。
§ plugin.team_total.description4: *多付* 仅指本可进行提交的工作日。周末、法定节假日和休假不参与计算。因此，多付 + 实际成本 != 总成本。总成本包含周末、法定节假日和休假的支付。
§ plugin.team_total.description5: *周末工作* 按相对于正常工作日薪酬的 x2 系数计算。上方仅展示额外支付部分（x1），因为在此语境下加班事实本身并不重要。我们不关注预算燃烧速度，我们关注在提升工作速度时产生的多付。
`;
