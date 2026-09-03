export default `
§ plugin.team_total.sidebar: 概要情報
§ plugin.team_total.common.title: プロジェクトについて
§ plugin.team_total.workSpeed.title: 1 日あたりのタスク
§ plugin.team_total.workSpeed.description: 現在のスタッフ構成におけるチームの平均処理量
§ plugin.team_total.employment.title: 在籍 / 離職
§ plugin.team_total.employment.description: スタッフが 1 か月間 commit を 1 件も作成しなかった場合、離職とみなします
§ plugin.team_total.common.duration.title: 作業期間の合計
§ plugin.team_total.common.duration.description: 最初の commit から最後の commit までの開発期間の合計。
§ plugin.team_total.common.location.title: 本社
§ plugin.team_total.common.location.description: 現在の中核スタッフ構成で最も多い所在地。
§ plugin.team_total.common.employees.title: 部署の人数
§ plugin.team_total.common.employees.description: タスク ID の変化率に基づく総スタッフ規模の予測による。
§ plugin.team_total.release.title: リリース情報
§ plugin.team_total.release.total.title: リリース総数
§ plugin.team_total.release.total.description: リリースとは、単語 "release" を含む branch です。原則として "auto-merge" イベントに現れます。
§ plugin.team_total.money.title: 開発コストの見積もり
§ plugin.team_total.moneyAll.title: 合計
§ plugin.team_total.moneyAll.description: 給与総額。休暇手当および週末勤務の過払いを含みます。
§ plugin.team_total.moneyWorked.title: 実績
§ plugin.team_total.moneyWorked.description: 実働日数に平均給与を乗じた額。
§ plugin.team_total.moneyLosses.title: 想定される過払い
§ plugin.team_total.moneyLosses.description: commits がなかった有給の稼働日。
§ plugin.team_total.weekendPayment.title: 週末勤務
§ plugin.team_total.weekendPayment.description: 週末勤務に対する過払いの合計。
§ plugin.team_total.moneySpeed.title: 月あたり
§ plugin.team_total.moneySpeed.description: 現在のスタッフ構成における予測給与額（税、設備減価償却、関連コストを除く）。
§ plugin.team_total.forecastingMoneyAll.title: 期間を通じたプロジェクトコスト
§ plugin.team_total.forecastingMoneyAll.description: ログに現れないが存在し得た部署の潜在スタッフ全員に対する、期間を通じた想定給与額（タスク トラッカーのタスク ID 番号付けに基づく）。    
§ plugin.team_total.description1: *人日* とは、スタッフ 1 名が 1 稼働日に行う作業です。例えば、暦日 1 日で 3 名のチームは 3 人日分の作業量を提供します。
§ plugin.team_total.description2: *欠勤日* には、commits を作成できたはずの稼働日のみが含まれます。週末、祝日、休暇は計算に含まれません。
§ plugin.team_total.description3: カード *在籍 / 離職* は、継続的に作業へ関与している実際のスタッフを示します。加えて「アシスタント」がおり、多くの場合別の専門の人で、ときどきプロジェクトに commits を作成します。
§ plugin.team_total.description4: *過払い* には、commits を作成できたはずの稼働日のみが含まれます。週末、祝日、休暇は計算に含まれません。そのため、過払い + 実績コスト != 合計です。合計コストには週末、祝日、休暇の支払いが含まれます。
§ plugin.team_total.description5: *週末勤務* は通常日の支払いに対して係数 x2 で算出します。上に表示されるのは過払い分（x1）のみです。この文脈では残業の事実自体が重要ではないためです。予算の消化速度は見ません。作業速度が上がったときの過払いを見ます。
`;
