export default `
§ plugin.team_total.sidebar: מידע כללי
§ plugin.team_total.common.title: מידע כללי
§ plugin.team_total.common.duration.title: משך העבודה הכולל
§ plugin.team_total.common.duration.description: כל זמן הפיתוח מהקומיט הראשון ועד האחרון
§ plugin.team_total.common.location.title: המשרד המרכזי
§ plugin.team_total.common.employees.title: אנשים במחלקה
§ plugin.team_total.release.title: מידע על גרסאות
§ plugin.team_total.release.total.title: סך כל הגרסאות
§ plugin.team_total.release.total.description: מידע על גרסאות
§ plugin.team_total.money.title: עלות הפיתוח
§ plugin.team_total.titleA: היקף עבודה
§ plugin.team_total.titleB: עלות
§ plugin.team_total.daysWorked.title: ימי-אדם
§ plugin.team_total.daysWorked.description: נספרים רק ימים שבהם בוצעו קומיטים
§ plugin.team_total.commits.title: קומיטים
§ plugin.team_total.commits.description: ענפים שנמחקו לא נספרים
§ plugin.team_total.daysLosses.title: ימים ללא קומיטים
§ plugin.team_total.daysLosses.description: כל הימים מינוס: חגים, סופי שבוע, חופשה, ימים עם קומיטים
§ plugin.team_total.employment.title: עובד / עזב
§ plugin.team_total.employment.description: אם עובד לא ביצע אף קומיט במשך חודש, הוא נחשב כעזב
§ plugin.team_total.moneyAll.title: עלויות פיתוח
§ plugin.team_total.moneyAll.description: עלויות שכר מצטברות, כולל תשלום חופשה ותוספת עבור עבודה בסופי שבוע.
§ plugin.team_total.moneyWorked.title: בפועל
§ plugin.team_total.moneyWorked.description: ימים שעבד בפועל כפול השכר הממוצע
§ plugin.team_total.moneyLosses.title: תשלום יתר אפשרי
§ plugin.team_total.moneyLosses.description: ימי עבודה ששולמו שבהם לא היו קומיטים
§ plugin.team_total.weekendPayment.title: עבודה בסופי שבוע
§ plugin.team_total.weekendPayment.description: סך תשלום היתר עבור עבודה בסופי שבוע
§ plugin.team_total.workSpeed.title: משימות ביום
§ plugin.team_total.workSpeed.description: מהירות עבודה ממוצעת של הצוות בהרכב העובדים הנוכחי
§ plugin.team_total.moneySpeed.title: בחודש
§ plugin.team_total.moneySpeed.description: סכום תשלום השכר החזוי בהרכב העובדים הנוכחי ללא מיסים ועלויות נלוות
§ plugin.team_total.description1: *ימי-אדם* הם העבודה של עובד אחד במהלך יום עבודה אחד. לדוגמה, ביום קלנדרי אחד, צוות של שלושה עובדים מספק היקף עבודה של שלושה ימי-אדם.
§ plugin.team_total.description2: *ימי היעדרות* נספרים רק כימי עבודה שבהם ניתן היה לבצע קומיטים. סופי שבוע, חגים רשמיים וחופשות אינם נכללים בחישוב.
§ plugin.team_total.description3: הכרטיס *עובד / עזב* מציג את ההרכב בפועל של עובדים המשתתפים בעבודה באופן קבוע. בנוסף יש “עוזרים” — בדרך כלל עובדים בהתמחות אחרת — שיכולים לעיתים לבצע קומיטים בפרויקט.
§ plugin.team_total.description4: *תשלום יתר* כולל רק ימי עבודה שבהם ניתן היה לבצע קומיטים. סופי שבוע, חגים רשמיים וחופשות אינם נכללים בחישוב. לכן תשלום יתר + עלות בפועל != כולל. העלות הכוללת כוללת תשלום עבור סופי שבוע, חגים רשמיים וחופשות.
§ plugin.team_total.description5: *עבודה בסופי שבוע* מחושבת במקדם x2 ביחס לתשלום של יום רגיל. למעלה מוצג רק תשלום היתר (x1), כי עצם העובדה של שעות נוספות אינה מעניינת בהקשר הזה. אנחנו לא מסתכלים על קצב שריפת התקציב. אנחנו מסתכלים על תשלום היתר בעת הגדלת מהירות העבודה.
`;

