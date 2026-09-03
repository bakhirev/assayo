export default `
§ plugin.team_total.sidebar: معلومات عامة
§ plugin.team_total.common.title: عن المشروع
§ plugin.team_total.workSpeed.title: مهام في اليوم
§ plugin.team_total.workSpeed.description: متوسط إنتاجية الفريق مع التكوين الحالي للموظفين
§ plugin.team_total.employment.title: يعمل / غادر
§ plugin.team_total.employment.description: إذا لم يُنشئ الموظف أي commit خلال شهر، يُعدّ أنه غادر
§ plugin.team_total.common.duration.title: المدة الإجمالية للعمل
§ plugin.team_total.common.duration.description: إجمالي وقت التطوير من أول commit إلى آخره.
§ plugin.team_total.common.location.title: المكتب الرئيسي
§ plugin.team_total.common.location.description: الموقع الأكثر شيوعًا للتكوين الأساسي الحالي للموظفين.
§ plugin.team_total.common.employees.title: أشخاص في القسم
§ plugin.team_total.common.employees.description: استنادًا إلى توقع إجمالي عدد الموظفين حسب معدل تغيّر معرفات المهام.
§ plugin.team_total.release.title: معلومات الإصدارات
§ plugin.team_total.release.total.title: إجمالي الإصدارات
§ plugin.team_total.release.total.description: الإصدار هو branch يتضمن الكلمة "release". وكقاعدة عامة، تظهر في أحداث "auto-merge".
§ plugin.team_total.money.title: تقدير تكلفة التطوير
§ plugin.team_total.moneyAll.title: الإجمالي
§ plugin.team_total.moneyAll.description: إجمالي تكاليف الرواتب، بما في ذلك بدل الإجازة والزيادة المدفوعة للعمل في عطلات نهاية الأسبوع.
§ plugin.team_total.moneyWorked.title: الفعلي
§ plugin.team_total.moneyWorked.description: الأيام الفعلية للعمل مضروبة في متوسط الراتب.
§ plugin.team_total.moneyLosses.title: زيادة محتملة في الدفع
§ plugin.team_total.moneyLosses.description: أيام عمل مدفوعة لم يكن فيها commits.
§ plugin.team_total.weekendPayment.title: عمل عطلة نهاية الأسبوع
§ plugin.team_total.weekendPayment.description: إجمالي الزيادة المدفوعة للعمل في عطلات نهاية الأسبوع.
§ plugin.team_total.moneySpeed.title: شهريًا
§ plugin.team_total.moneySpeed.description: مبلغ الرواتب المتوقع مع التكوين الحالي للموظفين، باستثناء الضرائب واستهلاك المعدات والتكاليف المرتبطة.
§ plugin.team_total.forecastingMoneyAll.title: تكاليف المشروع عبر الزمن
§ plugin.team_total.forecastingMoneyAll.description: مبلغ الرواتب المحتمل عبر الزمن لجميع الموظفين المحتملين في القسم غير الظاهرين في السجلات لكن كان يمكن وجودهم (استنادًا إلى ترقيم معرفات المهام في متعقّب المهام).    
§ plugin.team_total.description1: *أيام-شخص* هي عمل موظف واحد خلال يوم عمل واحد. على سبيل المثال، في يوم تقويمي واحد يقدّم فريق من ثلاثة موظفين حجم عمل يعادل ثلاثة أيام-شخص.
§ plugin.team_total.description2: تشمل *أيام الغياب* أيام العمل فقط التي كان يمكن فيها إنشاء commits. لا تدخل عطلات نهاية الأسبوع والعطل الرسمية والإجازات في الحساب.
§ plugin.team_total.description3: تعرض بطاقة *يعمل / غادر* الموظفين الفعليين المشاركين باستمرار في العمل. بالإضافة إلى ذلك، هناك «مساعدون» — عادةً أشخاص بتخصص مختلف قد يُنشئون commits في المشروع أحيانًا.
§ plugin.team_total.description4: تشمل *زيادة الدفع* أيام العمل فقط التي كان يمكن فيها إنشاء commits. لا تدخل عطلات نهاية الأسبوع والعطل الرسمية والإجازات في الحساب. لذلك زيادة الدفع + التكلفة الفعلية != الإجمالي. تتضمن التكلفة الإجمالية الدفع عن عطلات نهاية الأسبوع والعطل الرسمية والإجازات.
§ plugin.team_total.description5: يُحسب *عمل عطلة نهاية الأسبوع* بمعامل x2 نسبةً إلى أجر يوم عادي. المعروض أعلاه هو الزيادة فقط (x1)، لأن حقيقة العمل الإضافي بحد ذاتها غير مهمة في هذا السياق. نحن لا ننظر إلى سرعة استهلاك الميزانية. نحن ننظر إلى زيادة الدفع عند ارتفاع سرعة العمل.
`;
