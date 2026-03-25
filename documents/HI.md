
> [English](https://github.com/bakhirev/assayo) | [Español](https://github.com/bakhirev/assayo/blob/main/documents/ES.md) | [Français](https://github.com/bakhirev/assayo/blob/main/documents/FR.md) | [Português](https://github.com/bakhirev/assayo/blob/main/documents/PT.md) | [Deutsch](https://github.com/bakhirev/assayo/blob/main/documents/DE.md) | [中文](https://github.com/bakhirev/assayo/blob/main/documents/ZH.md) | [日本語](https://github.com/bakhirev/assayo/blob/main/documents/JA.md) | [한국어](https://github.com/bakhirev/assayo/blob/main/documents/KO.md) | [العربية](https://github.com/bakhirev/assayo/blob/main/documents/AR.md) | __[हिन्दी](https://github.com/bakhirev/assayo/blob/main/documents/HI.md)__ | [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

# [Assayo](https://bakhirev.github.io/?ref=github&lang=hi)
एक HTML-रिपोर्ट बनाता है जिसमें कॉमिट सामग्री का विश्लेषण होता है:
- काम की गति और अतिकाल के घंटे की संख्या;
- जिम्मेदारी के क्षेत्र, फीचर्स और बग्स की संख्या;
- साथियों का काम करने का तरीका;
- कर्मचारी चलाता है और टीम का संरचना;
- डेवलपर्स का स्थान;
- रिलीज स्केजूल और वाकेशन कैलेंडर;
- फीचर्स और प्रोजेक्ट का कुल लागत;
- रिफैक्टरिंग के लिए जगह, हटाए गए फाइलें, आदि।

**लिंक्स:** [demo](https://bakhirev.github.io/demo/?ref=github&dump=./test.txt), [online version](https://bakhirev.github.io/demo/?ref=github), [docker](https://hub.docker.com/r/bakhirev/assayo), [reddit](https://www.reddit.com/r/ITManagers/comments/1e5k291/the_visualization_and_analysis_of_git_commit/), [habr](https://habr.com/ru/articles/852782/)

**विडियो:** [english](https://www.youtube.com/watch?v=uMbhrrd25t4), [español](https://www.youtube.com/watch?v=skmctb_2rZ0), [русский](https://www.youtube.com/watch?v=jwCp_-bhrCQ)

<a href="https://bakhirev.github.io/demo/?ref=github&dump=./test.txt" target="_blank"><img src="https://bakhirev.github.io/assets/images/index.gif" width="100%" /></a>

<a name="link-0"></a>
### सामग्री सूची
- [कॉमिट सामग्री रिपोर्ट](#link-1)
  - [रिपोर्ट कैसे बनाएं और देखें?](#link-2)
    - [पब्लिक सर्वर का उपयोग](#link-3)
    - [NodeJS लाइब्रेरी का उपयोग](#link-4)
    - [PHP की लाइब्रेरी का उपयोग करें](#link-5)
    - [Python की लाइब्रेरी का उपयोग करें](#link-6)
    - [Ruby की लाइब्रेरी का उपयोग करें](#link-7)
    - [Go की लाइब्रेरी का उपयोग करें](#link-8)
    - [स्रोत कोड का उपयोग करें](#link-9)
    - [GitHub एक्शन्स का उपयोग करें](#link-10)
    - [प्राइवेट सर्वर का उपयोग करें](#link-11)
  - [लेखकों को कैसे संयोजित करें?](#link-12)
  - [गिट से डाटा को txt फाइल में कैसे एक्सपोर्ट करें?](#link-13)
    - [ऑनलाइन डेखने के लिए](#link-14)
    - [ऑफलाइन डेखने के लिए](#link-15)
    - [यदि आप विंडोज में पावरशेल का उपयोग कर रहे हैं](#link-16)
  - [किस प्रकार से माइक्रोसर्विस के समूह पर रिपोर्ट देख सकते हैं?](#link-17)


- [प्रोजेक्ट में सबसे अच्छी प्रैक्टिस](#link-18)
  - [किस प्रकार से कमिट्स साइन करें?](#link-19)
  - [कॉमिट मेसेज के लिए चेकिंग कैसे अड्ड करें?](#link-20)
    - [commit-msg फाइल का उपयोग करें](#link-21)
    - [पैकेज pre-commit का उपयोग करें](#link-22)


- [अपने एप के बारे में](#link-23)
  - [इंटरफेस को ब्रांड कैसे करें?](#link-24)
  - [HTML रिपोर्ट को स्रोत कोड से कैसे रिबिल्ड करें?](#link-25)
  - [अनुवाद कैसे जोड़ें या संपादित करें?](#link-26)
  - [आर्किटेक्चर](#link-27)
    - [माइक्रोसर्विस का सामान्य आर्किटेक्चर](#link-29)
  - [फीडबैक, टिप्पणियां](#link-30)

<a name="link-1"></a>
##  कॉमिट सामग्री रिपोर्ट

<a name="link-2"></a>
### 📈 रिपोर्ट कैसे बनाएं और देखें?

<a name="link-3"></a>
#### पब्लिक सर्वर का उपयोग
- https://bakhirev.github.io/ पर जाएं
- निर्देशों का पालन करें

<a name="link-4"></a>
#### NodeJS लाइब्रेरी का उपयोग
- `npx assayo` चालू करें
- `./assayo/index.html` खोलें

<a name="link-5"></a>
#### PHP की लाइब्रेरी का उपयोग करें
- `composer require bakhirev/assayo` चालू करें
- `vendor/bin/assayo` चालू करें
- `./assayo/index.html` खोलें

<a name="link-6"></a>
#### Python की लाइब्रेरी का उपयोग करें
- `pipx install assayo` चालू करें
- `assayo` चालू करें
- `./assayo/index.html` खोलें

<a name="link-7"></a>
#### Ruby की लाइब्रेरी का उपयोग करें
- `gem install assayo` चालू करें
- `assayo` चालू करें
- `./assayo/index.html` खोलें

<a name="link-8"></a>
#### Go की लाइब्रेरी का उपयोग करें
- `go get github.com/bakhirev/assayo` चालू करें
- `go install github.com/bakhirev/assayo` चालू करें
- `assayo` चालू करें
- `./assayo/index.html` खोलें

<a name="link-9"></a>
#### स्रोत कोड का उपयोग करें
- यह रिपोजिटोरी डाउनलोड करें
- `log.txt` फाइल को `/build` में ड्रॉप करें
- `/build/index.html` खोलें
- या अपने रिपोजिटोरी में `/build` फोल्डर को ड्रॉप करें (जहां `log.txt` स्थित है। आप नाम बदल सकते हैं। उदाहरण के लिए, `/build` से `/report` तक।

इस मामले में महत्वपूर्ण है कि `log.txt` फाइल ऑफलाइन भाग पर देखने के लिए कमांड द्वारा जनरेट किया जाता है।

<a name="link-10"></a>
####  GitHub एक्शन्स का उपयोग करें
फोल्डर `.github/workflows/` में [script](https://github.com/bakhirev/assayo/blob/main/documents/ActionExample.yml) जोड़ें या मार्केटप्लेस से इस [action](https://github.com/marketplace/actions/assayo) का उपयोग करें। तैयार, ताजा रिपोर्ट आर्टिफैक्ट्स में सेव किया जाएगा।

<a name="link-11"></a>
#### प्राइवेट सर्वर का उपयोग करें
- [docker image](https://hub.docker.com/r/bakhirev/assayo) डाउनलोड करें;
- अपनी लोकल नेटवर्क पर रन करें;
- रिपोर्ट्स देखने के लिए वेब इंटरफेस का उपयोग करें, डाटा का URL `dump` पैरामीटर में सेट करें:

```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - assayo कंटेनर का URL, वह पोर्ट 80 पर लिस्टन करता है;
you_url    - आपके गिट लॉग्स के साथ कंटेनर का URL;
```
डिफॉल्ट में, इमेज `http://127.0.0.1:80/` पर रन होगा। यदि यह काम नहीं करत

<a name="link-12"></a>
### ‍🎭 लेखकों को कैसे संयोजित करें?
अपनी परियोजना की मूल निर्देशिका में, आपको एक `{फ़ाइल}` फ़ाइल बनाने की आवश्यकता है ।

फ़ाइल की सामग्री का उदाहरण:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
```
इस फाइल के फॉर्मेट के बारे में अधिक पढ़ें, आप [हेयर](https://git-scm.com/docs/gitmailmap) से कर सकते हैं।

<a name="link-13"></a>
### 📤 गिट से डाटा को txt फाइल में कैसे एक्सपोर्ट करें?

<a name="link-14"></a>
####  ऑनलाइन डेखने के लिए
आपके प्रोजेक्ट की मूल डायरेक्टरी में रन करें:

<a name="link-15"></a>
####  ऑफलाइन डेखने के लिए
गिट एक फाइल `log.txt` बनाएगा। यह फाइल में रिपोर्ट शो के लिए डाटा होता है। ऑनलाइन और ऑफलाइन फॉर्मेट के बीच का अंतर स्ट्रिंग्स के लिए वैपर की उपस्थिति है। ऑफलाइन फॉर्मेट `js` फाइल के रूप में पुल अप होगा अगर आप केवल `/build/index.html` खोलते हैं

<a name="link-16"></a>
#### यदि आप विंडोज में पावरशेल का उपयोग कर रहे हैं
डिफॉल्ट में, आउटपुट एन्कोडिंग UTF-8 से मेट्च नहीं कर सकती है और परिणामी लॉग फाइल पठनीय नहीं होगी। लॉग सेव करने से पहले, आप एन्कोडिंग को कमांड से बदल सकते हैं।
```
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```
या सेव किया गया फाइल खोलें और मैन्युअली एन्कोडिंग को UTF-8 में बदलें।

<a name="link-17"></a>
### 🗃️ किस प्रकार से माइक्रोसर्विस के समूह पर रिपोर्ट देख सकते हैं?
- हर माइक्रोसर्विस फाइल के लिए जनरेट करें `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt`, आदि) आप इसे हांड कर सकते हैं, या लॉग कॉलेक्शन के लिए [Assayo Crawler](https://github.com/bakhirev/assayo-crawler) मॉड्यूल का उपयोग करें;
- "किस प्रकार से ऑनलाइन रिपोर्ट देख सकते हैं?" को देखें। अंतिम चरण में, सभी फाइलें ब्राउज़र विंडो में एक साथ ड्रैग करें।
- "किस प्रकार से ऑफलाइन रिपोर्ट देख सकते हैं?" को देखें। दूसरे चरण में, सभी माइक्रोसर्विस फाइलें (`log-1.txt`, `log-2.txt`, `log-3.txt`, आदि) को रिपोर्ट फोल्डर (`/build`) में ड्रैग करें।

<a name="link-18"></a>
## प्रोजेक्ट में सबसे अच्छी प्रैक्टिस

<a name="link-19"></a>
### 📝 किस प्रकार से कमिट्स साइन करें?
[Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) का अनुसरण करें। उदाहरण:
```
JIRA-1234 feat(profile): Added avatar for user
```
- टास्क ट्रैकर में टास्क नंबर `(JIRA-1234)`
- काम का प्रकार `(feat, fix, style, refactor, test, doc, आदि)`
- फीचर `(profile - वेबसाइट पर नया पेज या नया फंक्शन, एक (दो) लंबे शब्द या एक अब्रेविएशन का उपयोग करें)`
- क्या समस्या हल की गई हैं `(Added avatar for user)`

<a name="link-20"></a>
### 👮 कॉमिट मेसेज के लिए चेकिंग कैसे अड्ड करें?

<a name="link-21"></a>
####  commit-msg फाइल का उपयोग करें
1. फोल्डर `.git/hooks/` में फाइल `commit-msg` बनाएं
2. फाइल में यह टेक्स्ट अड्ड करें:
```
#!/usr/bin/env bash
if ! grep -iqE "(JIRA-[0-9]{1,5})(s)(feat|fix|docs|style|refactor|test|chore)((([a-z0-9_-]{1,})){0,})(:s)([a-z]{1,})" "$1"; then
   echo "Need commit message like: JIRA-12 fix(profile): some text. Read Semantic Commit Messages" >&2
   exit 1
fi
```

<a name="link-22"></a>
#### पैकेज [pre-commit](https://www.npmjs.com/package/pre-commit) का उपयोग करें
1. फाइल `package.json` में `commit-msg` प्रॉपर्टी अड्ड करें:
```
...
"commit-msg": {
  "regex": "(JIRA-[0-9]{1,5})(\s)(feat|fix|docs|style|refactor|test|chore)((\([a-z0-9_-]{1,}\)){0,})(:\s)([a-z]{1,})",
    "error-message": "Need commit message like: JIRA-12 fix(profile): some text Read Semantic Commit Messages"
},
...
```
2. कमांड `npm install pre-commit` रन करें

<a name="link-23"></a>
##  अपने एप के बारे में

<a name="link-24"></a>
### 🎨 इंटरफेस को ब्रांड कैसे करें?
आप अपनी ओखला इंटरफेस थीम बना सकते हैं। विकल्प:
- **टाइटल**. आप URL पैरामीटर `title` में डिफॉल्ट डॉक्यूमेंट टाइटल सेट कर सकते हैं। उदाहरण: `?title=You Company`
- **विजुअल थीम**. इसके लिए आपको नए स्टाइल्स के साथ एक CSS फाइल तैयार करनी होगी और इसका URL `theme` पैरामीटर में सेट करना होगा। उदाहरण: `?theme=//company.com/some.css`. आप सेलेक्टर के तौर पर क्लास नाम उपयोग कर सकते हैं। उनमें से बहुत से नये संस्करणों में बदलाव नहीं होते हैं।
- **भाषा**. आप URL पैरामीटर `lang` में भाषा सेट कर सकते हैं। उदाहरण: `?lang=es`

**उदाहरण**: [demo](https://bakhirev.github.io/demo/themes/)

<a name="link-25"></a>
### 🛠️ HTML रिपोर्ट को स्रोत कोड से कैसे रिबिल्ड करें?
- इस रिपोजिटोरी को डाउनलोड करें `git clone https://github.com/bakhirev/assayo.git`
- `npm install` चालू करें
- `npm run build:local` चालू करें
- नया HTML बिल्ड `/build` फोल्डर में होगा

<a name="link-26"></a>
### 🈯 अनुवाद कैसे जोड़ें या संपादित करें?
आप `ts/translations/` फोल्डर में नया अनुवाद या मौजूद अनुवाद को सही कर सकते हैं।
[संदेश](https://github.com/firstcontributions/first-contributions)

<a name="link-27"></a>
### 📐 आर्किटेक्चर

<a name="link-29"></a>
#### माइक्रोसर्विस का सामान्य आर्किटेक्चर
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](https://github.com/bakhirev/assayo-showcase) उपलब्ध रिपोर्ट्स की सूची दिखाता है। प्रत्येक रिपोर्ट का शीर्षक, विवरण और रिपोजिटोरी की सूची होती है।
2. [Crawler service](https://github.com/bakhirev/assayo-crawler) रिपोर्ट के लिए रिपोजिटोरी लॉग्स को संग्रहित करता है।
3. [Log visualization UI](https://github.com/bakhirev/assayo) **(यहां आप हैं)** रिपोर्ट दिखाता है। काम करने के लिए लॉग फाइल की आवश्यकता होती है।

<a name="link-30"></a>
### 📧 फीडबैक, टिप्पणियां
- 📱 [https://t.me/bakhirev](https://t.me/bakhirev) (संपर्क का प्राथमिकता पद्धति)
- 📧 [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- 🌐 [https://bakhirev.github.io/](https://bakhirev.github.io/?ref=github&lang=hi)

