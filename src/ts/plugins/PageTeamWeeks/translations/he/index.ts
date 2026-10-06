import recommendations from './recommendations';

export default `
§ plugin.team_weeks.sidebar: לפי שבועות
§ plugin.team_weeks.title: סטטיסטיקה לפי שבועות
§ plugin.team_weeks.numberTasks: מספר המשימות
§ plugin.team_weeks.people: מספר העובדים
§ plugin.team_weeks.line: שינוי שורות
§ plugin.team_weeks.lossesDetails: מי לא ביצע commit
§ plugin.team_weeks.add: נוסף
§ plugin.team_weeks.change: שונה
§ plugin.team_weeks.remove: הוסר
§ plugin.team_weeks.hasCommits: היו commits
§ plugin.team_weeks.hasNotCommits: לא היו commits
§ plugin.team_weeks.last.title: סטטיסטיקה לשבוע שנבחר
§ plugin.team_weeks.last.titleDefault: השבוע האחרון
§ plugin.team_weeks.last.tasks.title: משימות השבוע
§ plugin.team_weeks.last.tasks.description: מספרי משימות ייחודיים שנמצאו בטווח זמן זה
§ plugin.team_weeks.last.tasks.scoring: ערך לשבוע הקודם / ערך ממוצע לחודש הקודם
§ plugin.team_weeks.last.changes.title: שינוי שורות
§ plugin.team_weeks.last.changes.description: שורות שנוספו, שונו והוסרו
§ plugin.team_weeks.last.changes.scoring: ערך לשבוע הקודם / ערך ממוצע לחודש הקודם
§ plugin.team_weeks.last.types.title: סוגי commit
§ plugin.team_weeks.last.days.title: ימי אדם בפועל
§ plugin.team_weeks.last.best.title: הפעיל ביותר
§ plugin.team_weeks.last.best.description: הכי הרבה משימות השבוע
§ plugin.team_weeks.last.quiet.title: שבוע שקט
§ plugin.team_weeks.last.quiet.description: הכי מעט משימות השבוע
§ plugin.team_weeks.last.vsPrev: לעומת השבוע הקודם
${recommendations}
`;
