
> [English](https://github.com/bakhirev/assayo) | [Español](https://github.com/bakhirev/assayo/blob/main/documents/ES.md) | [Français](https://github.com/bakhirev/assayo/blob/main/documents/FR.md) | [Português](https://github.com/bakhirev/assayo/blob/main/documents/PT.md) | [Deutsch](https://github.com/bakhirev/assayo/blob/main/documents/DE.md) | [中文](https://github.com/bakhirev/assayo/blob/main/documents/ZH.md) | [日本語](https://github.com/bakhirev/assayo/blob/main/documents/JA.md) | [한국어](https://github.com/bakhirev/assayo/blob/main/documents/KO.md) | __[العربية](https://github.com/bakhirev/assayo/blob/main/documents/AR.md)__ | [हिन्दी](https://github.com/bakhirev/assayo/blob/main/documents/HI.md) | [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

# [Assayo](https://bakhirev.github.io/?ref=github&lang=ar)
إنشاء تقرير HTML لتحليل إحصائيات الـCommit:
- وضع الтемп العمل والساعات الإضافية;
- مناطق المسؤولية، عدد الوظائف والأخطاء;
- أسلوب عمل الزملاء;
- معدل التدوير للموظفين وتكوين الفريق;
- موقع المطورين;
- جدول الإصدارات وجدول الإجازات;
- تكلفة الوظائف والمشروع ككل;
- الأماكن التي تحتاج إلى إعادة البناء، الملفات المحذوفة، إلخ.

**الرابطات:** [demo](https://bakhirev.github.io/demo/?ref=github&dump=./test.txt), [online version](https://bakhirev.github.io/demo/?ref=github), [docker](https://hub.docker.com/r/bakhirev/assayo), [reddit](https://www.reddit.com/r/ITManagers/comments/1e5k291/the_visualization_and_analysis_of_git_commit/), [habr](https://habr.com/ru/articles/852782/)

**فيديو:** [english](https://www.youtube.com/watch?v=uMbhrrd25t4), [español](https://www.youtube.com/watch?v=skmctb_2rZ0), [русский](https://www.youtube.com/watch?v=jwCp_-bhrCQ)

<a href="https://bakhirev.github.io/demo/?ref=github&dump=./test.txt" target="_blank"><img src="https://bakhirev.github.io/assets/images/index.gif" width="100%" /></a>

<a name="link-0"></a>
### محتويات
- [تقرير إحصائيات الـCommit](#link-1)
  - [كيفية إنشاء وتعرض التقرير؟](#link-2)
    - [باستخدام خادم عام](#link-3)
    - [استخدام مكتبة NodeJS](#link-4)
    - [استخدام مكتبة PHP](#link-5)
    - [استخدام مكتبة Python](#link-6)
    - [استخدام مكتبة Ruby](#link-7)
    - [استخدام مكتبة Go](#link-8)
    - [استخدام الكود المصدر](#link-9)
    - [استخدام أعمال GitHub](#link-10)
    - [باستخدام خادم خاص](#link-11)
  - [كيفية تجميع المؤلفين؟](#link-12)
  - [كيفية نقل البيانات من Git إلى ملف txt؟](#link-13)
    - [لعرضه على الإنترنت](#link-14)
    - [لعرضه خارج الإنترنت](#link-15)
    - [إذا استخدمت PowerShell على Windows](#link-16)
  - [كيفية عرض تقرير عن مجموعة من الميكروخدمات؟](#link-17)


- [أفضل الممارسات في المشروع](#link-18)
  - [كيفية توقيع الـCommit؟](#link-19)
  - [كيفية إضافة التحقق من رسالة الـCommit؟](#link-20)
    - [استخدام الملف commit-msg](#link-21)
    - [استخدام البرنامج المضمن pre-commit](#link-22)


- [عن هذا التطبيق](#link-23)
  - [كيفية تسجيل العلامة التجارية للوجهة الوسيطة؟](#link-24)
  - [كيفية إعادة بناء تقرير HTML من الكود المصدر؟](#link-25)
  - [كيفية إضافة أو تعديل ترجمة؟](#link-26)
  - [الهيكل](#link-27)
    - [الهيكل العام للميكروخدمات](#link-29)
  - [التعليق](#link-30)

<a name="link-1"></a>
##  تقرير إحصائيات الـCommit

<a name="link-2"></a>
### 📈 كيفية إنشاء وتعرض التقرير؟

<a name="link-3"></a>
#### باستخدام خادم عام
- زور [الموقع الويب](https://bakhirev.github.io/)
- اتبع التعليمات

<a name="link-4"></a>
#### استخدام مكتبة NodeJS
- أدري `npx assayo`
- فتح `./assayo/index.html`

<a name="link-5"></a>
#### استخدام مكتبة PHP
- أدري `composer require bakhirev/assayo`
- أدري `vendor/bin/assayo`
- فتح `./assayo/index.html`

<a name="link-6"></a>
#### استخدام مكتبة Python
- أدري `pipx install assayo`
- أدري `assayo`
- فتح `./assayo/index.html`

<a name="link-7"></a>
#### استخدام مكتبة Ruby
- أدري `gem install assayo`
- أدري `assayo`
- فتح `./assayo/index.html`

<a name="link-8"></a>
#### استخدام مكتبة Go
- أدري `go get github.com/bakhirev/assayo`
- أدري `go install github.com/bakhirev/assayo`
- أدري `assayo`
- فتح `./assayo/index.html`

<a name="link-9"></a>
#### استخدام الكود المصدر
- حمل هذا المستودع
- وضع الملف `log.txt` في `/build`
- فتح `/build/index.html`
- أو وضع المجلد `/build` في المستودع الخاص بك (حيث يوجد `log.txt`). يمكنك تغيير الاسم. على سبيل المثال، من `/build` إلى `/report`.

في هذه الحالة، من المهم أن يتم إنشاء الملف `log.txt` من خلال الأمر لعرضه في الوضع المحلي.

<a name="link-10"></a>
####  استخدام أعمال GitHub
أضف [ال script](https://github.com/bakhirev/assayo/blob/main/documents/ActionExample.yml) في المجلد `.github/workflows/` أو استخدم هذه [الأعمال](https://github.com/marketplace/actions/assayo) من المركز التجاري. سيتم حفظ التقرير الجاهز والمحدث في المنتجات.

<a name="link-11"></a>
#### باستخدام خادم خاص
- حمل الصورة [docker](https://hub.docker.com/r/bakhirev/assayo);
- أدري في الشبكة المحلية الخاصة بك;
- استخدم وجهة نظر الويب لعرض التقرير، وحدد URL البيانات في المعلمة URL `dump`:

```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - URL للحاوية assayo، تستمع إلى المنفذ 80;
you_url    - URL لحاوية Git لوغ;
```
بالافتراض، سيتم تشغيل الصورة على `http://127.0.0.1:80/`. إذا لم يعمل، فأنقر على المنفذ 80 مجاني.

<a name="link-12"></a>
### ‍🎭 كيفية تجميع المؤلفين؟
في مجلد الجذر للعمل الذي تقوم به، يجب عليك إنشاء ملف `.mailmap`.

مثال محتوى الملف:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
```
اقرأ المزيد عن شكل هذا الملف [هنا](https://git-scm.com/docs/gitmailmap).

<a name="link-13"></a>
### 📤 كيفية نقل البيانات من Git إلى ملف txt؟

<a name="link-14"></a>
####  لعرضه على الإنترنت
في مجلد الجذر للعمل الذي تقوم به، أدري:

<a name="link-15"></a>
####  لعرضه خارج الإنترنت
Git سيقوم بإنشاء ملف `log.txt`. يحتوي هذا الملف على البيانات لعرض التقرير. الفرق بين الشكل على الإنترنت وخارج الإنترنت هو وجود حزمة للسلاسل. سيتم تحميل الشكل خارج الإنترنت كملف `js` إذا فتحت `/build/index.html` فقط

<a name="link-16"></a>
#### إذا استخدمت PowerShell على Windows
بالافتراض، قد لا تتطابق ترميز الخرج مع UTF-8، وسيكون ملف السجل الناتج غير قابل للقرا
```
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```
أو فتح ملف محفوظ وتغيير الترميز يدويا إلى أوتف-8.

<a name="link-17"></a>
### 🗃️ كيفية عرض تقرير عن مجموعة من الميكروخدمات؟
- إنشاء لكل ملف ميكروخدمة `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt`، إلخ). يمكنك القيام بذلك يدويًا، أو استخدام وحدة [Assayo Crawler](https://github.com/bakhirev/assayo-crawler) لجمع السجلات التلقائيًا؛
- انظر «كيفية عرض التقرير على الإنترنت؟». في الخطوة الأخيرة، سحب جميع الملفات في وقت واحد إلى نافذة المتصفح.
- انظر «كيفية عرض التقرير خارج الإنترنت؟». في الخطوة الثانية، سحب جميع ملفات الميكروخدمة (`log-1.txt`, `log-2.txt`, `log-3.txt`، إلخ) إلى مجلد التقرير (`/build`).

<a name="link-18"></a>
## أفضل الممارسات في المشروع

<a name="link-19"></a>
### 📝 كيفية توقيع الـCommit؟
الاتباع [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). مثال:
```
JIRA-1234 feat(profile): Added avatar for user
```
- رقم المهمة في متتبع المهام `(JIRA-1234)`
- نوع العمل `(feat, fix, style, refactor, test, doc، إلخ)`
- ميزة `(profile - صفحة جديدة على الموقع أو وظيفة جديدة، استخدام كلمة واحدة (أو اثنين) قصيرة أو اختصار)`
- ما المشكلة التي تم حلها `(Added avatar for user)`

<a name="link-20"></a>
### 👮 كيفية إضافة التحقق من رسالة الـCommit؟

<a name="link-21"></a>
####  استخدام الملف commit-msg
1. إنشاء الملف `commit-msg` في المجلد `.git/hooks/`
2. إضافة هذا النص في الملف:
```
#!/usr/bin/env bash
if ! grep -iqE "(JIRA-[0-9]{1,5})(s)(feat|fix|docs|style|refactor|test|chore)((([a-z0-9_-]{1,})){0,})(:s)([a-z]{1,})" "$1"; then
   echo "Need commit message like: JIRA-12 fix(profile): some text. Read Semantic Commit Messages" >&2
   exit 1
fi
```

<a name="link-22"></a>
#### استخدام البرنامج المضمن [pre-commit](https://www.npmjs.com/package/pre-commit)
1. إضافة في الملف `package.json` الخاصية `commit-msg`:
```
...
"commit-msg": {
  "regex": "(JIRA-[0-9]{1,5})(\s)(feat|fix|docs|style|refactor|test|chore)((\([a-z0-9_-]{1,}\)){0,})(:\s)([a-z]{1,})",
    "error-message": "Need commit message like: JIRA-12 fix(profile): some text Read Semantic Commit Messages"
},
...
```
2. تشغيل الأمر `npm install pre-commit`

<a name="link-23"></a>
##  عن هذا التطبيق

<a name="link-24"></a>
### 🎨 كيفية تسجيل العلامة التجارية للوجهة الوسيطة؟
يمكنك إنشاء موجة وجهة وسيطة خاصة بك. الخيارات:
- **العنوان**. يمكنك تعيين عنوان الوثيقة الافتراضي في معلم URL `title`. مثال: `?title=You Company`
- **الوجهة الوسيطة البصرية**. لفعل ذلك، يجب عليك إعداد ملف CSS بأساليب جديدة وتوصيل عنوان URL الخاص به في المعلم `theme`. مثال: `?theme=//company.com/some.css`. يمكنك استخدام أسماء الصفات كمحددات. أكثرها لا تتغير في الإصدارات الجديدة.
- **اللغة**. يمكنك تعيين اللغة في معلم URL `lang`. مثال: `?lang=es`

**مثال:** [تجربة](https://bakhirev.github.io/demo/themes/)

<a name="link-25"></a>
### 🛠️ كيفية إعادة بناء تقرير HTML من الكود المصدر؟
- تحميل هذا المستودع `git clone https://github.com/bakhirev/assayo.git`
- أدري `npm install`
- أدري `npm run build:local`
- بناء HTML الجديد سيكون في مجلد `/build`

<a name="link-26"></a>
### 🈯 كيفية إضافة أو تعديل ترجمة؟
يمكنك إضافة ترجمة جديدة أو تصحيح ترجمة موجودة في مجلد `ts/translations/`.
[الإرشادات](https://github.com/firstcontributions/first-contributions)

<a name="link-27"></a>
### 📐 الهيكل

<a name="link-29"></a>
#### الهيكل العام للميكروخدمات
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](https://github.com/bakhirev/assayo-showcase) يعرض قائمة من التقارير المتوفرة. كل تقرير يتكون من عنوان ووصف وقائمة من المستودعات.
2. [Crawler service](https://github.com/bakhirev/assayo-crawler) يجمع سجلات المستودع للتقرير.
3. [Log visualization UI](https://github.com/bakhirev/assayo) **(أنت هنا)** يعرض التقرير. يحتاج إلى ملف سجل للعمل.

<a name="link-30"></a>
### 📧 التعليق
- 📱 [https://t.me/bakhirev](https://t.me/bakhirev) (طريقة الاتصال ذات الأولوية)
- 📧 [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- 🌐 [https://bakhirev.github.io/](https://bakhirev.github.io/?ref=github&lang=ar)

