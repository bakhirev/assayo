export default `
§ plugin.team_total.sidebar: सामान्य जानकारी
§ plugin.team_total.common.title: परियोजना के बारे में
§ plugin.team_total.workSpeed.title: प्रति दिन कार्य
§ plugin.team_total.workSpeed.description: वर्तमान कर्मचारी संरचना में टीम की औसत उत्पादकता
§ plugin.team_total.employment.title: कार्यरत / छोड़ चुके
§ plugin.team_total.employment.description: यदि किसी कर्मचारी ने एक महीने में एक भी commit नहीं बनाया, तो उसे छोड़ चुका माना जाता है
§ plugin.team_total.common.duration.title: कुल कार्य अवधि
§ plugin.team_total.common.duration.description: पहले से अंतिम commit तक कुल विकास समय।
§ plugin.team_total.common.location.title: प्रधान कार्यालय
§ plugin.team_total.common.location.description: वर्तमान मुख्य कर्मचारी संरचना के लिए सबसे सामान्य स्थान।
§ plugin.team_total.common.employees.title: विभाग में लोग
§ plugin.team_total.common.employees.description: कार्य ID की परिवर्तन दर के आधार पर कुल कर्मचारी संख्या के पूर्वानुमान से।
§ plugin.team_total.release.title: रिलीज़ जानकारी
§ plugin.team_total.release.total.title: कुल रिलीज़
§ plugin.team_total.release.total.description: रिलीज़ वह branch है जिसमें शब्द "release" हो। नियम के अनुसार, वे "auto-merge" घटनाओं में दिखाई देते हैं।
§ plugin.team_total.money.title: विकास लागत का अनुमान
§ plugin.team_total.moneyAll.title: कुल
§ plugin.team_total.moneyAll.description: कुल वेतन लागत, जिसमें अवकाश भुगतान और सप्ताहांत कार्य के लिए अधिक भुगतान शामिल है।
§ plugin.team_total.moneyWorked.title: वास्तविक
§ plugin.team_total.moneyWorked.description: वास्तव में काम किए गए दिन औसत वेतन से गुणा।
§ plugin.team_total.moneyLosses.title: संभावित अधिक भुगतान
§ plugin.team_total.moneyLosses.description: भुगतान किए गए कार्यदिवस जब कोई commits नहीं थे।
§ plugin.team_total.weekendPayment.title: सप्ताहांत कार्य
§ plugin.team_total.weekendPayment.description: सप्ताहांत कार्य के लिए कुल अधिक भुगतान।
§ plugin.team_total.moneySpeed.title: प्रति माह
§ plugin.team_total.moneySpeed.description: वर्तमान कर्मचारी संरचना में अनुमानित वेतन राशि, कर, उपकरण मूल्यह्रास और संबंधित लागतों को छोड़कर।
§ plugin.team_total.forecastingMoneyAll.title: समय के साथ परियोजना लागत
§ plugin.team_total.forecastingMoneyAll.description: विभाग के सभी संभावित कर्मचारियों के लिए समय के साथ संभावित वेतन राशि जो लॉग में नहीं हैं लेकिन हो सकते थे (टास्क ट्रैकर में कार्य ID क्रमांकन के आधार पर)।    
§ plugin.team_total.description1: *मानव-दिवस* एक कर्मचारी का एक कार्यदिवस में किया गया कार्य है। उदाहरण के लिए, एक कैलेंडर दिन में तीन कर्मचारियों की टीम तीन मानव-दिवस का कार्य मात्रा देती है।
§ plugin.team_total.description2: *अनुपस्थिति के दिन* में केवल वे कार्यदिवस शामिल हैं जिनमें commits बनाए जा सकते थे। सप्ताहांत, सरकारी छुट्टियाँ और अवकाश गणना में शामिल नहीं होते।
§ plugin.team_total.description3: कार्ड *कार्यरत / छोड़ चुके* उन वास्तविक कर्मचारियों को दिखाता है जो लगातार कार्य में शामिल रहते हैं। इसके अलावा “सहायक” होते हैं — आमतौर पर भिन्न विशेषज्ञता वाले लोग जो कभी-कभी परियोजना में commits बना सकते हैं।
§ plugin.team_total.description4: *अधिक भुगतान* में केवल वे कार्यदिवस शामिल हैं जिनमें commits बनाए जा सकते थे। सप्ताहांत, सरकारी छुट्टियाँ और अवकाश गणना में शामिल नहीं होते। इसलिए अधिक भुगतान + वास्तविक लागत != कुल। कुल लागत में सप्ताहांत, सरकारी छुट्टियाँ और अवकाश का भुगतान शामिल है।
§ plugin.team_total.description5: *सप्ताहांत कार्य* की गणना सामान्य दिन के भुगतान के सापेक्ष x2 गुणांक से होती है। ऊपर केवल अधिक भुगतान (x1) दिखाया गया है, क्योंकि इस संदर्भ में ओवरटाइम का तथ्य स्वयं महत्वपूर्ण नहीं है। हम बजट खर्च की गति नहीं देखते। हम कार्य गति बढ़ने पर अधिक भुगतान देखते हैं।
`;
