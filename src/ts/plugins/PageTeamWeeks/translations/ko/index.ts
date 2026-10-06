import recommendations from './recommendations';

export default `
§ plugin.team_weeks.sidebar: 주별
§ plugin.team_weeks.title: 주별 통계
§ plugin.team_weeks.numberTasks: 작업 수
§ plugin.team_weeks.people: 직원 수
§ plugin.team_weeks.line: 줄 변경
§ plugin.team_weeks.lossesDetails: commit하지 않은 사람
§ plugin.team_weeks.add: 추가됨
§ plugin.team_weeks.change: 변경됨
§ plugin.team_weeks.remove: 제거됨
§ plugin.team_weeks.hasCommits: commits가 있었음
§ plugin.team_weeks.hasNotCommits: commits가 없었음
§ plugin.team_weeks.last.title: 선택한 주의 통계
§ plugin.team_weeks.last.titleDefault: 지난주
§ plugin.team_weeks.last.tasks.title: 이번 주 작업
§ plugin.team_weeks.last.tasks.description: 이 기간에서 발견된 고유 작업 번호
§ plugin.team_weeks.last.tasks.scoring: 이전 주 값 / 이전 달 평균값
§ plugin.team_weeks.last.changes.title: 줄 변경
§ plugin.team_weeks.last.changes.description: 추가, 변경, 삭제된 줄
§ plugin.team_weeks.last.changes.scoring: 이전 주 값 / 이전 달 평균값
§ plugin.team_weeks.last.types.title: commit 유형
§ plugin.team_weeks.last.days.title: 실제 인일
§ plugin.team_weeks.last.best.title: 가장 활발
§ plugin.team_weeks.last.best.description: 이번 주 작업이 가장 많음
§ plugin.team_weeks.last.quiet.title: 한산한 주
§ plugin.team_weeks.last.quiet.description: 이번 주 작업이 가장 적음
§ plugin.team_weeks.last.vsPrev: 이전 주 대비
${recommendations}
`;
