export default `
§ plugin.team_pull_requests.sidebar: injection de code
§ plugin.team_pull_requests.task: tâches
§ plugin.team_pull_requests.tasks: tâches
§ plugin.team_pull_requests.firstCommitTime: Premier commit
§ plugin.team_pull_requests.lastCommitTime: Dernier
§ plugin.team_pull_requests.workDays: Average time spent working on a task
§ plugin.team_pull_requests.delayDays: Average time of the PR review
§ plugin.team_pull_requests.backlogDays: The delay of the task in the backlog before the start of development
§ plugin.team_pull_requests.all.workDays: Time spent working on a task
§ plugin.team_pull_requests.all.delayDays: Time of the PR review
§ plugin.team_pull_requests.middleTimeRelease: The ratio of development time to review time
§ plugin.team_pull_requests.chart.1day: day
§ plugin.team_pull_requests.chart.3day: three days
§ plugin.team_pull_requests.chart.7day: week
§ plugin.team_pull_requests.chart.14day: two weeks
§ plugin.team_pull_requests.chart.30day: month
§ plugin.team_pull_requests.chart.more: more
§ plugin.team_pull_requests.date: Date de diffusion
§ plugin.team_pull_requests.mergeAuthor: Versai
§ plugin.team_pull_requests.author: Employé
§ plugin.team_pull_requests.work: développement
§ plugin.team_pull_requests.delay: attente
§ plugin.team_pull_requests.days: jours
§ plugin.team_pull_requests.oneTaskDays: Temps passé sur une tâche
§ plugin.team_pull_requests.description1: *Temps de développement* c’est la différence de temps entre le premier et le dernier commit pour un problème donné. Il n’importe pas si il y avait des pauses pendant plusieurs jours entre les commits, ou non. Le fait même d’avoir fait un quelconque commit augmente le temps.
§ plugin.team_pull_requests.description2: *Délai d'attente* c'est le temps entre le dernier commit et l'injection de code. Il montre le réel simple en attendant quoi que ce soit.
§ plugin.team_pull_requests.description3: *Task creation date* in the task tracker is calculated by its sequential number and the minimum date of any next Issue in the code. The method has a margin of error and, as a rule, the tasks turn out to be older. Frequent releases, fast bugfixes, and a large number of employees working on the code reduce this margin of error.
§ plugin.team_pull_requests.statByAuthors: Statistiques du personnel
§ plugin.team_pull_requests.longDelay: Longue attente pour l'injection
§ plugin.team_pull_requests.anonymous: PR without task number
§ plugin.team_pull_requests.branch: Branch
`;