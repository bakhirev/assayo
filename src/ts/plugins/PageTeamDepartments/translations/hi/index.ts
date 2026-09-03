export default `
§ plugin.team_departments.sidebar: विभाग
§ plugin.team_departments.employmentsChart.title: वर्तमान टीम आकार
§ plugin.team_departments.employmentsChart.item: टीमें
§ plugin.team_departments.employmentsChart.less1: एक कर्मचारी
§ plugin.team_departments.employmentsChart.less2: दो कर्मचारी
§ plugin.team_departments.employmentsChart.less3: तीन कर्मचारी
§ plugin.team_departments.employmentsChart.less6: अधिकतम छह कर्मचारी
§ plugin.team_departments.employmentsChart.less9: अधिकतम नौ कर्मचारी
§ plugin.team_departments.employmentsChart.less12: अधिकतम 12 कर्मचारी
§ plugin.team_departments.employmentsChart.less15: अधिकतम 15 कर्मचारी
§ plugin.team_departments.employmentsChart.more: 15 से अधिक
§ plugin.team_departments.daysChart.title: परियोजना अवधि
§ plugin.team_departments.daysChart.item: परियोजनाएँ
§ plugin.team_departments.title: परियोजना सूची
§ plugin.team_departments.status: स्थिति
§ plugin.team_departments.active.yes: विकास जारी है
§ plugin.team_departments.active.no: कोई नए कार्य नहीं
§ plugin.team_departments.author.work: कार्यरत
§ plugin.team_departments.author.dismissed: छोड़ चुके
§ plugin.team_departments.author.staff: सहायक
§ plugin.team_departments.code: कोड
§ plugin.team_departments.from: पहला commit
§ plugin.team_departments.to: अंतिम
§ plugin.team_departments.authors: लोग
§ plugin.team_departments.tasks: कार्य
§ plugin.team_departments.totalDays: अवधि
§ plugin.team_departments.totalAuthors: कर्मचारी
§ plugin.team_departments.totalTasks: कार्य
§ plugin.team_departments.employments.author: कर्मचारी
§ plugin.team_departments.employments.worked: कार्य
§ plugin.team_departments.employments.losses: बिना commits के दिन
§ plugin.team_departments.employments.totalDays: विभाग में दिन
§ plugin.team_departments.employments.totalTasks: पूर्ण किए गए कार्य
§ plugin.team_departments.banner.title: विभाग की विस्तृत जानकारी
§ plugin.team_departments.details.title: विभाग का वास्तविक डेटा
§ plugin.team_departments.details.totalDays: कार्य अवधि
§ plugin.team_departments.details.moneyInMonth: प्रति माह विकास लागत
§ plugin.team_departments.details.moneyAll: पूरी अवधि की विकास लागत
§ plugin.team_departments.details.mainLocation: मुख्य स्थान
§ plugin.team_departments.details.activeAuthors.title: कार्यरत / छोड़ चुके
§ plugin.team_departments.details.activeAuthors.description: यदि किसी कर्मचारी ने एक महीने में एक भी commit नहीं किया, तो उसे कार्य छोड़ चुका माना जाता है। स्थिति कर्मचारियों के लिए इस विभाग से स्वतंत्र दिखाई जाती है: वे किसी भी विभाग में काम कर सकते हैं या कंपनी पूरी तरह छोड़ चुके हो सकते हैं।
§ plugin.team_departments.details.linesInTask.title: प्रति कार्य कोड पंक्तियाँ
§ plugin.team_departments.details.linesInTask.description: प्रति कार्य कोड पंक्तियों की भारित औसत संख्या। कार्यों की बारीकी का अनुमान लगाने में मदद करती है।
§ plugin.team_departments.details.totalTasks.title: कार्य जो प्रगति में थे
§ plugin.team_departments.details.totalTasks.description: किसी अद्वितीय कार्य ID का कोई भी उल्लेख गिना जाता है। कार्य ट्रैकर में कार्य बंद नहीं किया गया हो सकता है।
§ plugin.team_departments.months.title: विभाग में कर्मचारियों की संभावित संख्या
§ plugin.team_departments.months.description: कार्य ट्रैकर क्रमिक कार्य ID जारी करता है। महीने की शुरुआत और अंत में अधिकतम कार्य ID जानकर *नए कार्यों* की संख्या ज्ञात की जा सकती है। इस महीने *सुधारे गए* कार्यों की संख्या लॉग में दिखाई देती है। इन्हें किसने सुधारा (*काम किया*) भी दिखाई देता है। बाद में सुधारे गए कार्यों की संख्या (*बैकलॉग*) अगले महीनों के लॉग से निकाली जाती है। हम दिखने वाले प्रोग्रामर की उत्पादकता को कुल कार्यों पर बढ़ाकर अनुमान लगाते हैं कि विभाग में *कुल प्रोग्रामर* कितने होने चाहिए। «प्रोग्रामर» की संख्या के आधार पर हम QA इंजीनियरों, विश्लेषकों और प्रबंधकों की संख्या का अनुमान लगाते हैं।
§ plugin.team_departments.months.newTaskInMonth: नए कार्य
§ plugin.team_departments.months.tasksFixedThisGroup: सुधारे गए
§ plugin.team_departments.months.tasksInBacklog: बैकलॉग
§ plugin.team_departments.months.programmistInThisGroup: काम किया
§ plugin.team_departments.months.allProgrammistInDepartment: काम करना चाहिए
§ plugin.team_departments.months.allUsersInDepartment: कुल कर्मचारी
§ plugin.team_departments.forecasting.title: पूर्ण लागत का पूर्वानुमान
§ plugin.team_departments.forecasting.moneyInMonth.title: विभाग की मासिक लागत
§ plugin.team_departments.forecasting.moneyInMonth.description: पिछले महीने के सभी संभावित कर्मचारियों (विकास, QA, विश्लेषण, प्रबंधन) की संख्या को औसत वेतन से गुणा करें।
§ plugin.team_departments.forecasting.moneyAll.title: पूरी अवधि की विभाग लागत
§ plugin.team_departments.forecasting.moneyAll.description: प्रत्येक महीने के सभी संभावित कर्मचारियों (विकास, QA, विश्लेषण, प्रबंधन) की संख्या को औसत वेतन से गुणा करें।
`;
