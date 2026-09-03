export default `
§ plugin.team_total.sidebar: מידע כללי
§ plugin.team_total.common.title: על הפרויקט
§ plugin.team_total.workSpeed.title: משימות ביום
§ plugin.team_total.workSpeed.description: התפוקה הממוצעת של הצוות בהרכב העובדים הנוכחי
§ plugin.team_total.employment.title: עובד / עזב
§ plugin.team_total.employment.description: אם עובד לא יצר אף commit במשך חודש, הוא נחשב כמי שעזב
§ plugin.team_total.common.duration.title: משך העבודה הכולל
§ plugin.team_total.common.duration.description: זמן הפיתוח הכולל מה-commit הראשון ועד האחרון.
§ plugin.team_total.common.location.title: המשרד הראשי
§ plugin.team_total.common.location.description: המיקום הנפוץ ביותר להרכב הליבה הנוכחי של העובדים.
§ plugin.team_total.common.employees.title: אנשים במחלקה
§ plugin.team_total.common.employees.description: על בסיס תחזית גודל העובדים הכולל לפי קצב השינוי של מזהי המשימות.
§ plugin.team_total.release.title: מידע על גרסאות
§ plugin.team_total.release.total.title: סך הגרסאות
§ plugin.team_total.release.total.description: גרסה היא branch עם המילה "release". ככלל, הן מופיעות באירועי "auto-merge".
§ plugin.team_total.money.title: הערכת עלות הפיתוח
§ plugin.team_total.moneyAll.title: סך הכול
§ plugin.team_total.moneyAll.description: עלויות שכר כוללות, לרבות תשלום חופשה ותשלום-יתר עבור עבודה בסופי שבוע.
§ plugin.team_total.moneyWorked.title: בפועל
§ plugin.team_total.moneyWorked.description: ימים שעבדו בפועל כפול השכר הממוצע.
§ plugin.team_total.moneyLosses.title: תשלום-יתר אפשרי
§ plugin.team_total.moneyLosses.description: ימי עבודה ששולמו שבהם לא היו commits.
§ plugin.team_total.weekendPayment.title: עבודה בסוף שבוע
§ plugin.team_total.weekendPayment.description: סך תשלום-היתר עבור עבודה בסופי שבוע.
§ plugin.team_total.moneySpeed.title: לחודש
§ plugin.team_total.moneySpeed.description: סכום השכר החזוי בהרכב העובדים הנוכחי, ללא מסים, פחת ציוד ועלויות נלוות.
§ plugin.team_total.forecastingMoneyAll.title: עלויות הפרויקט לאורך זמן
§ plugin.team_total.forecastingMoneyAll.description: סכום שכר אפשרי לאורך זמן לכל העובדים הפוטנציאליים במחלקה שאינם מופיעים בלוגים אך יכלו להיות (לפי מספור מזהי המשימות במעקב המשימות).    
§ plugin.team_total.description1: *ימי-אדם* הם עבודתו של עובד אחד במהלך יום עבודה אחד. לדוגמה, ביום לוח שנה אחד צוות של שלושה עובדים מספק היקף עבודה של שלושה ימי-אדם.
§ plugin.team_total.description2: *ימי היעדרות* כוללים רק ימי עבודה שבהם ניתן היה ליצור commits. סופי שבוע, חגים רשמיים וחופשות אינם נכללים בחישוב.
§ plugin.team_total.description3: הכרטיס *עובד / עזב* מציג את העובדים בפועל המעורבים בעבודה באופן עקבי. בנוסף יש “עוזרים” — בדרך כלל אנשים בהתמחות אחרת שעשויים ליצור commits בפרויקט מדי פעם.
§ plugin.team_total.description4: *תשלום-יתר* כולל רק ימי עבודה שבהם ניתן היה ליצור commits. סופי שבוע, חגים רשמיים וחופשות אינם נכללים בחישוב. לכן תשלום-יתר + עלות בפועל != סך הכול. העלות הכוללת כוללת תשלומים עבור סופי שבוע, חגים רשמיים וחופשות.
§ plugin.team_total.description5: *עבודה בסוף שבוע* מחושבת במקדם x2 ביחס לתשלום של יום רגיל. למעלה מוצג רק תשלום-היתר (x1), כי עצם עובדת השעות הנוספות אינה רלוונטית בהקשר זה. איננו מסתכלים על קצב שריפת התקציב. אנו מסתכלים על תשלום-היתר כאשר מהירות העבודה עולה.
`;
