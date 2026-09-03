export default `
§ plugin.team_total.sidebar: 일반 정보
§ plugin.team_total.common.title: 프로젝트 소개
§ plugin.team_total.workSpeed.title: 일일 작업 수
§ plugin.team_total.workSpeed.description: 현재 직원 구성에서의 팀 평균 처리량
§ plugin.team_total.employment.title: 재직 / 퇴사
§ plugin.team_total.employment.description: 직원이 한 달 동안 commit을 하나도 만들지 않으면 퇴사한 것으로 간주합니다
§ plugin.team_total.common.duration.title: 총 작업 기간
§ plugin.team_total.common.duration.description: 첫 번째 commit부터 마지막 commit까지의 총 개발 시간입니다.
§ plugin.team_total.common.location.title: 본사
§ plugin.team_total.common.location.description: 현재 핵심 직원 구성에서 가장 흔한 위치입니다.
§ plugin.team_total.common.employees.title: 부서 인원
§ plugin.team_total.common.employees.description: 작업 ID 변화율에 따른 총 직원 규모 예측을 기준으로 합니다.
§ plugin.team_total.release.title: 릴리스 정보
§ plugin.team_total.release.total.title: 총 릴리스 수
§ plugin.team_total.release.total.description: 릴리스는 단어 "release"가 있는 branch입니다. 일반적으로 "auto-merge" 이벤트에 나타납니다.
§ plugin.team_total.money.title: 개발 비용 추정
§ plugin.team_total.moneyAll.title: 합계
§ plugin.team_total.moneyAll.description: 총 급여 비용이며, 휴가 수당과 주말 근무에 대한 초과 지급을 포함합니다.
§ plugin.team_total.moneyWorked.title: 실제
§ plugin.team_total.moneyWorked.description: 실제 근무일에 평균 급여를 곱한 금액입니다.
§ plugin.team_total.moneyLosses.title: 가능한 초과 지급
§ plugin.team_total.moneyLosses.description: commits가 없었던 유급 근무일입니다.
§ plugin.team_total.weekendPayment.title: 주말 근무
§ plugin.team_total.weekendPayment.description: 주말 근무에 대한 초과 지급 총액입니다.
§ plugin.team_total.moneySpeed.title: 월 기준
§ plugin.team_total.moneySpeed.description: 현재 직원 구성에서의 예상 급여액이며, 세금, 장비 감가상각 및 관련 비용은 제외합니다.
§ plugin.team_total.forecastingMoneyAll.title: 기간에 따른 프로젝트 비용
§ plugin.team_total.forecastingMoneyAll.description: 로그에는 없지만 존재했을 수 있는 부서의 모든 잠재 직원에 대한 기간별 예상 급여액(작업 추적기의 작업 ID 번호 매기기 기준).    
§ plugin.team_total.description1: *인일*은 직원 한 명이 한 근무일 동안 수행하는 작업입니다. 예를 들어, 달력일 하루 동안 직원 세 명의 팀은 인일 세 단위의 작업량을 제공합니다.
§ plugin.team_total.description2: *결근일*에는 commits를 만들 수 있었던 근무일만 포함됩니다. 주말, 공휴일, 휴가는 계산에 포함되지 않습니다.
§ plugin.team_total.description3: 카드 *재직 / 퇴사*는 지속적으로 업무에 참여하는 실제 직원을 보여줍니다. 또한 “도우미”가 있으며, 보통 다른 전문 분야의 사람들로 가끔 프로젝트에 commits를 만들 수 있습니다.
§ plugin.team_total.description4: *초과 지급*에는 commits를 만들 수 있었던 근무일만 포함됩니다. 주말, 공휴일, 휴가는 계산에 포함되지 않습니다. 그래서 초과 지급 + 실제 비용 != 합계입니다. 합계 비용에는 주말, 공휴일, 휴가에 대한 지급이 포함됩니다.
§ plugin.team_total.description5: *주말 근무*는 일반 근무일 대비 계수 x2로 계산합니다. 위에는 초과 지급분(x1)만 표시됩니다. 이 맥락에서는 초과근무 사실 자체가 중요하지 않기 때문입니다. 예산 소진 속도는 보지 않습니다. 업무 속도가 증가할 때의 초과 지급을 봅니다.
`;
