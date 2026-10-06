import recommendations from './recommendations';

export default `
§ plugin.team_weeks.sidebar: حسب الأسابيع
§ plugin.team_weeks.title: الإحصائيات حسب الأسابيع
§ plugin.team_weeks.numberTasks: عدد المهام
§ plugin.team_weeks.people: عدد الموظفين
§ plugin.team_weeks.line: تغيير الأسطر
§ plugin.team_weeks.lossesDetails: من لم يقم بعمل commit
§ plugin.team_weeks.add: أُضيف
§ plugin.team_weeks.change: تغيّر
§ plugin.team_weeks.remove: أُزيل
§ plugin.team_weeks.hasCommits: وُجدت commits
§ plugin.team_weeks.hasNotCommits: لم توجد commits
§ plugin.team_weeks.last.title: إحصائيات الأسبوع المحدد
§ plugin.team_weeks.last.titleDefault: الأسبوع الأخير
§ plugin.team_weeks.last.tasks.title: مهام الأسبوع
§ plugin.team_weeks.last.tasks.description: أرقام المهام الفريدة المكتشفة في هذا النطاق الزمني
§ plugin.team_weeks.last.tasks.scoring: القيمة للأسبوع السابق / متوسط القيمة للشهر السابق
§ plugin.team_weeks.last.changes.title: تغيير الأسطر
§ plugin.team_weeks.last.changes.description: الأسطر المضافة والمغيّرة والمحذوفة
§ plugin.team_weeks.last.changes.scoring: القيمة للأسبوع السابق / متوسط القيمة للشهر السابق
§ plugin.team_weeks.last.types.title: أنواع commit
§ plugin.team_weeks.last.days.title: أيام الشخص الفعلية
§ plugin.team_weeks.last.best.title: الأكثر نشاطًا
§ plugin.team_weeks.last.best.description: أكبر عدد من المهام هذا الأسبوع
§ plugin.team_weeks.last.quiet.title: أسبوع هادئ
§ plugin.team_weeks.last.quiet.description: أقل عدد من المهام هذا الأسبوع
§ plugin.team_weeks.last.vsPrev: مقارنة بالأسبوع السابق
${recommendations}
`;
