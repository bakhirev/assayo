export default `
§ plugin.team_total.sidebar: सामान्य जानकारी
§ plugin.team_total.common.title: सामान्य जानकारी
§ plugin.team_total.common.duration.title: कार्य की कुल अवधि
§ plugin.team_total.common.duration.description: पहली से आख़िरी कमिट तक का पूरा विकास समय
§ plugin.team_total.common.location.title: केंद्रीय कार्यालय
§ plugin.team_total.common.employees.title: विभाग में लोग
§ plugin.team_total.release.title: रिलीज़ जानकारी
§ plugin.team_total.release.total.title: कुल रिलीज़
§ plugin.team_total.release.total.description: रिलीज़ जानकारी
§ plugin.team_total.money.title: विकास लागत
§ plugin.team_total.titleA: कार्य-परिमाण
§ plugin.team_total.titleB: लागत
§ plugin.team_total.daysWorked.title: व्यक्ति-दिन
§ plugin.team_total.daysWorked.description: केवल वे दिन गिने जाते हैं जिनमें कमिट किए गए
§ plugin.team_total.commits.title: कमिट्स
§ plugin.team_total.commits.description: हटाई गई ब्रांचों को नहीं गिना जाता
§ plugin.team_total.daysLosses.title: बिना कमिट वाले दिन
§ plugin.team_total.daysLosses.description: सभी दिन घटाकर: छुट्टियाँ, वीकेंड, अवकाश, कमिट वाले दिन
§ plugin.team_total.employment.title: कार्यरत / छोड़ चुके
§ plugin.team_total.employment.description: यदि किसी कर्मचारी ने एक महीने में एक भी कमिट नहीं किया, तो उसे छोड़ चुका माना जाता है
§ plugin.team_total.moneyAll.title: विकास लागत
§ plugin.team_total.moneyAll.description: वेतन की कुल लागत; इसमें अवकाश भुगतान और वीकेंड पर काम के लिए अतिरिक्त भुगतान शामिल है।
§ plugin.team_total.moneyWorked.title: वास्तविक
§ plugin.team_total.moneyWorked.description: वास्तव में काम किए गए दिन × औसत वेतन
§ plugin.team_total.moneyLosses.title: संभावित अधिक भुगतान
§ plugin.team_total.moneyLosses.description: भुगतान किए गए कार्यदिवस जिनमें कमिट नहीं थे
§ plugin.team_total.weekendPayment.title: वीकेंड पर काम
§ plugin.team_total.weekendPayment.description: वीकेंड पर काम के लिए कुल अतिरिक्त भुगतान
§ plugin.team_total.workSpeed.title: प्रति दिन कार्य
§ plugin.team_total.workSpeed.description: वर्तमान स्टाफ संरचना में टीम की औसत कार्य-गति
§ plugin.team_total.moneySpeed.title: प्रति माह
§ plugin.team_total.moneySpeed.description: करों और संबंधित लागतों को छोड़कर, वर्तमान स्टाफ संरचना में अनुमानित वेतन भुगतान राशि
§ plugin.team_total.description1: *व्यक्ति-दिन* का अर्थ है एक कर्मचारी का एक कार्यदिवस में किया गया काम। उदाहरण के लिए, एक कैलेंडर दिन में तीन कर्मचारियों की टीम तीन व्यक्ति-दिन जितना काम प्रदान करती है।
§ plugin.team_total.description2: *अनुपस्थिति के दिन* केवल वे कार्यदिवस माने जाते हैं जिनमें कमिट किए जा सकते थे। वीकेंड, सरकारी छुट्टियाँ और अवकाश गणना में शामिल नहीं होते।
§ plugin.team_total.description3: कार्ड *कार्यरत / छोड़ चुके* उन कर्मचारियों की वास्तविक संरचना दिखाता है जो लगातार काम में शामिल रहते हैं। इसके अलावा “सहायक” भी होते हैं — आम तौर पर अलग विशेषज्ञता वाले कर्मचारी — जो कभी-कभी प्रोजेक्ट में कमिट कर सकते हैं।
§ plugin.team_total.description4: *अधिक भुगतान* केवल वे कार्यदिवस माने जाते हैं जिनमें कमिट किए जा सकते थे। वीकेंड, सरकारी छुट्टियाँ और अवकाश गणना में शामिल नहीं होते। इसी कारण अधिक भुगतान + वास्तविक लागत != कुल। कुल लागत में वीकेंड, सरकारी छुट्टियाँ और अवकाश का भुगतान शामिल है।
§ plugin.team_total.description5: *वीकेंड पर काम* को सामान्य दिन के भुगतान के मुकाबले x2 गुणांक के अनुसार माना जाता है। ऊपर केवल अतिरिक्त भुगतान (x1) दिखाया गया है, क्योंकि इस संदर्भ में ओवरटाइम का तथ्य स्वयं महत्वपूर्ण नहीं है। हम बजट बर्न-रेट नहीं देखते। हम कार्य-गति बढ़ने पर होने वाले अधिक भुगतान को देखते हैं।
`;

