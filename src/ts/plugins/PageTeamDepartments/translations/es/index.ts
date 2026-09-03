export default `
§ plugin.team_departments.sidebar: Departamentos
§ plugin.team_departments.employmentsChart.title: Tamaños actuales de los equipos
§ plugin.team_departments.employmentsChart.item: equipos
§ plugin.team_departments.employmentsChart.less1: un empleado
§ plugin.team_departments.employmentsChart.less2: dos empleados
§ plugin.team_departments.employmentsChart.less3: tres empleados
§ plugin.team_departments.employmentsChart.less6: hasta seis empleados
§ plugin.team_departments.employmentsChart.less9: hasta nueve empleados
§ plugin.team_departments.employmentsChart.less12: hasta 12 empleados
§ plugin.team_departments.employmentsChart.less15: hasta 15 empleados
§ plugin.team_departments.employmentsChart.more: más de 15
§ plugin.team_departments.daysChart.title: Duración del proyecto
§ plugin.team_departments.daysChart.item: proyectos
§ plugin.team_departments.title: Lista de proyectos
§ plugin.team_departments.status: Estado
§ plugin.team_departments.active.yes: Desarrollo en curso
§ plugin.team_departments.active.no: No hay nuevas tareas
§ plugin.team_departments.author.work: trabaja
§ plugin.team_departments.author.dismissed: ha dejado
§ plugin.team_departments.author.staff: apoyo
§ plugin.team_departments.code: Código
§ plugin.team_departments.from: Primer commit
§ plugin.team_departments.to: Último
§ plugin.team_departments.authors: personas
§ plugin.team_departments.tasks: tareas
§ plugin.team_departments.totalDays: Duración
§ plugin.team_departments.totalAuthors: Empleados
§ plugin.team_departments.totalTasks: Tareas
§ plugin.team_departments.employments.author: Empleado
§ plugin.team_departments.employments.worked: trabajo
§ plugin.team_departments.employments.losses: días sin commits
§ plugin.team_departments.employments.totalDays: Días en el departamento
§ plugin.team_departments.employments.totalTasks: Tareas completadas
§ plugin.team_departments.banner.title: información detallada del departamento
§ plugin.team_departments.details.title: Datos reales del departamento
§ plugin.team_departments.details.totalDays: duración del trabajo
§ plugin.team_departments.details.moneyInMonth: coste de desarrollo por mes
§ plugin.team_departments.details.moneyAll: coste de desarrollo a lo largo del tiempo
§ plugin.team_departments.details.mainLocation: ubicación principal
§ plugin.team_departments.details.activeAuthors.title: trabaja / ha dejado
§ plugin.team_departments.details.activeAuthors.description: Si un empleado no realiza ningún commit en un mes, se considera que ha salido. El estado se muestra para los empleados con independencia de este departamento: pueden trabajar en cualquier departamento o haber salido de la empresa por completo.
§ plugin.team_departments.details.linesInTask.title: líneas de código por tarea
§ plugin.team_departments.details.linesInTask.description: Número promedio ponderado de líneas de código por tarea. Ayuda a estimar la granularidad de las tareas.
§ plugin.team_departments.details.totalTasks.title: tareas estuvieron en curso
§ plugin.team_departments.details.totalTasks.description: Se cuenta cualquier mención de un ID de tarea único. Es posible que la tarea no se haya cerrado en el sistema de seguimiento de tareas.
§ plugin.team_departments.months.title: Posible número de empleados en el departamento
§ plugin.team_departments.months.description: El sistema de seguimiento de tareas emite IDs de tarea secuenciales. Conociendo el ID máximo al inicio y al final del mes, se obtiene el número de *tareas nuevas*. El número de tareas *corregidas* este mes se ve en los logs. Quién las corrigió (*trabajó*) también se ve. El número de tareas corregidas más tarde (*backlog*) se calcula a partir de los logs de los meses siguientes. Extrapolamos el rendimiento de los programadores que vemos al número total de tareas para estimar cuántos *programadores en total* debería haber en el departamento. A partir del número de «programadores» estimamos el de ingenieros de QA, analistas y gestores.
§ plugin.team_departments.months.newTaskInMonth: Tareas nuevas
§ plugin.team_departments.months.tasksFixedThisGroup: Corregidas
§ plugin.team_departments.months.tasksInBacklog: Backlog
§ plugin.team_departments.months.programmistInThisGroup: Trabajaron
§ plugin.team_departments.months.allProgrammistInDepartment: Deberían trabajar
§ plugin.team_departments.months.allUsersInDepartment: Personal total
§ plugin.team_departments.forecasting.title: Previsión del coste completo
§ plugin.team_departments.forecasting.moneyInMonth.title: costes del departamento por mes
§ plugin.team_departments.forecasting.moneyInMonth.description: Se multiplica el número de todos los empleados potenciales (desarrollo, QA, analítica, gestión) del último mes por el salario medio.
§ plugin.team_departments.forecasting.moneyAll.title: costes del departamento a lo largo del tiempo
§ plugin.team_departments.forecasting.moneyAll.description: Se multiplica el número de todos los empleados potenciales (desarrollo, QA, analítica, gestión) de cada mes por el salario medio.
`;
