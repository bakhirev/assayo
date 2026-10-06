export default `
§ plugin.team_weeks.recommendations.lazyDays.down.title: 결근이 줄었다
§ plugin.team_weeks.recommendations.lazyDays.down.description: 최근 3주 동안 이 지표가 하락했다
§ plugin.team_weeks.recommendations.lazyDays.up.title: 결근이 늘었다
§ plugin.team_weeks.recommendations.lazyDays.up.description: 작업이 없거나 더 엄격한 관리가 필요하다
§ plugin.team_weeks.recommendations.notWork.title: 안정적으로 근무 시간을 채우지 않는다
§ plugin.team_weeks.recommendations.notWork.description: 매주 시간의 100% 미만으로 코드를 작성하기 때문이다
§ plugin.team_weeks.recommendations.upWork.title: 안정적으로 초과 근무한다
§ plugin.team_weeks.recommendations.upWork.description: 매주 주말에 코드를 작성하기 때문이다
§ plugin.team_weeks.recommendations.task.up.title: 생산성이 상승하고 있다
§ plugin.team_weeks.recommendations.task.up.description
또는 작업이 지나치게 작아졌다.
 
확인이 필요하다. 세분성이 같다면 결과를 고정한다.
§ plugin.team_weeks.recommendations.task.lazyMaintainer.description: commits 부재에서 안정적인 선두이다.
§ plugin.team_weeks.recommendations.task.down.title: 생산성이 하락하고 있다
§ plugin.team_weeks.recommendations.task.down.description
또는 작업 분할이 더 나빠졌다. 확인이 필요하다. 세분성이 같다면 관리 대상으로 둔다.

# 평가 방법:
- 하루에 작업하는 작업 수가 최근 3주 동안 안정적으로 감소하고 있다.

# 가능한 오류:
- 작업이 보였던 것보다 더 어려웠을 수 있다;
- 작업의 업무량이 컸을 수 있다 (같은 기간에 변경 수가 감소하는지 확인해야 한다)
`;
