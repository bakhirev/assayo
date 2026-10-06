export default `
§ plugin.team_weeks.recommendations.lazyDays.down.title: अनुपस्थिति कम हुई
§ plugin.team_weeks.recommendations.lazyDays.down.description: पिछले तीन सप्ताहों में यह संकेतक गिरा है
§ plugin.team_weeks.recommendations.lazyDays.up.title: अनुपस्थिति बढ़ी
§ plugin.team_weeks.recommendations.lazyDays.up.description: कार्य नहीं हैं या अधिक सख्त नियंत्रण आवश्यक है
§ plugin.team_weeks.recommendations.notWork.title: स्थिर रूप से पूरा समय नहीं देता
§ plugin.team_weeks.recommendations.notWork.description: क्योंकि प्रत्येक सप्ताह 100% से कम समय कोड लिखा जाता है
§ plugin.team_weeks.recommendations.upWork.title: स्थिर रूप से अतिरिक्त समय काम करता है
§ plugin.team_weeks.recommendations.upWork.description: क्योंकि प्रत्येक सप्ताह सप्ताहांत में कोड लिखा जाता है
§ plugin.team_weeks.recommendations.task.up.title: उत्पादकता बढ़ रही है
§ plugin.team_weeks.recommendations.task.up.description
या कार्य बहुत छोटे हो गए हैं।
 
जाँच आवश्यक है। यदि विवरण का स्तर वही है, तो परिणाम को स्थिर करें।
§ plugin.team_weeks.recommendations.task.lazyMaintainer.description: commits की अनुपस्थिति में स्थिर अग्रणी।
§ plugin.team_weeks.recommendations.task.down.title: उत्पादकता गिर रही है
§ plugin.team_weeks.recommendations.task.down.description
या कार्य कम अच्छी तरह बाँटे जाते हैं। जाँच आवश्यक है। यदि विवरण का स्तर वही है, तो नियंत्रण में लें।

# मूल्यांकन विधि:
- प्रति दिन जिन कार्यों पर काम होता है, उनकी संख्या पिछले तीन सप्ताहों में स्थिर रूप से गिर रही है।

# संभावित त्रुटियाँ:
- कार्य जितना लगा, उससे कठिन हो सकते थे;
- कार्यों में कार्य की मात्रा अधिक हो सकती थी (जाँचें कि इसी अवधि में परिवर्तनों की संख्या गिर रही है या नहीं)
`;
