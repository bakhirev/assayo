> [主な文書はロシア語です。](https://github.com/bakhirev/assayo/blob/main/documents/RU.md) これは翻訳です。 エラーが含まれている可能性があります。 あなたがネイティブスピーカーであれば、この翻訳を改善するのに役立ちます。 ありがとう！

> - [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)
> - [English](https://github.com/bakhirev/assayo)
> - [中文](https://github.com/bakhirev/assayo/blob/main/documents/ZH.md)
> - [Español](https://github.com/bakhirev/assayo/blob/main/documents/ES.md)
> - [Français](https://github.com/bakhirev/assayo/blob/main/documents/FR.md)
> - [Português](https://github.com/bakhirev/assayo/blob/main/documents/PT.md)
> - [Deutsch](https://github.com/bakhirev/assayo/blob/main/documents/DE.md)
> - [日本語](https://github.com/bakhirev/assayo/blob/main/documents/JA.md)

# [Assayo](https://assayo.jp/?ref=github&lang=ru)

データの可視化とGitレポジトリの分析 ([デモ](https://assayo.jp/demo/?dump=./test.txt&lang=ru)).

##### 従業員は新しい職場を評価することができます
- 働きのペース;
- 過労;
- 職務範囲;
- 新機能とバグの量;
- 同僚の仕事スタイル;

##### 管理者は従業員を評価できます
- 無職人の特定;
- コードの量を推定する;
- 作業速度を確認する;
- 行動の異常を発見する;
- 週次で作業状況を確認する;

##### アイベンターは製品を評価できます
- 製品の価格;
- 新機能の価格;
- 開発時間;
- 改善時間の予測;
- 予測価格;

### コミット数を素早く確認するにはどうすればよいでしょうか。

プロジェクトのルートディレクトリで以下のコマンドを実行します:
```
git shortlog -s -n -e
```
### 作者をまとめるにはどうすればいいですか？
プロジェクトのルートディレクトリ内に.mailmapファイルを作成する必要があります。
ファイルの内容の例:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
``` 
このファイルの形式について詳しく読むことができます [ここに](https://git-scm.com/docs/gitmailmap).

### Gitからデータをダウンロードするにはどうすればよろしいでしょうか。

#### Дオンラインで見るため
プロジェクトのルートディレクトリに次のコマンドを入力します:
```
git --no-pager log --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%cN>%cE>%s" > log.txt
```
#### インターネットなしで見るために

```
git --no-pager log --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%cN>%cE>%s" | sed -e 's/\\/\\\\/g' | sed -e 's/`/"/g' | sed -e 's/^/report.push(\`/g' | sed 's/$/\`\);/g' | sed 's/\$/_/g' > log.txt
```
Gitはファイルを作成します `log.txt`.
このファイルには、レポートを構築するためのデータが含まれています。 

インターネットのない形式とインターネットのある形式は、文字列が埋め込まれているという点で異なります。インターネットを持たない形式でファイルを開くと、単に「js」ファイルとして読み込まれます。 `/build/index.html`

### インターネットを使ってレポートを見るにはどうすれば良いでしょうか。 

- に切り替える [ウェブサイト](https://assayo.jp/)
- ボタンを押す “[デモ](https://assayo.jp/demo?lang=ru)”
- ファイルをドラッグ＆ドロップする `log.txt` ブラウザウィンドウで

### インターネットを使用せずレポートを見るにはどうしたらよいでしょうか
- このリポジトリをダウンロードする
- ファイルをドラッグ＆ドロップする `log.txt` フォルダへ `/build`
- 実行するには `/build/index.html`
- フォルダをドラッグして下さい `/build` 自分のリポジトリーにフォルダを置いてください (それがある場所 `log.txt`). 名前を変更することができます。例えば名前 `/build` を `/report`

重要なのは、ファイル `log.txt` インターネットが利用できない環境で、レポートを表示するために作成されたコマンドである必要があります。

### レポートファイルを再構成する方法は？
- このリポジトリをダウンロードしてください
- 実行するには `npm install`
- 実行するには `npm run build`
- 最新のビルドは、フォルダに含まれるでしょう `/build`

### マイクロサービス群のレポートを表示するにはどうすればよいでしょうか。
- マイクロサービスごとにファイルを作成します。 `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt` など。)
- "インターネット上でレポートを見る方法"を参照してください。最後の手順では、すべてのファイルをブラウザのウィンドウに一度にドラッグ＆ドロップします。
- “インターネットなしでレポートを見る方法” を参照してください。第二段階では、マイクロサービスのすべてのファイルをドラッグしてドロップする必要があります。(`log-1.txt`, `log-2.txt`, `log-3.txt` など。) レポートフォルダへ (`/build`).

### 自社のブランドカラーでインターフェースをリニュアルカラーに変えるにはどうすればよろしいでしょうか。
インターフェースのテーマを独自に作成することができます。下記の項目は変更できます。
- **見出し**. それはURLパラメータで指定することができます ```title```. 例えば: ```?title=You Company```
- **CSS スタイル**. そのためにはCSSファイルを用意し、そのアドレスをURLパラメーターに指定する必要があります ```theme```. 例えば: ```?theme=//company.com/some.css```. クラス名をセレクターとして使用することができます。ほとんどの場合、新しいバージョンがリリースされると変更されません
- **言語**. URLパラメータに指定することができます ```lang```. 例えば: ```?lang=es```

### commit文の署名方法は？

練習に従ってください [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). 例えば:
```
JIRA-1234 feat(profile): Added avatar for user 
```
- 発行番号 `(JIRA-1234)`
- 仕事の種類 `(feat, fix, style, refactor, test, doc など。)`
- 仕事の分野 `(profile - サイトのセクション、ページ、新機能、簡単に)`
- ジョブの説明 `(Added avatar for user)`

### データの自動収集方法は？

#### バックエンドなし
- リポジトリのクローンを作成します。;
- フォルダをコピーする `build` 現在のリポジトリから;
- オープン `build/index.html` ブラウザでブックマークに追加します。;
- にショートカットを追加する `build/assets/ci-cd.sh` 自動起動フォルダーに (Windows);

コンピューターを再起動するとき、スクリプトはメインブランチに自動的に挿入されたすべてのデータについての統計を更新します。

### DevOps (CI/CD)

#### 公開サーバ

データをレポートビルド用に公開するファイルをURLで公開することができます。その視覚化は、サイト上で利用可能なツールを使用することで行うことができます。 [assayo](https://assayo.jp/). データがある場所のアドレスを、URLパラメータに入力してください。 ```dump```:
```
https://assayo.jp/demo/?dump=//you_site.com/some/log.txt
```

#### プライベートサーバー
- ダウンロード [dockerイメージ](https://hub.docker.com/r/bakhirev/assayo);
- ローカルネットワーク内で実行します。;
- レポートの表示には、データが置かれている場所のアドレスがURLパラメータに入っていることを指定したウェブインターフェイスを使用します。 ```dump```:
```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - ポート80でリッスンしているassayoコンテナのURL;
you_url    - gitのログのコンテナーのURLアドレス;
```

デフォルトではイメージは以下のアドレスで起動します ```http://127.0.0.1:80/```. 問題が解決しない場合は、ポート80が開いているか確認してみてください。
#### Dockerイメージの更新

- 次のコマンドを実行します ```npm run build```
- 次のコマンドを実行します ```docker build -t assayo .```
- 結果を確認する ```docker run --name assayo -p 80:80 -d assayo```;
- 次のコマンドを実行します ```docker tag IMAGE_ID bakhirev/assayo:latest```;
- コンテナイメージをDocker Hubにアップロードする

### 半年ごとにリリースを行います。次は何でしょうか。

見て！ [主なドキュメント](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

### 翻訳を追加または編集するにはどうすればいいでしょうか。

新しい翻訳を追加するか、現在の翻訳を修正するために、以下のセクションでそれを行うことができます: ```ts/translations/```.
[取扱説明書](https://docs.github.com/ru/get-started/exploring-projects-on-github/contributing-to-a-project)

### 願い、提案、コメント
- telegramm [@bakhirev](https://t.me/bakhirev) (優先通信方式)
- [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- ウェブサイト [https://assayo.jp/](https://assayo.jp/)

