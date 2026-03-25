export default `
§ page.welcome.step1: Ejecute el comando en la raíz de su proyecto
§ page.welcome.step3: Arrastrais
§ page.welcome.step4: fichero log.txt a esta página
§ page.welcome.description: Git creará un archivo log.txt. Contiene los datos para construir el informe. Ejecute el comando git shortlog -s -n -e еsi el informe no es necesario. Crear un archivo [.mailmap|https://git-scm.com/docs/gitmailmap] en la raíz del proyecto para combinar las estadísticas de los empleados.
§ page.welcome.warning1: El Servicio no ALMACENA ni TRANSMITE sus datos. Todos los cálculos se realizan en su computadora.
§ page.welcome.warning2: El Servicio no RECOPILA ESTADÍSTICAS sobre proyectos. Puedes ver [código fuente|https://github.com/bakhirev/assayo].
§ page.common.words.title: Estadísticas en palabras
§ page.common.words.description: la palabra más popular. Se encuentra $1 veces.
§ page.common.commits.title: Número de commits por día
§ page.common.commits.description: ($1) el día más productivo por número de commits.
§ page.common.commits.title2: $1 commits hechas: $2
§ page.common.filter.allUsers: No tiene importancia
§ page.print.modal.title: Lo que imprimimos?
§ page.print.modal.page: Página actual
§ page.print.modal.type: Sección actual
§ page.print.modal.all: Todas las estadísticas
§ page.print.modal.cancel: Cancelación
§ page.print.tableOfContents: Tabla
§ page.print.title: Informe del repositorio git
§ page.print.sub_title: «$1»
§ page.print.description: Los datos para el informe se obtuvieron del historial de commits.
§ page.team.author.statusChart.title: Status
§ page.team.author.daysChart.title: Days of work
§ page.team.author.daysChart.item: days
§ page.team.author.days.half: half year
§ page.team.author.days.one: year
§ page.team.author.days.15: year and a half
§ page.team.author.days.two: two years
§ page.team.author.days.more: more than two years
§ page.team.author.title: Details
§ page.team.author.description1: Parte de las estadísticas (la velocidad del trabajo, el dinero gastado, etc.) para los empleados con el tipo de "Asistente" no cuenta, ya que no es un rol permanente en el proyecto. Su trabajo es insignificante y puede ser ignorado.
§ page.team.author.description2: La clasificación predeterminada es la clasificación por número de tareas y grupos(empleados actuales, despedidos, ayudantes).
§ page.team.author.status: Status
§ page.team.author.company: Company
§ page.team.author.firstCommit: First commit
§ page.team.author.lastCommit: Last
§ page.team.author.daysAll: Total days
§ page.team.author.types: Tipo de trabajo
§ page.team.author.commits: Commits
§ page.team.author.commitsSmall: commits
§ page.team.author.tasks: Tareas
§ page.team.author.tasksSmall: Tareas
§ page.team.author.workedLosses: Días con y sin commits
§ page.team.author.worked: trabajo
§ page.team.author.losses: días sin commits
§ page.team.author.days: día
§ page.team.author.daysForTask: Días por tarea
§ page.team.author.scopes: Elaboración definitiva
§ page.team.author.moneyAll: Dinero recibido
§ page.team.author.moneyWorked: Trabajo
§ page.team.author.moneyLosses: Sobrepago
§ page.team.author.type.work: works
§ page.team.author.type.dismissed: dismissed
§ page.team.author.type.staff: staff
§ page.team.author.absence.title: Vacation schedule
§ page.team.author.absence.vacation: Vacation
§ page.team.author.absence.transfer: Department change
§ page.team.author.absence.from: from
§ page.team.author.absence.to: to
§ page.team.author.absence.duration: days
§ page.team.hours.title: Distribución del trabajo cada día de la semana
§ plugin.team_month.filters.release: Releases
§ plugin.team_month.filters.absence: Vacations and relocations
§ plugin.team_month.filters.firstLastDays: First and last days
§ plugin.team_month.filters.authors: All employees
§ plugin.team_month.filters.types: All types
§ plugin.team_month.title: Calendario del proyecto
§ plugin.team_month.travel: (changed time zone)
§ plugin.team_month.vacation.first: (goes on vacation)
§ plugin.team_month.vacation.last: (returned from vacation)
§ plugin.team_month.work.first: (first work day)
§ plugin.team_month.work.last: (last work day)
§ page.team.scope.title: Estadísticas de módulos
§ page.team.scope.scope: Elaboración definitiva
§ page.team.scope.days: Siervo. día
§ page.team.scope.authorsDays: Días-persona
§ page.team.scope.tasks: Tareas
§ page.team.scope.commits: Commits
§ page.team.scope.commitsSmall: commits
§ page.team.scope.types: Tipo de trabajo
§ page.team.scope.authors: Contribución personal
§ page.team.scope.cost: Costo
§ page.team.type.title: Estadísticas por tipo de tarea
§ page.team.type.description: *Contribución personal* se considera por el número de Commits, no por el volumen de líneas o archivos modificados. Por lo tanto, también debe ver la sección "Análisis de archivos" para evaluar el alcance de los cambios
§ page.team.type.type: Tipo de trabajo
§ page.team.type.unknown: unknown
§ page.team.type.tasks: Tareas
§ page.team.type.tasksSmall: Tareas
§ page.team.type.days: Día
§ page.team.type.daysSmall: Día
§ page.team.type.authorsDays: Días-persona
§ page.team.type.commits: Commits
§ page.team.type.authors: Contribución personal
§ page.team.total.titleA: Alcance
§ page.team.total.titleB: Costo
§ page.team.total.daysWorked.title: días-persona
§ page.team.total.daysWorked.description: Solo se tienen en cuenta los días en que se realizaron los commits
§ page.team.total.commits.title: commits
§ page.team.total.commits.description: Las ramas eliminadas no cuentan
§ page.team.total.daysLosses.title: días sin commits
§ page.team.total.daysLosses.description: Todos los días menos: vacaciones, fin de semana, vacaciones, días con commits
§ page.team.total.employment.title: empleado / despedido
§ page.team.total.employment.description: Si un empleado no ha hecho ningún commit en un mes, se considera despedido
§ page.team.total.moneyAll.title: general
§ page.team.total.moneyAll.description: Costos totales de nómina
§ page.team.total.moneyWorked.title: real
§ page.team.total.moneyWorked.description: Días efectivamente trabajados multiplicados por el salario promedio
§ page.team.total.moneyLosses.title: posible sobrepago
§ page.team.total.moneyLosses.description: Días laborables pagados cuando no hubo commits
§ page.team.total.weekendPayment.title: trabajo de fin de semana
§ page.team.total.weekendPayment.description: Sobrepago total por trabajo de fin de semana
§ page.team.total.workSpeed.title: tareas por día
§ page.team.total.workSpeed.description: Velocidad media del equipo con la plantilla actual
§ page.team.total.moneySpeed.title: por mes
§ page.team.total.moneySpeed.description: Monto previsto de la nómina de sueldos en la plantilla actual, sin incluir impuestos ni costos asociados
§ page.team.total.description1: *Días-persona* — es el trabajo de un empleado durante una jornada laboral. Por ejemplo, en un día calendario, un equipo de tres empleados emite una cantidad de trabajo de tres días-persona.
§ page.team.total.description2: *Días de absentismo* solo se cuentan los días hábiles en que se podrían haber realizado commits. Fines de semana, días festivos y vacaciones no participan en el cálculo.
§ page.team.total.description3: Tarjeta *trabaja y se despide* muestra la composición real de los empleados que participan constantemente en el trabajo. Aparte de eso, hay " ayudantes — - que son empleados, por lo general de otra Especialización, que a veces pueden hacer commits en un proyecto.
§ page.team.total.description4: *Pago excesivo* solo se cuentan los días hábiles en que se podrían haber realizado commits. Los fines de semana, días festivos y vacaciones no están incluidos en el cálculo. ¡Es por eso que el sobrepago + el costo real!= general. El costo total incluye el pago de fines de semana, días festivos y vacaciones.
§ page.team.total.description5: *Trabajo de fin de semana* se considera por el factor X2 del pago de un día normal. Lo anterior muestra exactamente el pago excesivo (X1), ya que el hecho de procesar en este contexto no es interesante. No estamos viendo la tasa de quema del presupuesto. Estamos viendo el sobrepago al aumentar la velocidad del trabajo.
§ page.team.tree.title: Árbol de proyecto con filtros seleccionados
§ page.team.tree.filters.author: Empleado
§ page.team.tree.filters.commits: Número de commits
§ page.team.tree.filters.help: El número mínimo de commits que hizo un empleado en el archivo
§ page.team.tree.filters.all: Todos los empleados
§ page.team.tree.totalLines: Lines
§ page.team.tree.totalTasks: Tasks
§ page.team.tree.totalDays: Days
§ page.team.tree.tasks: tasks
§ page.team.tree.days: days
§ page.team.tree.add: Quien ha añadido
§ page.team.tree.change: Quien cambió
§ page.team.tree.remove: Quién borró
§ page.team.tree.line: filas
§ page.team.tree.linesAdded: agregaron
§ page.team.tree.linesChanged: changed
§ page.team.tree.linesRemoved: cambiaron
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
§ page.team.week.title: Estadísticas semanales
§ page.team.week.date: Fecha
§ page.team.week.numberTasks: Número de tareas
§ page.team.week.people: Número de personas
§ page.team.week.line: Cambiar filas
§ page.team.week.days: Días con y sin commits
§ page.team.week.lossesDetails: ¿Quién no commits
§ page.team.week.add: agregaron
§ page.team.week.change: cambiaron
§ page.team.week.remove: eliminaron
§ page.team.week.hasCommits: fueron commits
§ page.team.week.hasNotCommits: no hubo commits
§ page.team.week.days: día
§ page.team.week.tasks: tareas
§ page.team.pr.task: Tarea
§ page.team.pr.tasks: tareas
§ page.team.pr.firstCommitTime: Primer commits
§ page.team.pr.lastCommitTime: Last
§ page.team.pr.workDays: Average time spent working on a task
§ page.team.pr.delayDays: Average time of the PR review
§ page.team.pr.backlogDays: The delay of the task in the backlog before the start of development
§ page.team.pr.all.workDays: Time spent working on a task
§ page.team.pr.all.delayDays: Time of the PR review
§ page.team.pr.middleTimeRelease: The ratio of development time to review time
§ page.team.pr.chart.1day: day
§ page.team.pr.chart.3day: three days
§ page.team.pr.chart.7day: week
§ page.team.pr.chart.14day: two weeks
§ page.team.pr.chart.30day: month
§ page.team.pr.chart.more: more
§ page.team.pr.date: Date of injection
§ page.team.pr.mergeAuthor: I poured it in
§ page.team.pr.author: Employee
§ page.team.pr.work: development
§ page.team.pr.delay: expectation
§ page.team.pr.days: days
§ page.team.pr.oneTaskDays: Time spent on one task
§ page.team.pr.description1: *Development time* this is the time difference from the first to the last commits for the task. It doesn't matter if there were breaks of several days between commits or not. The very fact of any commits increases the time.
§ page.team.pr.description2: *Waiting time* this is the time between the last commit and the code injection. It shows the actual idle waiting for something.
§ page.team.pr.description3: *Task creation date* in the task tracker is calculated by its sequential number and the minimum date of any next Issue in the code. The method has a margin of error and, as a rule, the tasks turn out to be older. Frequent releases, fast bugfixes, and a large number of employees working on the code reduce this margin of error.
§ page.team.pr.statByAuthors: Employee statistics
§ page.team.pr.longDelay: Long wait for infusion
§ page.team.pr.anonymous: PR without task number
§ page.team.pr.branch: Branch
§ page.team.tasks.task: Task
§ page.team.tasks.author: The author of the first commits
§ page.team.tasks.createdBefore: Created before
§ page.team.tasks.backlog: Development waiting
§ page.team.tasks.from: The first commits
§ page.team.tasks.to: Last commits
§ page.team.tasks.daysInWork: Days in the work
§ page.team.tasks.comments: Comments
§ page.team.tasks.backlogTitle: Tasks undeveloped for over four months after being added to the task-tracker
§ page.team.tasks.charts.authors.title: Who is doing these tasks?
§ page.team.tasks.charts.authors.other: , etc.
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
§ page.person.print.photo.description: a place for a photo
§ page.person.total.title: Main Features
§ page.person.total.daysWorked.title: working days
§ page.person.total.daysWorked.description: Only the days on which commits were made are taken into account
§ page.person.total.tasks.title: tasks
§ page.person.total.tasks.description: If the commits are signed correctly
§ page.person.scoring.toolbar: The position according to this metric, relative to others. Two employees can take the same position if the values matches. Therefore, the total number of positions may be less than the number of employees.
§ page.person.achievement.title: Progress
§ page.person.achievement.positive: Positive
§ page.person.achievement.normal: Neutral
§ page.person.achievement.negative: Negative
§ page.person.achievement.publicity: Special
§ page.person.achievement.description: Cuantos más logros negativos tenga un empleado, más probable es que la situación no sea estándar. Puede que valga la pena cambiar su modo de trabajo, tareas o informes. Debe hablar con él y averiguar qué problemas interfieren con su trabajo.
§ page.person.gets.title: Geta Capturado:
§ page.person.gets.description: «Geta Capturado» in this case, it means leaving commits to the task with the "beautiful" number first.
§ page.person.business.days.title: working days
§ page.person.business.days.description: Only the days on which commits were made are taken into account
§ page.person.business.tasks.title: tasks
§ page.person.business.tasks.description: If commits are signed correctly
§ page.person.business.losses.title: days without commits
§ page.person.business.losses.description: All days minus: holidays, weekends, vacations, days with commits
§ page.person.business.commits.title: commits
§ page.person.business.commits.description: Deleted branches don't count
§ page.person.business.time.description: Time from the first to the last commits (including non-working days)
§ page.person.business.time.title: Days on the project:
§ page.person.business.time.dismissed: (Progreso)
§ page.person.business.time.staff: (Not in the team)
§ page.person.business.achievements: Progreso
§ page.person.changes.title: Progreso
§ page.person.changes.description: 
En algunos tipos de formato, git marca las líneas como "eliminadas" y "agregadas", cuando en realidad se han "modificado". Entonces, si has hecho mucha refactorización,
git puede Mostrar una pequeña cantidad de cambios en las estadísticas, y el resultado real se marcará como un salto en las líneas "eliminado" y "agregado"
§ page.person.changes.description: The list of commits and the number of changes to them for that day:
§ page.person.commits.title: Lista de commits:
§ page.person.money.title.total: Durante todo este tiempo 👌️
§ page.person.money.title.middle: Average cost
§ page.person.money.moneyAll.title: received
§ page.person.money.moneyAll.description: Estimated amount of the PO from the project (see settings)
§ page.person.money.moneyWorked.title: worked out
§ page.person.money.moneyWorked.description: Actual days worked multiplied by the average po
§ page.person.money.moneyLosses.title: possible overpayment
§ page.person.money.moneyLosses.description: Days without commits multiplied by the average po
§ page.person.money.tasks.title: task
§ page.person.money.tasks.description: The number of closed tasks to the cost of the day
§ page.person.money.commits.title: commits
§ page.person.money.commits.description: The number of commits to the cost of the working day
§ page.person.speed.task: One task on average is
§ page.person.speed.max: Velocidad máxima por día
§ page.person.speed.days.title: días
§ page.person.speed.days.description: This means working days if the commits are signed correctly
§ page.person.speed.commits.title: commits
§ page.person.speed.commits.description: 10% of the maximum and minimum values were cut off
§ page.person.speed.line.title: lines of code
§ page.person.speed.line.description: 10% of the maximum and minimum values were cut off
§ page.person.speed.tasks.title: tasks
§ page.person.speed.tasks.description: The task may not be completed, but the work on it should be
§ page.person.speed.maxCommits.title: commits
§ page.person.speed.maxCommits.description: The task may not be completed, but the work on it should be
§ page.person.hours.title: Distribution of commits during each day of the week
§ page.person.week.date: Date
§ page.person.week.tasks: Number of tasks
§ page.person.week.workDays: Days with commits
§ page.person.week.taskInDay: Tasks per day
§ page.person.week.days: days
§ page.person.week.workDay: entresemana
§ page.person.week.weekends: día de descanso
§ page.sponsor.title: Please, support this project
§ page.sponsor.share.description: Tell about our [project|https://github.com/bakhirev/assayo] on social networks! You can share [article|https://habr.com/ru/articles/852782/], [post|https://www.reddit.com/r/ITManagers/comments/1e5k291/the_visualization_and_analysis_of_git_commit/] or [video|https://www.youtube.com/watch?v=jwCp_-bhrCQ].
§ page.sponsor.share.button: Copy the link
§ page.sponsor.money.description: We will be glad if you support us with any amount! All funds will be used for the further development of the project.
§ page.sponsor.money.qr: One-time payment (only Russia)
`;
