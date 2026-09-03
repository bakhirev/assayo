export default `
§ plugin.person_speed.sidebar: 速度
§ plugin.person_speed.task: 平均一项任务是
§ plugin.person_speed.max: 每日最高速度
§ plugin.person_speed.days.title: 天数
§ plugin.person_speed.days.description: 将找到的任务数除以有 commits 的天数。
§ plugin.person_speed.commits.title: commits
§ plugin.person_speed.commits.description: 去掉最稀有和最大的 10% 值后的加权平均值。
§ plugin.person_speed.line.title: 代码行
§ plugin.person_speed.line.description: 系统无法识别同一任务内不同 commits 中对同一行的修改，这些修改会被累加。
§ plugin.person_speed.files.title: 文件
§ plugin.person_speed.files.description: 去掉最稀有和最大的 10% 值后的加权平均值。
§ plugin.person_speed.tasks.title: 任务
§ plugin.person_speed.tasks.description: 任务可能尚未完成。只记录在某一天确实对其开展过工作。
§ plugin.person_speed.maxCommits.title: commits
§ plugin.person_speed.maxCommits.description: 某一天内所做 commits 的总数。它们可以属于同一任务，也可以属于不同任务。
`;
