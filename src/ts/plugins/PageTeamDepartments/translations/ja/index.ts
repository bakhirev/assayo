export default `
§ plugin.team_departments.sidebar: 部門
§ plugin.team_departments.employmentsChart.title: 現在のチーム規模
§ plugin.team_departments.employmentsChart.item: チーム
§ plugin.team_departments.employmentsChart.less1: 従業員 1 名
§ plugin.team_departments.employmentsChart.less2: 従業員 2 名
§ plugin.team_departments.employmentsChart.less3: 従業員 3 名
§ plugin.team_departments.employmentsChart.less6: 従業員 6 名まで
§ plugin.team_departments.employmentsChart.less9: 従業員 9 名まで
§ plugin.team_departments.employmentsChart.less12: 従業員 12 名まで
§ plugin.team_departments.employmentsChart.less15: 従業員 15 名まで
§ plugin.team_departments.employmentsChart.more: 15 名超
§ plugin.team_departments.daysChart.title: プロジェクト期間
§ plugin.team_departments.daysChart.item: プロジェクト
§ plugin.team_departments.title: プロジェクト一覧
§ plugin.team_departments.status: ステータス
§ plugin.team_departments.active.yes: 開発中
§ plugin.team_departments.active.no: 新しいタスクなし
§ plugin.team_departments.author.work: 在籍
§ plugin.team_departments.author.dismissed: 退職
§ plugin.team_departments.author.staff: 補助
§ plugin.team_departments.code: コード
§ plugin.team_departments.from: 最初の commit
§ plugin.team_departments.to: 最後
§ plugin.team_departments.authors: 人
§ plugin.team_departments.tasks: タスク
§ plugin.team_departments.totalDays: 期間
§ plugin.team_departments.totalAuthors: 従業員
§ plugin.team_departments.totalTasks: タスク
§ plugin.team_departments.employments.author: 従業員
§ plugin.team_departments.employments.worked: 勤務
§ plugin.team_departments.employments.losses: commit のない日
§ plugin.team_departments.employments.totalDays: 部門内の日数
§ plugin.team_departments.employments.totalTasks: 完了したタスク
§ plugin.team_departments.banner.title: 部門の詳細情報
§ plugin.team_departments.details.title: 部門の実績データ
§ plugin.team_departments.details.totalDays: 作業期間
§ plugin.team_departments.details.moneyInMonth: 月間開発コスト
§ plugin.team_departments.details.moneyAll: 期間全体の開発コスト
§ plugin.team_departments.details.mainLocation: 主な所在地
§ plugin.team_departments.details.activeAuthors.title: 在籍 / 退職
§ plugin.team_departments.details.activeAuthors.description: 従業員が 1 か月間一度も commit しなかった場合、退職したと見なされます。ステータスはこの部門に限らず表示されます。いずれかの部門で働いているか、会社を完全に退職している可能性があります。
§ plugin.team_departments.details.linesInTask.title: タスクあたりのコード行数
§ plugin.team_departments.details.linesInTask.description: タスクあたりのコード行数の加重平均値。タスクの粒度を推定するのに役立ちます。
§ plugin.team_departments.details.totalTasks.title: 担当していたタスク
§ plugin.team_departments.details.totalTasks.description: 固有のタスク ID の言及があればすべてカウントされます。タスクトラッカーでタスクがクローズされていない場合があります。
§ plugin.team_departments.months.title: 部門の想定従業員数
§ plugin.team_departments.months.description: タスクトラッカーは連番のタスク ID を発行します。月初と月末の最大タスク ID から *新規タスク* の数を求められます。今月 *修正された* タスク数はログに現れます。誰が修正したか（*稼働したか*）も同様です。後から修正されたタスク数（*バックログ*）は翌月以降のログから算出します。見えるプログラマの処理量をタスク総数に外挿し、部門にいるべき *プログラマ総数* を推定します。「プログラマ」の人数から QA エンジニア、アナリスト、マネージャの人数を見積もります。
§ plugin.team_departments.months.newTaskInMonth: 新規タスク
§ plugin.team_departments.months.tasksFixedThisGroup: 修正済み
§ plugin.team_departments.months.tasksInBacklog: バックログ
§ plugin.team_departments.months.programmistInThisGroup: 稼働した
§ plugin.team_departments.months.allProgrammistInDepartment: 稼働すべき人数
§ plugin.team_departments.months.allUsersInDepartment: 従業員合計
§ plugin.team_departments.forecasting.title: 総コスト予測
§ plugin.team_departments.forecasting.moneyInMonth.title: 部門の月間コスト
§ plugin.team_departments.forecasting.moneyInMonth.description: 直近月の想定従業員数（開発、QA、分析、マネジメント）に平均給与を掛けます。
§ plugin.team_departments.forecasting.moneyAll.title: 期間全体の部門コスト
§ plugin.team_departments.forecasting.moneyAll.description: 各月の想定従業員数（開発、QA、分析、マネジメント）に平均給与を掛けます。
`;
