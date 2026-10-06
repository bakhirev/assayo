import recommendations from './recommendations';

export default `
§ plugin.team_weeks.sidebar: सप्ताहों के अनुसार
§ plugin.team_weeks.title: सप्ताहों के अनुसार आँकड़े
§ plugin.team_weeks.numberTasks: कार्यों की संख्या
§ plugin.team_weeks.people: कर्मचारियों की संख्या
§ plugin.team_weeks.line: पंक्तियों में परिवर्तन
§ plugin.team_weeks.lossesDetails: किसने commit नहीं किया
§ plugin.team_weeks.add: जोड़ा गया
§ plugin.team_weeks.change: परिवर्तित
§ plugin.team_weeks.remove: हटाया गया
§ plugin.team_weeks.hasCommits: commits थे
§ plugin.team_weeks.hasNotCommits: commits नहीं थे
§ plugin.team_weeks.last.title: चयनित सप्ताह के आँकड़े
§ plugin.team_weeks.last.titleDefault: पिछला सप्ताह
§ plugin.team_weeks.last.tasks.title: इस सप्ताह के कार्य
§ plugin.team_weeks.last.tasks.description: इस समय सीमा में पाए गए अद्वितीय कार्य क्रमांक
§ plugin.team_weeks.last.tasks.scoring: पिछले सप्ताह का मान / पिछले माह का औसत मान
§ plugin.team_weeks.last.changes.title: पंक्तियों में परिवर्तन
§ plugin.team_weeks.last.changes.description: जोड़ी, बदली और हटाई गई पंक्तियाँ
§ plugin.team_weeks.last.changes.scoring: पिछले सप्ताह का मान / पिछले माह का औसत मान
§ plugin.team_weeks.last.types.title: commit प्रकार
§ plugin.team_weeks.last.days.title: वास्तविक व्यक्ति-दिवस
§ plugin.team_weeks.last.best.title: सबसे सक्रिय
§ plugin.team_weeks.last.best.description: इस सप्ताह सबसे अधिक कार्य
§ plugin.team_weeks.last.quiet.title: शांत सप्ताह
§ plugin.team_weeks.last.quiet.description: इस सप्ताह सबसे कम कार्य
§ plugin.team_weeks.last.vsPrev: पिछले सप्ताह की तुलना में
${recommendations}
`;
