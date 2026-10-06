export default `
§ plugin.team_weeks.recommendations.lazyDays.down.title: פחות היעדרויות
§ plugin.team_weeks.recommendations.lazyDays.down.description: מדד זה ירד בשלושת השבועות האחרונים
§ plugin.team_weeks.recommendations.lazyDays.up.title: יותר היעדרויות
§ plugin.team_weeks.recommendations.lazyDays.up.description: אין משימות או נדרשת בקרה הדוקה יותר
§ plugin.team_weeks.recommendations.notWork.title: באופן יציב אינו משלים את מלוא הזמן
§ plugin.team_weeks.recommendations.notWork.description: משום שבכל שבוע נכתב קוד בפחות מ-100% מהזמן
§ plugin.team_weeks.recommendations.upWork.title: באופן יציב עובד שעות נוספות
§ plugin.team_weeks.recommendations.upWork.description: משום שבכל שבוע נכתב קוד בסופי שבוע
§ plugin.team_weeks.recommendations.task.up.title: הפרודוקטיביות עולה
§ plugin.team_weeks.recommendations.task.up.description
או שהמשימות נעשו קטנות מדי.
 
יש לבדוק. אם רמת הפירוט זהה, יש לקבע את התוצאה.
§ plugin.team_weeks.recommendations.task.lazyMaintainer.description: מוביל יציב בהיעדר commits.
§ plugin.team_weeks.recommendations.task.down.title: הפרודוקטיביות יורדת
§ plugin.team_weeks.recommendations.task.down.description
או שהמשימות מפוצלות פחות טוב. יש לבדוק. אם רמת הפירוט זהה, יש להעביר לבקרה.

# שיטת הערכה:
- מספר המשימות ליום שעליהן עובדים יורד באופן יציב לאורך שלושת השבועות האחרונים.

# שגיאות אפשריות:
- ייתכן שהמשימות היו קשות יותר מכפי שנדמה;
- ייתכן שלמשימות היה היקף עבודה גדול (יש לבדוק אם מספר השינויים יורד באותה תקופה)
`;
