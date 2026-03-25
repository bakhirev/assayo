export default `
§ plugin.team_total.sidebar: 概要
§ plugin.team_total.common.title: 概要
§ plugin.team_total.common.duration.title: 全体の作業期間
§ plugin.team_total.common.duration.description: 最初のコミットから最後のコミットまでの開発期間
§ plugin.team_total.common.location.title: 本社
§ plugin.team_total.common.employees.title: 部署の人数
§ plugin.team_total.release.title: リリース情報
§ plugin.team_total.release.total.title: リリース総数
§ plugin.team_total.release.total.description: リリース情報
§ plugin.team_total.money.title: 開発コスト
§ plugin.team_total.titleA: 作業量
§ plugin.team_total.titleB: コスト
§ plugin.team_total.daysWorked.title: 人日
§ plugin.team_total.daysWorked.description: コミットが行われた日のみを集計
§ plugin.team_total.commits.title: コミット数
§ plugin.team_total.commits.description: 削除されたブランチは集計対象外
§ plugin.team_total.daysLosses.title: コミットなしの日数
§ plugin.team_total.daysLosses.description: 全日数から、祝日・週末・休暇・コミットのある日を差し引いた日数
§ plugin.team_total.employment.title: 在籍 / 離職
§ plugin.team_total.employment.description: 1か月間コミットが1件もない場合、離職とみなします
§ plugin.team_total.moneyAll.title: 開発費
§ plugin.team_total.moneyAll.description: 給与の総コスト。休暇手当と週末勤務の割増分を含みます。
§ plugin.team_total.moneyWorked.title: 実績
§ plugin.team_total.moneyWorked.description: 実働日数 × 平均給与
§ plugin.team_total.moneyLosses.title: 想定される過払い
§ plugin.team_total.moneyLosses.description: コミットがないのに支払われた稼働日
§ plugin.team_total.weekendPayment.title: 週末勤務
§ plugin.team_total.weekendPayment.description: 週末勤務に対する割増支払いの合計
§ plugin.team_total.workSpeed.title: 1日あたりのタスク
§ plugin.team_total.workSpeed.description: 現在の人員構成におけるチームの平均処理速度
§ plugin.team_total.moneySpeed.title: 月あたり
§ plugin.team_total.moneySpeed.description: 税金や付随コストを除いた、現在の人員構成における想定給与支払額
§ plugin.team_total.description1: *人日* とは、1人の従業員が1営業日で行う作業量です。例えば、暦日1日で3人のチームは3人日分の作業量を提供します。
§ plugin.team_total.description2: *欠勤日* は、コミットが行えたはずの営業日のみを指します。週末、祝日、休暇は計算に含まれません。
§ plugin.team_total.description3: カード *在籍 / 離職* は、継続的に作業へ参加している実際の人員構成を示します。加えて「ヘルパー」— 多くの場合別職種の従業員 — が、ときどきプロジェクトにコミットすることがあります。
§ plugin.team_total.description4: *過払い* は、コミットが行えたはずの営業日のみを対象とします。週末、祝日、休暇は計算に含まれません。そのため、過払い + 実績コスト != 総額です。総額には週末、祝日、休暇の支払いが含まれます。
§ plugin.team_total.description5: *週末勤務* は通常日の支払いに対して係数 x2 で算出します。上に表示されるのは割増分（x1）のみです。ここでは残業の事実自体に意味がないためです。予算消化速度は見ません。作業速度を上げたときの過払いを見ます。
`;
