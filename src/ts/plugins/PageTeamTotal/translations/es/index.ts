export default `
§ plugin.team_total.sidebar: Información general
§ plugin.team_total.common.title: Información general
§ plugin.team_total.common.duration.title: duración total del trabajo
§ plugin.team_total.common.duration.description: Todo el tiempo de desarrollo desde el primer hasta el último commit
§ plugin.team_total.common.location.title: oficina central
§ plugin.team_total.common.employees.title: personas en el departamento
§ plugin.team_total.release.title: Información de lanzamientos
§ plugin.team_total.release.total.title: lanzamientos totales
§ plugin.team_total.release.total.description: Información de lanzamientos
§ plugin.team_total.money.title: Costo de desarrollo
§ plugin.team_total.titleA: Volumen de trabajo
§ plugin.team_total.titleB: Costo
§ plugin.team_total.daysWorked.title: días-persona
§ plugin.team_total.daysWorked.description: Solo se consideran los días en los que se hicieron commits
§ plugin.team_total.commits.title: commits
§ plugin.team_total.commits.description: Las ramas eliminadas no se cuentan
§ plugin.team_total.daysLosses.title: días sin commits
§ plugin.team_total.daysLosses.description: Todos los días menos: festivos, fines de semana, vacaciones, días con commits
§ plugin.team_total.employment.title: activos / baja
§ plugin.team_total.employment.description: Si un empleado no hizo ni un solo commit en el transcurso de un mes, se considera que ha causado baja
§ plugin.team_total.moneyAll.title: costos de desarrollo
§ plugin.team_total.moneyAll.description: Costos salariales totales, incluidos pago de vacaciones y sobrepago por trabajo en fines de semana.
§ plugin.team_total.moneyWorked.title: real
§ plugin.team_total.moneyWorked.description: Días efectivamente trabajados multiplicados por el salario medio
§ plugin.team_total.moneyLosses.title: posible sobrepago
§ plugin.team_total.moneyLosses.description: Días laborables pagados cuando no hubo commits
§ plugin.team_total.weekendPayment.title: trabajo en fin de semana
§ plugin.team_total.weekendPayment.description: Sobrepago total por trabajo en fines de semana
§ plugin.team_total.workSpeed.title: tareas al día
§ plugin.team_total.workSpeed.description: Velocidad media de trabajo del equipo con la composición actual de personal
§ plugin.team_total.moneySpeed.title: al mes
§ plugin.team_total.moneySpeed.description: Monto estimado de nómina con la composición actual de personal, sin impuestos ni costos asociados
§ plugin.team_total.description1: *Días-persona* es el trabajo de un empleado durante un día laborable. Por ejemplo, en un día calendario, un equipo de tres empleados entrega un volumen de trabajo de tres días-persona.
§ plugin.team_total.description2: Por *días de ausencia* se consideran solo los días laborables en los que podrían haberse hecho commits. Los fines de semana, festivos oficiales y vacaciones no participan en el cálculo.
§ plugin.team_total.description3: La tarjeta *activos y baja* muestra la composición real del personal que participa de forma constante en el trabajo. Además, hay “ayudantes”: empleados, por lo general de otra especialidad, que pueden hacer commits en el proyecto de vez en cuando.
§ plugin.team_total.description4: Por *sobrepago* se consideran solo los días laborables en los que podrían haberse hecho commits. Los fines de semana, festivos oficiales y vacaciones no participan en el cálculo. Por eso, sobrepago + costo real != total. En el total se incluye el pago de fines de semana, festivos oficiales y vacaciones.
§ plugin.team_total.description5: Por *trabajo en fin de semana* se aplica un coeficiente x2 respecto al pago de un día normal. Arriba se muestra solo el sobrepago (x1), ya que el hecho de la sobrejornada en este contexto no es relevante. No observamos la velocidad de quema del presupuesto. Observamos el sobrepago al aumentar la velocidad de trabajo.
`;
