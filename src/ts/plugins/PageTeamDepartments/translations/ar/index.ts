export default `
§ plugin.team_departments.sidebar: الأقسام
§ plugin.team_departments.employmentsChart.title: أحجام الفرق الحالية
§ plugin.team_departments.employmentsChart.item: فرق
§ plugin.team_departments.employmentsChart.less1: موظف واحد
§ plugin.team_departments.employmentsChart.less2: موظفان
§ plugin.team_departments.employmentsChart.less3: ثلاثة موظفين
§ plugin.team_departments.employmentsChart.less6: حتى ستة موظفين
§ plugin.team_departments.employmentsChart.less9: حتى تسعة موظفين
§ plugin.team_departments.employmentsChart.less12: حتى 12 موظفًا
§ plugin.team_departments.employmentsChart.less15: حتى 15 موظفًا
§ plugin.team_departments.employmentsChart.more: أكثر من 15
§ plugin.team_departments.daysChart.title: مدة المشروع
§ plugin.team_departments.daysChart.item: مشاريع
§ plugin.team_departments.title: قائمة المشاريع
§ plugin.team_departments.status: الحالة
§ plugin.team_departments.active.yes: التطوير جارٍ
§ plugin.team_departments.active.no: لا توجد مهام جديدة
§ plugin.team_departments.author.work: يعمل
§ plugin.team_departments.author.dismissed: غادر
§ plugin.team_departments.author.staff: موظف مساند
§ plugin.team_departments.code: الرمز
§ plugin.team_departments.from: أول commit
§ plugin.team_departments.to: الأخير
§ plugin.team_departments.authors: أشخاص
§ plugin.team_departments.tasks: مهام
§ plugin.team_departments.totalDays: المدة
§ plugin.team_departments.totalAuthors: الموظفون
§ plugin.team_departments.totalTasks: المهام
§ plugin.team_departments.employments.author: الموظف
§ plugin.team_departments.employments.worked: العمل
§ plugin.team_departments.employments.losses: أيام بلا commits
§ plugin.team_departments.employments.totalDays: الأيام في القسم
§ plugin.team_departments.employments.totalTasks: المهام المنجزة
§ plugin.team_departments.banner.title: معلومات تفصيلية عن القسم
§ plugin.team_departments.details.title: البيانات الفعلية للقسم
§ plugin.team_departments.details.totalDays: مدة العمل
§ plugin.team_departments.details.moneyInMonth: تكلفة التطوير شهريًا
§ plugin.team_departments.details.moneyAll: تكلفة التطوير على مدار الفترة
§ plugin.team_departments.details.mainLocation: الموقع الرئيسي
§ plugin.team_departments.details.activeAuthors.title: يعمل / غادر
§ plugin.team_departments.details.activeAuthors.description: إذا لم يُجرِ الموظف أي commit خلال شهر، يُعدّ قد غادر. تُعرض الحالة للموظفين دون ارتباط بهذا القسم: قد يعملون في أي قسم أو يكونون قد غادروا الشركة بالكامل.
§ plugin.team_departments.details.linesInTask.title: أسطر التعليمات البرمجية لكل مهمة
§ plugin.team_departments.details.linesInTask.description: المتوسط المرجّح لعدد أسطر التعليمات البرمجية لكل مهمة. يساعد على تقدير دقة المهام.
§ plugin.team_departments.details.totalTasks.title: مهام كانت قيد العمل
§ plugin.team_departments.details.totalTasks.description: يُحتسب أي ذكر لمعرّف مهمة فريد. قد لا تكون المهمة مغلقة في متعقّب المهام.
§ plugin.team_departments.months.title: العدد المحتمل للموظفين في القسم
§ plugin.team_departments.months.description: يُصدر متعقّب المهام معرّفات مهام متسلسلة. بمعرفة أقصى معرّف مهمة في بداية الشهر ونهايته يمكن معرفة عدد *المهام الجديدة*. وعدد المهام *المُصلحة* هذا الشهر يظهر في السجلات. ومن أصلحها (*عمل*) يظهر أيضًا. وعدد المهام التي أُصلحت لاحقًا (*المتأخرات*) يُحسب كذلك من سجلات الأشهر التالية. نُسقط إنتاجية المبرمجين الذين نراهم على إجمالي عدد المهام لتقدير عدد *إجمالي المبرمجين* الذي ينبغي أن يكون في القسم. وبناءً على عدد «المبرمجين» نقدّر عدد مهندسي ضمان الجودة والمحللين والمديرين.
§ plugin.team_departments.months.newTaskInMonth: مهام جديدة
§ plugin.team_departments.months.tasksFixedThisGroup: أُصلحت
§ plugin.team_departments.months.tasksInBacklog: المتأخرات
§ plugin.team_departments.months.programmistInThisGroup: عملوا
§ plugin.team_departments.months.allProgrammistInDepartment: ينبغي أن يعملوا
§ plugin.team_departments.months.allUsersInDepartment: إجمالي الموظفين
§ plugin.team_departments.forecasting.title: توقّع التكلفة الكاملة
§ plugin.team_departments.forecasting.moneyInMonth.title: تكاليف القسم شهريًا
§ plugin.team_departments.forecasting.moneyInMonth.description: نضرب عدد جميع الموظفين المحتملين (التطوير، ضمان الجودة، التحليلات، الإدارة) لآخر شهر في متوسط الراتب.
§ plugin.team_departments.forecasting.moneyAll.title: تكاليف القسم على مدار الفترة
§ plugin.team_departments.forecasting.moneyAll.description: نضرب عدد جميع الموظفين المحتملين (التطوير، ضمان الجودة، التحليلات، الإدارة) لكل شهر في متوسط الراتب.
`;
