export default `
§ plugin.team_total.sidebar: 일반 정보
§ plugin.team_total.common.title: 일반 정보
§ plugin.team_total.common.duration.title: 전체 작업 기간
§ plugin.team_total.common.duration.description: 첫 커밋부터 마지막 커밋까지의 전체 개발 기간
§ plugin.team_total.common.location.title: 본사
§ plugin.team_total.common.employees.title: 부서 인원
§ plugin.team_total.release.title: 릴리스 정보
§ plugin.team_total.release.total.title: 총 릴리스 수
§ plugin.team_total.release.total.description: 릴리스 정보
§ plugin.team_total.money.title: 개발 비용
§ plugin.team_total.titleA: 작업량
§ plugin.team_total.titleB: 비용
§ plugin.team_total.daysWorked.title: 인일
§ plugin.team_total.daysWorked.description: 커밋이 수행된 날만 집계됩니다
§ plugin.team_total.commits.title: 커밋 수
§ plugin.team_total.commits.description: 삭제된 브랜치는 집계되지 않습니다
§ plugin.team_total.daysLosses.title: 커밋 없는 일수
§ plugin.team_total.daysLosses.description: 전체 일수에서 공휴일, 주말, 휴가, 커밋이 있는 날을 제외
§ plugin.team_total.employment.title: 재직 / 퇴사
§ plugin.team_total.employment.description: 한 달 동안 커밋이 1건도 없으면 퇴사한 것으로 간주합니다
§ plugin.team_total.moneyAll.title: 개발 비용
§ plugin.team_total.moneyAll.description: 급여 총비용이며, 휴가 수당과 주말 근무에 대한 추가 지급분을 포함합니다.
§ plugin.team_total.moneyWorked.title: 실제
§ plugin.team_total.moneyWorked.description: 실제 근무일수 × 평균 급여
§ plugin.team_total.moneyLosses.title: 예상 과지급
§ plugin.team_total.moneyLosses.description: 커밋이 없었던 유급 근무일
§ plugin.team_total.weekendPayment.title: 주말 근무
§ plugin.team_total.weekendPayment.description: 주말 근무에 대한 추가 지급 총액
§ plugin.team_total.workSpeed.title: 일일 작업 수
§ plugin.team_total.workSpeed.description: 현재 인원 구성에서의 팀 평균 처리 속도
§ plugin.team_total.moneySpeed.title: 월 기준
§ plugin.team_total.moneySpeed.description: 세금 및 부대비용을 제외한, 현재 인원 구성에서의 예상 급여 지급액
§ plugin.team_total.description1: *인일*은 한 명의 직원이 한 영업일 동안 수행하는 작업을 의미합니다. 예를 들어, 달력일 1일 동안 3명으로 구성된 팀은 3인일의 작업량을 제공합니다.
§ plugin.team_total.description2: *결근일*은 커밋이 수행될 수 있었던 영업일만 포함합니다. 주말, 공휴일, 휴가는 계산에 포함되지 않습니다.
§ plugin.team_total.description3: 카드 *재직 / 퇴사*는 지속적으로 업무에 참여하는 직원의 실제 구성을 보여줍니다. 또한 “도우미”가 있는데, 보통 다른 전문 분야의 직원으로 가끔 프로젝트에 커밋을 할 수 있습니다.
§ plugin.team_total.description4: *과지급*은 커밋이 수행될 수 있었던 영업일만 포함합니다. 주말, 공휴일, 휴가는 계산에 포함되지 않습니다. 그래서 과지급 + 실제 비용 != 총액입니다. 총액에는 주말, 공휴일, 휴가에 대한 지급이 포함됩니다.
§ plugin.team_total.description5: *주말 근무*는 일반 근무일 대비 x2 계수로 계산합니다. 위에는 추가 지급분(x1)만 표시됩니다. 이 문맥에서는 초과근무 자체가 중요하지 않기 때문입니다. 우리는 예산 소진 속도를 보지 않습니다. 업무 속도가 증가할 때의 과지급을 봅니다.
`;
