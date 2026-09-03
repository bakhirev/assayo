export default `
§ plugin.team_total.sidebar: 概要信息
§ plugin.team_total.common.title: 关于项目
§ plugin.team_total.workSpeed.title: 每日任务数
§ plugin.team_total.workSpeed.description: 当前员工构成下团队的平均产出
§ plugin.team_total.employment.title: 在职 / 离职
§ plugin.team_total.employment.description: 若员工在一个月内未创建任何 commit，则视为已离职
§ plugin.team_total.common.duration.title: 总工作时长
§ plugin.team_total.common.duration.description: 从第一次到最后一次 commit 的全部开发时间。
§ plugin.team_total.common.location.title: 总部
§ plugin.team_total.common.location.description: 当前核心员工构成中最常见的所在地。
§ plugin.team_total.common.employees.title: 部门人数
§ plugin.team_total.common.employees.description: 根据任务 ID 变化率预测的员工总规模。
§ plugin.team_total.release.title: 发布信息
§ plugin.team_total.release.total.title: 发布总数
§ plugin.team_total.release.total.description: 发布是带有单词 "release" 的 branch。通常出现在 "auto-merge" 事件中。
§ plugin.team_total.money.title: 开发成本估算
§ plugin.team_total.moneyAll.title: 总计
§ plugin.team_total.moneyAll.description: 薪资总成本，包括休假工资以及周末工作的超额支付。
§ plugin.team_total.moneyWorked.title: 实际
§ plugin.team_total.moneyWorked.description: 实际工作日数乘以平均工资。
§ plugin.team_total.moneyLosses.title: 可能的超额支付
§ plugin.team_total.moneyLosses.description: 没有 commits 但仍支付的工作日。
§ plugin.team_total.weekendPayment.title: 周末工作
§ plugin.team_total.weekendPayment.description: 周末工作的超额支付总额。
§ plugin.team_total.moneySpeed.title: 每月
§ plugin.team_total.moneySpeed.description: 按当前员工构成预测的薪资额，不含税费、设备折旧及相关成本。
§ plugin.team_total.forecastingMoneyAll.title: 项目随时间的成本
§ plugin.team_total.forecastingMoneyAll.description: 部门中未出现在日志、但根据任务跟踪器中任务 ID 编号可能存在的全部潜在员工在整个期间的可能薪资额。    
§ plugin.team_total.description1: *人日* 是一名员工在一个工作日内完成的工作。例如，在一个日历日里，三名员工的团队可产出三人日的工作量。
§ plugin.team_total.description2: *缺勤天数* 仅包括本可创建 commits 的工作日。周末、法定节假日和休假不计入计算。
§ plugin.team_total.description3: 卡片 *在职 / 离职* 展示持续参与工作的实际员工。此外还有“助手”——通常为其他专业的人员，他们可能偶尔向项目创建 commits。
§ plugin.team_total.description4: *超额支付* 仅包括本可创建 commits 的工作日。周末、法定节假日和休假不计入计算。因此，超额支付 + 实际成本 != 总计。总成本包含周末、法定节假日和休假的支付。
§ plugin.team_total.description5: *周末工作* 按相对于正常日薪酬的系数 x2 计算。上方仅显示超额支付部分（x1），因为在此语境下加班事实本身并不重要。我们不关注预算消耗速度。我们关注工作速度提高时产生的超额支付。
`;
