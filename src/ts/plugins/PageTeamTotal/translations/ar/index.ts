export default `
§ plugin.team_total.sidebar: معلومات عامة
§ plugin.team_total.common.title: معلومات عامة
§ plugin.team_total.common.duration.title: المدة الإجمالية للعمل
§ plugin.team_total.common.duration.description: كامل مدة التطوير من أول إلى آخر التزام
§ plugin.team_total.common.location.title: المكتب الرئيسي
§ plugin.team_total.common.employees.title: عدد الأشخاص في القسم
§ plugin.team_total.release.title: معلومات الإصدارات
§ plugin.team_total.release.total.title: إجمالي الإصدارات
§ plugin.team_total.release.total.description: معلومات الإصدارات
§ plugin.team_total.money.title: تكلفة التطوير
§ plugin.team_total.titleA: حجم العمل
§ plugin.team_total.titleB: التكلفة
§ plugin.team_total.daysWorked.title: أيام-شخص
§ plugin.team_total.daysWorked.description: يتم احتساب الأيام التي تم فيها إجراء التزامات فقط
§ plugin.team_total.commits.title: التزامات
§ plugin.team_total.commits.description: لا يتم احتساب الفروع المحذوفة
§ plugin.team_total.daysLosses.title: أيام بدون التزامات
§ plugin.team_total.daysLosses.description: كل الأيام ناقص: العطل، عطلات نهاية الأسبوع، الإجازات، أيام التزامات
§ plugin.team_total.employment.title: على رأس العمل / غادر
§ plugin.team_total.employment.description: إذا لم يقم الموظف بأي التزام خلال شهر، فيُعدّ أنه غادر
§ plugin.team_total.moneyAll.title: تكاليف التطوير
§ plugin.team_total.moneyAll.description: إجمالي تكاليف الرواتب، تشمل بدل الإجازات والزيادة المدفوعة للعمل في عطلات نهاية الأسبوع.
§ plugin.team_total.moneyWorked.title: الفعلية
§ plugin.team_total.moneyWorked.description: الأيام الفعلية المضروبة في متوسط الراتب
§ plugin.team_total.moneyLosses.title: زيادة محتملة
§ plugin.team_total.moneyLosses.description: أيام عمل مدفوعة لم تكن فيها التزامات
§ plugin.team_total.weekendPayment.title: عمل عطلة نهاية الأسبوع
§ plugin.team_total.weekendPayment.description: إجمالي الزيادة المدفوعة للعمل في عطلات نهاية الأسبوع
§ plugin.team_total.workSpeed.title: مهام في اليوم
§ plugin.team_total.workSpeed.description: متوسط سرعة عمل الفريق مع التكوين الحالي للموظفين
§ plugin.team_total.moneySpeed.title: شهرياً
§ plugin.team_total.moneySpeed.description: مبلغ الرواتب المتوقع مع التكوين الحالي للموظفين دون احتساب الضرائب والتكاليف المصاحبة
§ plugin.team_total.description1: *أيام-شخص* هي عمل موظف واحد خلال يوم عمل واحد. على سبيل المثال، في يوم تقويمي واحد، ينجز فريق من ثلاثة موظفين حجم عمل يساوي ثلاثة أيام-شخص.
§ plugin.team_total.description2: تُحتسب *أيام الغياب* فقط كأيام عمل كان يمكن فيها إجراء التزامات. لا تدخل عطلات نهاية الأسبوع والعطل الرسمية والإجازات في الحساب.
§ plugin.team_total.description3: تعرض بطاقة *على رأس العمل / غادر* التكوين الفعلي للموظفين الذين يشاركون باستمرار في العمل. بالإضافة إلى ذلك، هناك «مساعدون» — غالباً موظفون بتخصص مختلف قد يجرون التزامات في المشروع أحياناً.
§ plugin.team_total.description4: تُعدّ *الزيادة* فقط أيام العمل التي كان يمكن فيها إجراء التزامات. لا تدخل عطلات نهاية الأسبوع والعطل الرسمية والإجازات في الحساب. لذلك، الزيادة + التكلفة الفعلية != الإجمالية. التكلفة الإجمالية تتضمن الدفع عن عطلات نهاية الأسبوع والعطل الرسمية والإجازات.
§ plugin.team_total.description5: يُحسب *العمل في عطلة نهاية الأسبوع* بمعامل x2 مقارنةً بأجر اليوم العادي. المعروض أعلاه هو الزيادة فقط (x1)، لأن حقيقة العمل الإضافي بحد ذاتها غير مهمة في هذا السياق. نحن لا ننظر إلى سرعة حرق الميزانية. نحن ننظر إلى الزيادة عند زيادة سرعة العمل.
`;

