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
§ page.team.author.title: Estadísticas de los empleados
§ page.team.author.description1: Parte de las estadísticas (la velocidad del trabajo, el dinero gastado, etc.) para los empleados con el tipo de "Asistente" no cuenta, ya que no es un rol permanente en el proyecto. Su trabajo es insignificante y puede ser ignorado.
§ page.team.author.description2: La clasificación predeterminada es la clasificación por número de tareas y grupos(empleados actuales, despedidos, ayudantes).
§ page.team.author.status: Status
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
§ page.team.hours.title: Distribución del trabajo cada día de la semana
§ page.team.month.title: Calendario del proyecto
§ page.team.month.first: (first work day)
§ page.team.month.last: (last work day)
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
§ page.team.tree.add: Quien ha añadido
§ page.team.tree.change: Quien cambió
§ page.team.tree.remove: Quién borró
§ page.team.tree.line: filas
§ page.team.tree.linesAdded: agregaron
§ page.team.tree.linesChanged: changed
§ page.team.tree.linesRemoved: cambiaron
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
§ page.team.pr.all.workDays: Time spent working on a task
§ page.team.pr.all.delayDays: Time of the PR review
§ page.team.pr.middleTimeRelease: The ratio of development time to review time
§ page.team.pr.chart.1day: day
§ page.team.pr.chart.3day: three days
§ page.team.pr.chart.7day: week
§ page.team.pr.chart.14day: two weeks
§ page.team.pr.chart.30day: month
§ page.team.pr.chart.more: more
§ page.team.pr.commits: commits
§ page.team.pr.date: Date of injection
§ page.team.pr.mergeAuthor: I poured it in
§ page.team.pr.author: Employee
§ page.team.pr.work: development
§ page.team.pr.delay: expectation
§ page.team.pr.days: days
§ page.team.pr.oneTaskDays: Time spent on one task
§ page.team.pr.description1: *Development time* this is the time difference from the first to the last commits for the task. It doesn't matter if there were breaks of several days between commits or not. The very fact of any commits increases the time.
§ page.team.pr.description2: *Waiting time* this is the time between the last commit and the code injection. It shows the actual idle waiting for something.
§ page.team.pr.description3: *Why display the development time* without a breakdown into coding and code review? Then, to show the business the actual delivery time of the code. The expectation of testing, comments on the review, DevOps problems and other imperfections of the process are already laid down in this period.
§ page.team.pr.statByAuthors: Employee statistics
§ page.team.pr.longDelay: Long wait for infusion
§ page.team.tasks.task: Task
§ page.team.tasks.author: The author of the first commits
§ page.team.tasks.from: The first commits
§ page.team.tasks.to: Last commits
§ page.team.tasks.daysInWork: Days in the work
§ page.team.tasks.commits: Number of commits
§ page.team.tasks.pr: Date of injection
§ page.team.tasks.prAuthor: I poured it in
§ page.team.tasks.prDelayDays: Days of waiting for the infusion
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
§ page.person.print.photo.description: a place for a photo
§ page.person.total.title: Main Features
§ page.person.total.daysWorked.title: working days
§ page.person.total.daysWorked.description: Only the days on which commits were made are taken into account
§ page.person.total.tasks.title: tasks
§ page.person.total.tasks.description: If the commits are signed correctly
§ page.person.character.title: Character
§ page.person.achievement.title: Progress
§ page.person.achievement.positive: Positive
§ page.person.achievement.normal: Neutral
§ page.person.achievement.negative: Negative
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
§ page.sponsor.share.description: Tell about our [project|https://github.com/bakhirev/assayo] on social networks! You can share [article|https://habr.com/ru/articles/763342/], [post|https://www.reddit.com/r/github/comments/1bvtsl3/how_i_parsed_git_statistics/] or make a video review.
§ page.sponsor.share.button: Copy the link
§ page.sponsor.money.description: We will be glad if you support us with any amount! All funds will be used for the further development of the project.
§ page.sponsor.money.qr: One-time payment (only Russia)
§ page.sponsor.money.github: GitHub Sponsor
`;
