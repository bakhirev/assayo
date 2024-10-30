export default `
§ recommendations.modal.cancel: 닫기
§ recommendations.modal.open: 더 상세한
§ recommendations.title
권장 사항 및 사실

§ recommendations.timestamp.firstCommit.description
첫 번째 커밋을 만들었습니다.

요일:$1

§ recommendations.timestamp.lastCommit.description
마지막 커밋

요일:$1

§ recommendations.title$1 일
§ recommendations.timestamp.firstCommit.description첫 번째 커밋부터 마지막 커밋까지(주말 및 공휴일 포함).
§ recommendations.timestamp.lastCommit.description주말,휴가 및 공휴일을 고려해도 커밋이 없습니다.
§ recommendations.timestamp.weekendDays.description
주말 일자리

#왜 나쁜가:
- 고객은 휴일에 일을 위해 두 배 가격을 지불한다;
- 직원이 더 빨리 소모됩니다.;

§ recommendations.timestamp.common.title: 정기적 인 재활용
§ recommendations.timestamp.allDays.description: 정유소가 있어요
§ recommendations.timestamp.weekendWord.description
프로젝트 관리자,분석가 및 건축가를 변경할 가치가 있습니다.

#왜 나쁜가:
- 고객은 휴일에 일을 위해 두 배 가격을 지불한다;
- 제품의 품질은,원칙적으로,낮은 것으로 판명;
- 직원 중 일부는 종료;
- 러시로 인해 새로운 오류가 나타납니다;

#대부분:
- 우리는 처음부터 타이밍을 잘못 판단했습니다;
- 기술 사양이 없습니다;
- 약한 분석;
- 약한 아키텍처(건축가는 고용되지 않았으며 팀은 중간 개발자로 구성됨);
- 먼저 코드를 작성한 다음 디자인을 시작했습니다.;
- 오류를 이해하는 정상적인 프로세스가 없습니다;

§ recommendations.timestamp.lossesDays.description: 보통 과로하지 않고
§ recommendations.timestamp.neverWeekendWord.description
그러나 때때로 그들은 그렇습니다.

#왜 나쁜가:
- 고객은 휴일에 일을 위해 두 배 가격을 지불한다;
- 직원이 더 빨리 소모됩니다.;

§ recommendations.scope.parallelism.not.title
병렬 작업이 없습니다

§ recommendations.scope.parallelism.not.description
모든 기능은 한 번에 한 사람이 만듭니다.

#계산 방법:
- 남자 일 각 기능에 대한 실제 일로 구분됩니다;
- 산술 평균 찾기;
- 결과가 1.3 보다 작은 경우,우리는 일반적으로 대부분의 기능의 프레임 워크 내에서 병렬 작업이 없다고 생각합니다;

#왜 나쁜가:
- 버스 요인 증가;
- 직원은 더 느리게 발전합니다;
- 그것은 질적으로 직원의 작업을 확인하기 어렵다;

#왜 좋은가:
- 주제 영역에 매우 깊이 몰입하고 더 나은 솔루션을 제공 할 수있는 전문가가 있습니다;
- 병합 충돌이 없을 가능성이 큽니다;
- 이 프로젝트는 서로 다른 방향으로 병렬로 매우 빠르게 발전 할 수 있습니다;

§ recommendations.scope.parallelism.has.title
병렬 작업의 일부

§ recommendations.scope.parallelism.has.description
때로는 여러 사람이 동시에 기능을 만듭니다.

#계산 방법:
- 남자 일 각 기능에 대한 실제 일로 구분됩니다;
- 산술 평균 찾기;
- 결과가 1.3 에서 2.0 인 경우,우리는 다른 기능 내에서 일부 작업이 때때로 병렬로 수행된다고 생각합니다;


§ recommendations.scope.parallelism.every.title
병렬 작업

§ recommendations.scope.parallelism.every.description
모든 기능은 한 번에 여러 사람에 의해 이루어집니다

#계산 방법:
- 남자 일 각 기능에 대한 실제 일로 구분됩니다;
- 산술 평균 찾기;
- 결과가 두 개 이상인 경우,우리는 서로 다른 기능의 프레임 워크 내에서 대부분의 작업은 일반적으로 병렬로 수행한다고 생각합니다;


§ recommendations.scope.money
이 금액은이 프로젝트의 작업을 평가하는 데 사용할 수 있습니다.

#계산 방법:
- 개발에 소요되는 사람 일 개발자의 개별 급여를 곱한;

당신은 설정 섹션에서,보다 정확한 금액,각 개발자의 급여를 변경할 수 있습니다

#많이 또는 조금?
이 질문에 대답하려면 다음과 같이 대답해야합니다:
- 이 돈을 위해 기성품 솔루션을 구입할 수 있습니까?
- 이 돈을 위해 더 나은 제품을 만들 수 있습니까?

두 질문에 대한 대답이"예"라면,아마도 처음부터 개발은 그것에 소비 된 돈의 가치가 없었을 것입니다.
 
§ recommendations.scope.bus.everyHasOne.title
버스 인수=1

§ recommendations.scope.bus.everyHasOne.description
한 사람이 대부분의 기능에 몰입합니다.
우리는 사람들을 바꿔야 합니다.

#왜 나쁜가:
- 직원이 떠나면 작업을 계속하기가 어려울 것입니다;
- 그것은 그것의 코드의 품질을 제어 할 수 없습니다;

#선택은 어떻게 이루어 집니까:
- 기능의 커밋 중 80%이상이 한 사람이 수행합니다.;
- 이 프로젝트는 이러한 기능의 60%이상을 가지고 있습니다;

§ recommendations.scope.bus.oneMaintainer
한 사람이 기능에 몰입.

#왜 나쁜가:
- 그가 사임하면 개발을 계속하기가 어려울 것입니다;
- 코드 검토 품질 저하;
- 필요한 경우 개발을 병렬화하기가 어렵습니다.;

#선택은 어떻게 이루어 집니까:
- 이 기능의 커밋 중 80%이상이 한 사람이 수행했습니다.;

§ recommendations.scope.types.process.title
나쁜 프로세스

§ recommendations.scope.types.process.description
대부분의 기능에는 한 가지 유형의 작업이 포함되어 있습니다.

§ recommendations.scope.types.one
기능에는 한 가지 유형의 작업이 포함되어 있습니다.

§ recommendations.scope.types.common
개발자가 커밋에 잘못 서명하거나 관리자가 동일한 유형의 작업을 시작할 수 있습니다.

#이것이 중요한 이유:
- 다른 팀에 지원을 이전 할 수 없습니다;
- "박스형"버전을 출시하는 것은 불가능합니다;
- 특정 개발자에 대한 강한 의존성;
- 많은 오류 및 코드 품질 저하;
- 미래에 개발 가능성이 둔화;

#매니저의 실수는 무엇인가:
- 만"작업 데모"의 위치에서 제품을 살펴;

#해야 할 일:
- 테스트;
- 오류(테스트 결과로 식별);
- 리팩토링(아키텍처가 변경 될 수 있기 때문에);
- 문서;
- 스타일 편집(포커스 그룹 설문 조사 결과);

§ recommendations.scope.plan.title
장기 계획 구축

§ recommendations.scope.plan.description
고려 아키텍처를 복용.

동시에,이 계획은 한 번에 가장 어려운 작업을 기반으로해야합니다.

#계획의 부족이 나쁜 이유:
- 직원은 확장 포인트를 놓지 않고 최소한의 작업 버전을 만듭니다. 그 후 확장 불가능한 코드가 작성되어 다음 기능이 느려집니다;

#매니저의 실수는 무엇인가:
- 그는 제품이 어떻게 더 발전 할 것인지 그리고 어떤 시점에서 성장이있을 것인지를 보여주지 않았다;

#어떻게 해야 하는가:
- 글로벌 제품 개발 계획이 수립되고 있습니다.;
- 글로벌 아키텍처 개발 계획 작성 중(개발자 및 디비);
- 계획의 수준에서,많은 것을 바꿀 수 있는 순간들이 즉시 논의됩니다.;

§ recommendations.scope.cost.title
기능에 대한 투자 평가

§ recommendations.scope.cost.description
잠재적 인 이익의 금액.

개발 비용이 많이 들지만 수익을 거의 가져 오지 않는 기능은 연기하거나 모두 취소 할 가치가있을 수 있습니다. 이것은 프로젝트를 상업적으로 더 성공적으로 만들 것입니다.

§ recommendations.timestamp.weekendDays.description너무 작은 코드:$1
§ recommendations.author.lotOfLazy.description
내가 당신을 해고해야합니까?

#구성:
-  $1;

#자신의 질문에 대답:
- 그는 팀 리더,건축가,분석가입니까?
- 이것이 그의 주요 프로젝트입니까?
- 그것에 어떤 종속성이 있습니까?

#왜 고쳐야지
개발자의 총 비용은 이미 그의 작업에서 얻은 이익 이상입니다.
우리가 그의 일에 객관적인 장애물이 없다고 생각한다면,그 사람은 전혀 일하기를 원하지 않거나 동시에 두 개의 프로젝트를 수행합니다.
새로운 직원에 의한 해고 및 교체는 일반적인 통계의 관점에서 정당화 된 것처럼 보입니다.

§ recommendations.timestamp.regularWeekendWord.title: 작은 코드 작성:$1
§ recommendations.author.manyLazy.description
우리는 통제해야 합니다.

#구성:
-  $1;

#선택은 어떻게 이루어 집니까:
- 테스트 샘플에서 좋은 프로그래머는 80%이상의 시간을 코드를 작성합니다;
- 이 경우 표시기는 60%에서 80%사이입니다%;

#제어 방법:
- 1 로 분할 작업..2 일;
- 매일 상태를 요청;
- 작업이 잘 예약 및 개발을 시작할 준비가되어 있는지 확인;
- 실제 속도를 확인하기 위해 쌍 프로그래밍을 정렬;

§ recommendations.author.oneTypeMans
유형별로 너무 단조로운 작업을 가져옵니다. 그것은 밖으로 구울 수 있습니다.

#중요한 이유:
- 직원이 타 버린 경우 작업 속도가 감소합니다;
- 전문적인 성장이 느려집니다.;
- 해고 확률이 증가합니다;

#선택은 어떻게 이루어 집니까:
- 각 커밋에 대해 작업 유형이 결정됩니다;
- 작업의 70%이상이 같은 유형의 경우,그 사람은 같은 일을하고있다;

§ recommendations.timestamp.sometimeWeekendWord.title: $1 작동
§ recommendations.author.workToday.description
현재 프로젝트를 진행하고 있습니다.

#구성:
-  $1;

#왜 그들이 그들인가:
- 50 작업 일 이상%;
- 지난 30 일 동안 일하고 있습니다.;

§ recommendations.timestamp.weekendWord.description$1 종료
§ recommendations.author.dismissed.description
또는 그것은 짧은 시간 동안 일했다.

#구성:
-  $1;

#왜 그들이 그들인가:
- 그들은 정상적인 리듬으로 일했습니다(분명히 이것은 주요 저장소입니다);
- 지난 달에 커밋이 하나도 없었습니다.;
- 휴가는 일반적으로 14 일(그들의 부재는 휴가처럼 보이지 않는다);

§ recommendations.timestamp.neverWeekendWord.title: $1 도움
§ recommendations.author.staff.description
무언가를 저지른 다른 전문 분야의 사람들.

#구성:
-  $1;

#왜 그들이 그들인가:
- 이 오픈 소스 프로젝트가 아닙니다;
- 작업 일 전체의 15%미만;
- 그들은 거의 동일한 파일을 변경합니다;

§ recommendations.author.projectType.openSource.title
열린 프로젝트

§ recommendations.author.projectType.openSource.description
그들은 일주일에 5 일 여기에서 일하지 않습니다.

이 프로젝트는 폐쇄 될 수 있습니다,그것은 작업의 속도는 일반적으로 기스 허브에 오픈 라이브러리입니다 단지.

#평가 방법:
- 통계는 모든 활성 개발자에 대한 촬영;
- 평균 작업 일수 및 커밋없이 계산됩니다.;
- 오픈 소스 라이브러리는 일반적으로 최대 15 개입니다..20 작업 일%;

#결과
작업이 일정하지 않은 프로젝트의 경우 많은 지표에는 의미가 없습니다. 따라서 커밋,속도 등이없는 표시기 숨겨질 것이다.

일반적으로 이러한 프로젝트는 폐쇄 버전 개발을 시작하기 전에 평가됩니다. 이 경우 가장 흥미로운 지표는 가능한 비용과 총 개발 시간입니다.


§ recommendations.author.projectType.easy.title
약한 로딩

§ recommendations.author.projectType.easy.description
커밋없이 너무 많은 일.

팀이 코드를 작성하지 않는 이유를 이해해야 합니다.

#평가 방법:
- 통계는 모든 활성 개발자에 대한 촬영;
- 평균 작업 일수 및 커밋없이 계산됩니다.;
- 커밋 없는 비율이 5%에서 20%사이인 경우 로딩이 약한 것으로 간주됩니다%;

#가능한 이유:
- 실제로 작업이 없습니다;
- 작업이 있지만 현재 아키텍처에 잘 맞습니다;
- 개발자는 회의에 의해 산만;
- 팀이 작동하지 않습니다;

#솔루션 옵션:
- 팀과 함께 문제를 논의;
- 하나 또는 두 개의 작업을 하루에 완료 할 수 있도록 작업의 세분성을 줄일 수 있습니다;
- 상태에 의해 작업의 진행 상황을 확인하기 위해 매일 회의를 입력;
- 개발자가 더 빨리 작업 할 수 있는지 확인하기 위해 쌍 프로그래밍 세션을 정렬;

§ recommendations.author.manager.title
마감일 설정

§ recommendations.author.manager.description
모든 작업에는 명확한 마감일이 있어야합니다.
 
이를 통해 며칠 또는 몇 주 동안 실행을 지연시키지 않을 수 있습니다.

#확인할 가치가 있는 지표:
- 직원이 작업에 소비하는 일 수;
- 홍보의 주입을 기다리는 일 수(홍보 통계 페이지);

§ recommendations.author.shorTalk.title
매일 회의 개최

§ recommendations.author.shorTalk.description
그들은 당신이 프로젝트를 최신 상태로 유지하는 데 도움이됩니다.
 
관계없는 주제에 자신을 산만하게하여 그들을 스트레칭하지 마십시오.

#직원은 어떤 질문에 대답해야합니까?:
- 무슨 일이 있었는지;
- 무엇을 할 것인가;
- 어떤 문제가 있습니까;

#만약 독백을 중단해야 한다면:
- 그들은 세부 사항에서 중요하지 않은 작은 세부 사항을 설명하기 시작;
- 그들은 원래 계획에서 멀리 대화를;

#왜 중요한가:
종종 아무것도 하지 않는 직원은 답을 피하려고 합니다. 이를 위해 그는 자신의 작업에 대한 불필요한 세부 사항을 알려줍니다. 이것은 당신이 참가자의 관심을 소강 및 응답 시간을 늘릴 수 있습니다. 사실 아무 일이 없었다 있지만,그는 뭔가 바쁜 것 같다.

§ recommendations.author.ipr.title
훈련 계획 수립

§ recommendations.author.ipr.description
각 직원을 위해.

*개별 교육 계획*은 특정 영역에서 사람이 발전하는 데 도움이되는 목표 및 목표 목록입니다.

#계획을 세우는 방법:
- 역량 매트릭스 만들기;
- 지식과 경험이 가장 적은 역량 결정;
- 직원이 관심 있는 이러한 역량 확인;
- 3 을 생각해 내세요..반년 또는 1 년 동안 각 역량 내에서 5 가지 목표;
- 한 가지 목표를 달성하기 위해 매달 무언가를 시도하십시오;
- 이러한 목표를 달성하기위한 일반적인 계획에 대해 매월 상기시키기 위해;

#관리자는 계획이 필요합니까?
예,머리는 또한 자신을 위한 계획을 세워야 합니다. 상급자가 없다면,그는 자신을 확인해야 합니다.

#중요한 이유:
- 직원은 회사에 더 충성 될;
- 같은 돈을 위해,당신은 더 많은 자격을 갖춘 인력을 얻을;

§ recommendations.author.oneToOne.title
매달 1- 1 지출

§ recommendations.author.oneToOne.description
이것은 초기 단계에서 문제를 식별하는 데 도움이 될 것입니다.

*일대일*는 상사와 부하 사이의 정기적 인 개인 회의입니다. 그러한 회의에서 그들은 일반적으로 직원에게 중요한 모든 것,그가 관심을 갖는 것,그리고 개인적으로 만 관리자와 공유 할 수있는 것에 대해 논의합니다.

#중요한 이유:
- 그것은 직원이 과부하 누가 자유 시간을 가지고있는 쉽게 찾을 수 있습니다;
- 직원 소진을 방지 할 수 있습니다;
- 당신은 당신이 통지하지 않을 수 있습니다 프로세스에 대한 빠른 피드백을 얻을 수 있습니다;
- 신뢰 태도가 형성되고 직원이 회사에 더 충성하게됩니다.;
- 동기 부여 및 직원 참여 증가;

§ recommendations.author.club.title
바로 가기

§ recommendations.author.club.description
한두 달에 한 번.

이것은 팀의 비공식적인 의사소통을 구축하고 팀을 하나로 모으는 데 도움이 될 것입니다.비록 의사소통이 빡빡하더라도 말이죠.

#왜 중요한가:
- 당신은 당신이 통지하지 않을 수 있습니다 프로세스에 대한 빠른 피드백을 얻을 수 있습니다;
- 신뢰 태도가 형성되고 직원이 회사에 더 충성하게됩니다.;
- 직원 참여 증가;

§ recommendations.timestamp.neverWeekendWord.description여기서 쉬는 날은 없지
§ recommendations.scope.parallelism.not.title아마도 프로젝트 관리자를 해고 할 가치가 있습니다.
§ recommendations.scope.parallelism.not.description주말 작업
§ recommendations.scope.parallelism.has.title아마도 프로젝트 관리자를 체크 아웃 할 가치가 있습니다.
§ recommendations.scope.parallelism.has.description문제가 있습니다
§ recommendations.scope.parallelism.every.title아마 막힘이 있고 주말에 일해야 합니다.
§ recommendations.scope.parallelism.every.description부재자 수가 줄어들었습니다.
§ recommendations.scope.money지난 3 주 동안 이 수치는 감소했습니다.
§ recommendations.scope.bus.everyHasOne.title더 많은 결근이 있습니다
§ recommendations.scope.bus.everyHasOne.description,작업 또는 더 엄격한 제어가 필요하지 않습니다
§ recommendations.scope.bus.oneMaintainer그것은 꾸준히 작동하지 않습니다
§ recommendations.scope.types.process.title그것은 매주 시간의 100%코드를 작성하지 않기 때문에
§ recommendations.scope.types.process.description그것은 꾸준히 처리합니다
§ recommendations.scope.types.one그것은 매주 코드를 작성하기 때문에
§ recommendations.scope.types.common그리고 주말에 생산성이 증가합니다
§ recommendations.week.task.up.description
또는 작업이 너무 작아졌습니다.
 
우리는 그것을 체크 아웃해야합니다. 세분성이 동일한 경우 결과를 수정합니다.
§ recommendations.scope.plan.title결근의 안정적인 리더. 그를 해고?
§ recommendations.scope.plan.description생산성이 떨어지고 있습니다
§ recommendations.week.task.down.description
또는 작업이 더 세분화됩니다. 우리는 그것을 체크 아웃해야합니다. 세분성이 동일한 경우 제어하십시오.

#평가 방법:
- 에 근무 하는 하루 작업의 수는 꾸준히 지난 3 주 동안 떨어지고 있다.

#가능한 오류:
- 작업은 보이는 것보다 더 어려울 수 있습니다;
- 작업 작업의 많은 양을 가질 수(당신은 변화의 수를 확인해야합니다,그들은 같은 기간 동안 가을 여부)

§ recommendations.scope.cost.title작업 유형에 서명하지 않음
§ recommendations.scope.cost.description대부분의 작업 유형은 한 사람이 수행합니다.
§ recommendations.author.lotOfLazy.title: 좁은 전문화
§ recommendations.type.oneMaintainer.description
같은 유형의 대부분의 작업은 같은 사람들에 의해 수행됩니다.

#작업 유형:

§ recommendations.type.common
#어쩌면 그렇지 않을 수도 있습니다

다른 직원이 커밋에 올바르게 서명하는지 확인해야 합니다.

이 작업을 수행하는 데 도움이 되는 단계:
- 커밋 메시지에 대한 사전 커밋 확인 설정;
- 이 유형을 지정할 필요가 있음을 팀에 설명;
- 직원이 규칙을 따르는 새로운 지점 확인;

#그게 사실이라면

너는 체크를 설치하고 동일한 직원이 업무의 동일한 유형을 하고 있는 것을 확인했다.

왜 나쁜:
- 그의 해고는 많은 과정을 멈출 것입니다;
- 팀 구성원의 나머지 부분의 능력 감소;
- 그것은 최상위 수준에서 자신의 편집을 이해하기 어렵다;

그것을 고치는 방법:
- 다양한 유형의 작업을 균등하게 분배;
- 스프린트를 통해 직원 간의 작업 범위(테스트,문서화,오류)변경;

§ recommendations.type.fewTypes.title
이 로컬 제품입니다

§ recommendations.type.fewTypes.description
특정 고객 또는 문제에 대한.

#"글로벌"제품의 징후는 무엇입니까:
- 현지화;
- 문서;
- 많은 양의 테스트;
- 시각적 사용자 정의;
- 리팩토링 병목 현상;
- 기타

#이 제품이"로컬"처럼 보이는 이유:
- 각"글로벌"기능은 작업 유형에 따라 우세합니다;
- "글로벌"기능이 많을수록"글로벌"제품이 더 많을 가능성이 높습니다;

이 경우 우리는 소수의 유형을 볼 수 있으므로 제품이 세계 시장에 쉽게 확장되고 다른 국가에서 판매되는 것을 방지하는 결함이 있을 가능성이 큽니다.

#어쩌면 그렇지 않을 수도 있습니다
파일 유형에 따라 프로그램 유형(웹 사이트,서버 응용 프로그램,개발 운영 스크립트 등)을 가정 할 수 있습니다.). 프론트 엔드 응용 프로그램의 경우,우리의 가설은 마이크로 초기화 모듈 일 수있는 개발 운영 스크립트보다 더 정확할 것입니다.

§ recommendations.type.diff.title
선행 유형을 하위 유형으로 구분

§ recommendations.type.diff.description
오류를 자세히 설명합니다.

일반적으로"오류 수정"이라고 표시된 작업 유형이 가장 먼저 표시됩니다. 이 통계는 제대로 상세하게.

*이러한 상황이 있는 경우*이 유형을 하위 유형(예:감지 위치별)으로 나눌 수 있습니다.

하위 유형의 여러 변형을 고려해 보겠습니다:
- 수정 _데브(개발 프로세스 중에 확인된 오류);
- 수정 _테스트(테스트 중 오류가 감지됨);
- 수정(자극에서 감지 된 오류);

§ recommendations.type.buddy.title
작은 작업 저장

§ recommendations.type.buddy.description
새로운 직원을 위해.

#작업이:
- 중요하지 않아;
- 아니 큰 하나;
- 맥락에서 강한 몰입을 필요로하지 않습니다;
- 새로운 코드보다 리팩토링에 대한 자세한 내용;

#"초보자를위한"레이블 백 로그에 넣어.

새로운 직원이 도착하면,당신은 즉시 그에게 프로젝트에 익숙해 작고 다양한 작업의 팩을 얻을 수 있습니다.

당신은 당신의 일에 침체가있는 경우 또한,당신은 백 로그에서 하나의 작은 작업을 얻을 수있을 것입니다.
`;
