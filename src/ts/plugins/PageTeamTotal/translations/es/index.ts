export default `
§ plugin.team_total.sidebar: Información general
§ plugin.team_total.common.title: Acerca del proyecto
§ plugin.team_total.workSpeed.title: tareas por día
§ plugin.team_total.workSpeed.description: Rendimiento medio del equipo con la composición actual de empleados
§ plugin.team_total.employment.title: trabaja / salió
§ plugin.team_total.employment.description: Si un empleado no realizó ni un solo commit en un mes, se considera que salió
§ plugin.team_total.common.duration.title: duración total del trabajo
§ plugin.team_total.common.duration.description: Tiempo total de desarrollo desde el primer hasta el último commit.
§ plugin.team_total.common.location.title: oficina central
§ plugin.team_total.common.location.description: Ubicación más habitual para la composición principal actual de empleados.
§ plugin.team_total.common.employees.title: personas en el departamento
§ plugin.team_total.common.employees.description: Según la previsión del tamaño total de empleados por la tasa de cambio de los identificadores de tarea.
§ plugin.team_total.release.title: Información de lanzamientos
§ plugin.team_total.release.total.title: lanzamientos totales
§ plugin.team_total.release.total.description: Un lanzamiento es un branch con la palabra "release". Por regla general, aparecen en eventos "auto-merge".
§ plugin.team_total.money.title: Estimación del costo de desarrollo
§ plugin.team_total.moneyAll.title: total
§ plugin.team_total.moneyAll.description: Costos salariales totales, incluido el pago de vacaciones y el sobrepago por trabajo en fines de semana.
§ plugin.team_total.moneyWorked.title: real
§ plugin.team_total.moneyWorked.description: Días efectivamente trabajados multiplicados por el salario promedio.
§ plugin.team_total.moneyLosses.title: posible sobrepago
§ plugin.team_total.moneyLosses.description: Días laborables pagados en los que no hubo commits.
§ plugin.team_total.weekendPayment.title: trabajo en fin de semana
§ plugin.team_total.weekendPayment.description: Sobrepago total por trabajo en fines de semana.
§ plugin.team_total.moneySpeed.title: por mes
§ plugin.team_total.moneySpeed.description: Importe salarial previsto con la composición actual de empleados, sin impuestos, depreciación de equipos ni costos asociados.
§ plugin.team_total.forecastingMoneyAll.title: costos del proyecto a lo largo del tiempo
§ plugin.team_total.forecastingMoneyAll.description: Importe salarial posible a lo largo del tiempo para todos los empleados potenciales del departamento que no figuran en los logs pero podrían haber existido (según la numeración de identificadores de tarea en el gestor de tareas).    
§ plugin.team_total.description1: *Días-persona* son el trabajo de un empleado durante un día laborable. Por ejemplo, en un día calendario, un equipo de tres empleados entrega un volumen de trabajo de tres días-persona.
§ plugin.team_total.description2: Los *días de ausencia* incluyen solo los días laborables en los que podrían haberse realizado commits. Los fines de semana, los festivos oficiales y las vacaciones no se incluyen en el cálculo.
§ plugin.team_total.description3: La tarjeta *trabaja / salió* muestra a los empleados reales que participan de forma constante en el trabajo. Además, hay “asistentes”: por lo general, personas de otra especialización que pueden realizar commits en el proyecto de vez en cuando.
§ plugin.team_total.description4: El *sobrepago* incluye solo los días laborables en los que podrían haberse realizado commits. Los fines de semana, los festivos oficiales y las vacaciones no se incluyen en el cálculo. Por eso, sobrepago + costo real != total. El costo total incluye pagos por fines de semana, festivos oficiales y vacaciones.
§ plugin.team_total.description5: El *trabajo en fin de semana* se calcula con un coeficiente x2 respecto a la retribución de un día normal. Arriba se muestra solo el sobrepago (x1), porque el hecho mismo de las horas extra no es relevante en este contexto. No observamos la velocidad de quema del presupuesto. Observamos el sobrepago cuando aumenta la velocidad de trabajo.
`;
