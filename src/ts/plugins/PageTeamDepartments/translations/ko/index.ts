export default `
§ plugin.team_departments.sidebar: 부서
§ plugin.team_departments.employmentsChart.title: 현재 팀 규모
§ plugin.team_departments.employmentsChart.item: 팀
§ plugin.team_departments.employmentsChart.less1: 직원 1명
§ plugin.team_departments.employmentsChart.less2: 직원 2명
§ plugin.team_departments.employmentsChart.less3: 직원 3명
§ plugin.team_departments.employmentsChart.less6: 직원 최대 6명
§ plugin.team_departments.employmentsChart.less9: 직원 최대 9명
§ plugin.team_departments.employmentsChart.less12: 직원 최대 12명
§ plugin.team_departments.employmentsChart.less15: 직원 최대 15명
§ plugin.team_departments.employmentsChart.more: 15명 초과
§ plugin.team_departments.daysChart.title: 프로젝트 기간
§ plugin.team_departments.daysChart.item: 프로젝트
§ plugin.team_departments.title: 프로젝트 목록
§ plugin.team_departments.status: 상태
§ plugin.team_departments.active.yes: 개발 중
§ plugin.team_departments.active.no: 새로운 작업 없음
§ plugin.team_departments.author.work: 근무
§ plugin.team_departments.author.dismissed: 퇴사
§ plugin.team_departments.author.staff: 보조
§ plugin.team_departments.code: 코드
§ plugin.team_departments.from: 첫 commit
§ plugin.team_departments.to: 마지막
§ plugin.team_departments.authors: 명
§ plugin.team_departments.tasks: 작업
§ plugin.team_departments.totalDays: 기간
§ plugin.team_departments.totalAuthors: 직원
§ plugin.team_departments.totalTasks: 작업
§ plugin.team_departments.employments.author: 직원
§ plugin.team_departments.employments.worked: 근무
§ plugin.team_departments.employments.losses: commit이 없는 날
§ plugin.team_departments.employments.totalDays: 부서 내 일수
§ plugin.team_departments.employments.totalTasks: 완료한 작업
§ plugin.team_departments.banner.title: 부서 상세 정보
§ plugin.team_departments.details.title: 부서 실제 데이터
§ plugin.team_departments.details.totalDays: 작업 기간
§ plugin.team_departments.details.moneyInMonth: 월간 개발 비용
§ plugin.team_departments.details.moneyAll: 기간 전체 개발 비용
§ plugin.team_departments.details.mainLocation: 주요 위치
§ plugin.team_departments.details.activeAuthors.title: 근무 / 퇴사
§ plugin.team_departments.details.activeAuthors.description: 직원이 한 달 동안 commit을 하나도 하지 않으면 퇴사한 것으로 간주됩니다. 상태는 이 부서와 무관하게 표시됩니다. 다른 부서에서 근무 중이거나 회사를 완전히 떠난 경우일 수 있습니다.
§ plugin.team_departments.details.linesInTask.title: 작업당 코드 줄 수
§ plugin.team_departments.details.linesInTask.description: 작업당 코드 줄 수의 가중 평균. 작업의 세분화 정도를 추정하는 데 도움이 됩니다.
§ plugin.team_departments.details.totalTasks.title: 진행된 작업
§ plugin.team_departments.details.totalTasks.description: 고유한 작업 ID가 언급된 경우 모두 집계됩니다. 작업 트래커에서 작업이 종료되지 않았을 수 있습니다.
§ plugin.team_departments.months.title: 부서의 예상 직원 수
§ plugin.team_departments.months.description: 작업 트래커는 순차적인 작업 ID를 발급합니다. 월초와 월말의 최대 작업 ID를 알면 *신규 작업* 수를 구할 수 있습니다. 이번 달에 *수정된* 작업 수는 로그에서 보입니다. 누가 수정했는지(*근무했는지*)도 보입니다. 나중에 수정된 작업 수(*백로그*)는 이후 달의 로그로 계산합니다. 보이는 프로그래머의 처리량을 전체 작업 수에 외삽하여 부서에 있어야 할 *전체 프로그래머* 수를 추정합니다. 「프로그래머」 수를 바탕으로 QA 엔지니어, 분석가, 관리자 수를 추정합니다.
§ plugin.team_departments.months.newTaskInMonth: 신규 작업
§ plugin.team_departments.months.tasksFixedThisGroup: 수정됨
§ plugin.team_departments.months.tasksInBacklog: 백로그
§ plugin.team_departments.months.programmistInThisGroup: 근무함
§ plugin.team_departments.months.allProgrammistInDepartment: 근무해야 함
§ plugin.team_departments.months.allUsersInDepartment: 전체 직원
§ plugin.team_departments.forecasting.title: 전체 비용 예측
§ plugin.team_departments.forecasting.moneyInMonth.title: 부서 월 비용
§ plugin.team_departments.forecasting.moneyInMonth.description: 지난달의 모든 잠재 직원 수(개발, QA, 분석, 관리)에 평균 급여를 곱합니다.
§ plugin.team_departments.forecasting.moneyAll.title: 기간 전체 부서 비용
§ plugin.team_departments.forecasting.moneyAll.description: 각 달의 모든 잠재 직원 수(개발, QA, 분석, 관리)에 평균 급여를 곱합니다.
`;
