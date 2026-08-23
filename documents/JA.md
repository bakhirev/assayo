
> [English](https://github.com/bakhirev/assayo) | [Español](https://github.com/bakhirev/assayo/blob/main/documents/ES.md) | [Français](https://github.com/bakhirev/assayo/blob/main/documents/FR.md) | [Português](https://github.com/bakhirev/assayo/blob/main/documents/PT.md) | [Deutsch](https://github.com/bakhirev/assayo/blob/main/documents/DE.md) | [中文](https://github.com/bakhirev/assayo/blob/main/documents/ZH.md) | __[日本語](https://github.com/bakhirev/assayo/blob/main/documents/JA.md)__ | [한국어](https://github.com/bakhirev/assayo/blob/main/documents/KO.md) | [العربية](https://github.com/bakhirev/assayo/blob/main/documents/AR.md) | [हिन्दी](https://github.com/bakhirev/assayo/blob/main/documents/HI.md) | [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

# [Assayo](https://bakhirev.github.io/?ref=github&lang=ja)
HTMLレポートを作成してコミットの統計を分析します：
- 作業のペースと残業時間の数；
- 責任の範囲、機能の数とエラー；
- 同僚の作業スタイル；
- 従業員の流れとチームの構成；
- 開発者の位置；
- リリーススケジュールと休暇スケジュール；
- 機能とプロジェクト全体のコスト；
- リファクタリングが必要な場所、削除されたファイルなど。

**リンク：** [demo](https://bakhirev.github.io/demo/?ref=github&dump=./test.txt), [online version](https://bakhirev.github.io/demo/?ref=github), [docker](https://hub.docker.com/r/bakhirev/assayo), [reddit](https://www.reddit.com/r/ITManagers/comments/1e5k291/the_visualization_and_analysis_of_git_commit/), [habr](https://habr.com/ru/articles/852782/)

**ビデオ：** [english](https://www.youtube.com/watch?v=uMbhrrd25t4), [español](https://www.youtube.com/watch?v=skmctb_2rZ0), [русский](https://www.youtube.com/watch?v=jwCp_-bhrCQ)

<a href="https://bakhirev.github.io/demo/?ref=github&dump=./test.txt" target="_blank"><img src="https://bakhirev.github.io/assets/images/index.gif" width="100%" /></a>

<a name="link-0"></a>
### 目次
- [コミット統計レポート](#link-1)
  - [レポートの作成と表示方法は？](#link-2)
    - [パブリックサーバーを使用](#link-3)
    - [NodeJSライブラリを使用](#link-4)
    - [PHPライブラリを使用](#link-5)
    - [Pythonライブラリを使用](#link-6)
    - [Rubyライブラリを使用](#link-7)
    - [Goライブラリを使用](#link-8)
    - [ソースコードを使用](#link-9)
    - [GitHubアクションを使用](#link-10)
    - [プライベートサーバーを使用](#link-11)
  - [著者を結合する方法は？](#link-12)
  - [Gitデータをtxtファイルにエクスポートする方法](#link-13)
    - [オンラインで表示](#link-14)
    - [オフラインで表示](#link-15)
    - [WindowsでPowerShellを使用している場合](#link-16)
  - [マイクロサービスグループのレポートの見方は？](#link-17)


- [プロジェクトでのベストプラクティス](#link-18)
  - [コミットのサイン方法は？](#link-19)
  - [コミットメッセージのチェックを追加する方法](#link-20)
    - [ファイルcommit-msgを使用](#link-21)
    - [パッケージpre-commitを使用](#link-22)


- [このアプリについて](#link-23)
  - [インターフェースをブランディングする方法](#link-24)
  - [ソースコードからHTMLレポートを再構築する方法](#link-25)
  - [翻訳を追加または編集する方法](#link-26)
  - [設定](#link-31)
  - [アーキテクチャ](#link-27)
    - [マイクロサービスの全体的なアーキテクチャ](#link-29)
  - [フィードバック、コメント](#link-30)

<a name="link-1"></a>
##  コミット統計レポート

<a name="link-2"></a>
### 📈 レポートの作成と表示方法は？

<a name="link-3"></a>
#### パブリックサーバーを使用
- [ウェブサイト](https://bakhirev.github.io/)にアクセス
- 手順に従って

<a name="link-4"></a>
#### NodeJSライブラリを使用
- `npx assayo`を実行
- `./assayo/index.html`を開く

<a name="link-5"></a>
#### PHPライブラリを使用
- `composer require bakhirev/assayo`を実行
- `vendor/bin/assayo`を実行
- `./assayo/index.html`を開く

<a name="link-6"></a>
#### Pythonライブラリを使用
- `pipx install assayo`を実行
- `assayo`を実行
- `./assayo/index.html`を開く

<a name="link-7"></a>
#### Rubyライブラリを使用
- `gem install assayo`を実行
- `assayo`を実行
- `./assayo/index.html`を開く

<a name="link-8"></a>
#### Goライブラリを使用
- `go get github.com/bakhirev/assayo`を実行
- `go install github.com/bakhirev/assayo`を実行
- `assayo`を実行
- `./assayo/index.html`を開く

<a name="link-9"></a>
#### ソースコードを使用
- このリポジトリをダウンロード
- ファイル`log.txt`を`/build`に配置
- `/build/index.html`を開く
- または、ファイル夹`/build`をリポジトリに配置（`log.txt`が存在する場所）。名前を変更できます。例えば、`/build`から`/report`に変更します。

この場合、ファイル`log.txt`がコマンドによって生成され、オフラインで表示されることが重要です。

<a name="link-10"></a>
####  GitHubアクションを使用
ファイル夹`.github/workflows/`に[スクリプト](https://github.com/bakhirev/assayo/blob/main/documents/ActionExample.yml)を追加またはマーケットプレイスの[アクション](https://github.com/marketplace/actions/assayo)を使用します。準備された更新されたレポートがアーティファクトに保存されます。

<a name="link-11"></a>
#### プライベートサーバーを使用
- [docker](https://hub.docker.com/r/bakhirev/assayo)イメージをダウンロード；
- ローカルネットワークで実行；
- Webインターフェースでレポートを表示し、データURLパラメータ`dump`を設定：

```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - コンテナassayoのURL、ポート80を監視；
you_url    - GitログのコンテナURL；
```
デフォルトでは、イメージは`http://127.0.0.1:80/`で実行されます。機能しない場合は、ポート80が利用可能か確認してください。

<a name="link-12"></a>
### ‍🎭 著者を結合する方法は？
プロジェクトのルートディレクトリで、ファイル`.mailmap`を作成する必要があります。

ファイルの内容の例：
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
```
このファイル形式について詳しくは[こちら](https://git-scm.com/docs/gitmailmap)をご覧ください。

<a name="link-13"></a>
### 📤 Gitデータをtxtファイルにエクスポートする方法

<a name="link-14"></a>
####  オンラインで表示
プロジェクトのルートディレクトリで実行：
```
git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" > log.txt
```

<a name="link-15"></a>
####  オフラインで表示
```
git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" | sed -e 's/\\/\\\\/g' | sed -e 's/`/"/g' | sed -e 's/\$/S/g' | sed -e '1s/^/R(f\`/' | sed -e '$s/$/\`\);/' > log.txt
```

Gitはファイル`log.txt`を作成します。このファイルには、レポートを表示するためのデータが含まれています。オンラインとオフラインの形式の違いは、文字列のラッピングです。オフライン形式は、ファイル`js`としてロードされます（`/build/index.html`のみ開く場合）

<a name="link-16"></a>
#### WindowsでPowerShellを使用している場合
デフォルトでは、出力エンコーディングがUTF-8と一致しない場合があり、生成されたログファイルは読み取り不能になります。ログを保存する前に、コマンドを使用してエンコーディングを変更できます。
```
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```
または、保存されたファイルを開き、エンコーディングをUTF-8に手動で変更します。

<a name="link-17"></a>
### 🗃️ マイクロサービスグループのレポートの見方は？
- 各マイクロサービスファイル`log.txt`（`log-1.txt`, `log-2.txt`, `log-3.txt`など）を作成します。手動で行うこともできますし、[Assayo Crawler](https://github.com/bakhirev/assayo-crawler)モジュールを使用して自動ログ収集を行うこともできます；
- 「オンラインレポートの見方」を参照。最後のステップで、すべてのファイルを一度にブラウザウィンドウにドラッグします。
- 「オフラインレポートの見方」を参照。2番目のステップで、すべてのマイクロサービスファイル（`log-1.txt`, `log-2.txt`, `log-3.txt`など）をレポートフォルダ（`/build`）にドラッグします。

<a name="link-18"></a>
## プロジェクトでのベストプラクティス

<a name="link-19"></a>
### 📝 コミットのサイン方法は？
[Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)に従います。例：
```
JIRA-1234 feat(profile): Added avatar for user
```
- タスクトラッカーのタスク番号`(JIRA-1234)`
- 作業の種類`(feat, fix, style, refactor, test, docなど)`
- 機能`(profile - サイトの新規ページまたは新規機能、短い単語または略語の1（2）つを使用)`
- 解決された問題`(Added avatar for user)`

<a name="link-20"></a>
### 👮 コミットメッセージのチェックを追加する方法

<a name="link-21"></a>
####  ファイルcommit-msgを使用
1. フォルダ.git/hooks/にファイル`commit-msg`を作成
2. ファイルにこのテキストを追加：
```
#!/usr/bin/env bash
if ! grep -iqE "(JIRA-[0-9]{1,5})(s)(feat|fix|docs|style|refactor|test|chore)((([a-z0-9_-]{1,})){0,})(:s)([a-z]{1,})" "$1"; then
   echo "Need commit message like: JIRA-12 fix(profile): some text. Read Semantic Commit Messages" >&2
   exit 1
fi
```

<a name="link-22"></a>
#### パッケージ[pre-commit](https://www.npmjs.com/package/pre-commit)を使用
1. ファイル`package.json`にプロパティ`commit-msg`を追加：
```
...
"commit-msg": {
  "regex": "(JIRA-[0-9]{1,5})(\s)(feat|fix|docs|style|refactor|test|chore)((\([a-z0-9_-]{1,}\)){0,})(:\s)([a-z]{1,})",
    "error-message": "Need commit message like: JIRA-12 fix(profile): some text Read Semantic Commit Messages"
},
...
```
2. コマンド`npm install pre-commit`を実行

<a name="link-23"></a>
##  このアプリについて

<a name="link-25"></a>
### 🛠️ ソースコードからHTMLレポートを再構築する方法
- このリポジトリ`git clone https://github.com/bakhirev/assayo.git`をダウンロード
- `npm install`を実行
- `npm run build:local`を実行
- 新しいHTMLビルドは、フォルダ`/build`にあります

<a name="link-24"></a>
### 🎨 インターフェースをブランディングする方法
レポート用に独自のテーマを作成できます。**例：** [デモ](https://bakhirev.github.io/demo/themes/)

<a name="link-26"></a>
### 🈯 翻訳を追加または編集する方法
新しい翻訳を追加したり、フォルダ`**/translations/**`にある既存の翻訳を修正できます。
[指示](https://github.com/firstcontributions/first-contributions)

<a name="link-31"></a>
### ⚙️ 設定

アプリケーションは設定ファイルでカスタマイズできます。実際の設定ファイルはページの URL で指定できます。例：

```
./assayo/index.html?config=you_custom_config.json
```

#### パラメータ

| コード | 型 | 説明 | デフォルト値 |
|-|-|-|-|
| title | string | ブラウザタブ名（`document.title`） | |
| logo | string | ロゴへのパス | `"./assets/logo.svg"` |
| language | string | インターフェース言語 | |
| languages | object[] | 利用可能な言語 | |
| languages[].id | string | 言語 ID | |
| languages[].currency | string | 通貨 | |
| languages[].title | string | インターフェース上の言語名（右上） | |
| urlForCss | string | スタイルを上書きする CSS ファイルへのパス。独自のビジュアルテーマを作成できます。例：[デモ](https://bakhirev.github.io/demo/themes/) | |
| urlForGitLog | string | GIT ログファイルへのパス | `"./log.txt"` |
| prefixForTask | string | タスクリンクのプレフィックス | `"https://jira.com/secure/RapidBoard.jspa?task="` |
| prefixForPR | string | Pull Request リンクのプレフィックス | `"https://bitbucket.com/projects/assayo/repos/frontend/pull-requests/"` |
| middleSalaryInMonth | number | 月平均給与（USD） | 3000 |
| workDays | boolean[] | 「稼働日」とみなす曜日。0 が月曜日、6 が日曜日 | `[true, true, true, true, true, false, false]` |
| currency | string | 現在の通貨 | `"RUB"` |
| exchangeRate | object<string, number> | USD に対する為替レート。「キー: 値」形式。例：`{ USD: 1 }` | `{ USD: 1, EUR: 0.9, RUB: 82, CNY: 7, JPY: 160, KRW: 1500, CAD: 1.4, INR: 92, ILS: 3.1, AED: 3.6}` |
| permissions | string[] | 利用可能な権限の配列 | | []
| disabledPermissions | string[] | 利用できない権限の配列 | | []
| plugins | string[] | 有効なプラグインの配列 | | []
| disabledPlugins | string[] | 無効なプラグインの配列 | | []

#### URL パラメータ

一部のパラメータは他より頻繁に使われます。そのため、設定ファイルなしで URL に指定できます。

| コード | 説明 | 例 |
|-|-|-|
| title | ブラウザタブ名（`document.title`） | `?title=Company_Name` |
| lang | インターフェース言語 | `?lang=es` |
| theme | スタイルを上書きする CSS ファイルへのパス。独自のビジュアルテーマを作成できます。例：[デモ](https://bakhirev.github.io/demo/themes/) | `?theme=//company.com/some.css` |

#### デフォルトの設定ファイル

`src\ts\helpers\ApplicationConfig\getDefaultConfig.ts` を参照

#### 設定ファイルの例
```
{
  title: '',
  logo: 'https://yousite.com/yousite.svg',
  urlForCss: 'https://yousite.com/themes/white.css',
  urlForGitLog: 'https://yousite.com/logs/team.txt',
  prefixForTask: 'https://yousite.com/?task=',
  prefixForPR: 'https://yousite.com/?pullRequests=',
  middleSalaryInMonth: 4000,
  currency: 'RUB',
  exchangeRate: {
    RUB: 90,
  },
  disabledPlugins: ['print'],
}
```

<a name="link-27"></a>
### 📐 アーキテクチャ

<a name="link-29"></a>
#### マイクロサービスの全体的なアーキテクチャ
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](https://github.com/bakhirev/assayo-showcase)は、利用可能なレポートのリストを表示します。各レポートには、タイトル、説明、およびリポジトリのリストが含まれています。
2. [Crawler service](https://github.com/bakhirev/assayo-crawler)は、レポートのためにリポジトリログを収集します。
3. [Log visualization UI](https://github.com/bakhirev/assayo)（**ここにいます**）はレポートを表示します。作業にはログファイルが必要です。

<a name="link-30"></a>
### 📧 フィードバック、コメント
- 📱 [https://t.me/bakhirev](https://t.me/bakhirev) (優先通信方法)
- 📧 [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- 🌐 [https://bakhirev.github.io/](https://bakhirev.github.io/?ref=github&lang=ja)

