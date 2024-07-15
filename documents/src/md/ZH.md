> [主要文件是俄文。](https://github.com/bakhirev/assayo/blob/main/documents/RU.md) 这是一个翻译。 它可能包含错误。 如果您是母语人士，您可以帮助改进此翻译。 谢谢！

对您的git仓库的数据进行可视化和分析 ([示范表现](https://assayo.online/demo/?dump=./test.txt), [install](https://assayo.online/demo/?ref=github), [docker](https://hub.docker.com/r/bakhirev/assayo)).

##### 工作人员可以评估新工作场所
- 工作节奏；
- 加班数量；
- 责任范围；
- 新功能和错误量；
- 同事工作方式。；

##### 管理者可以评估员工
- 发现闲置工作者；
- 估算代码量；
- 了解工作速度；
- 注意行为异常；
- 查看工作周期动态。;

##### 投资者可以评估产品
- 产品的成本;
- 新功能的成本;
- 开发时间;
- 修改时间预测;
- 成本预测;

### Table of contents

### 如何 quickly 查阅 commit 的 次数？

在项目的根目录中执行以下命令：
```
git shortlog -s -n -e
```
### 如何 combine 作者？
在项目的 根目录 创建一个文件 `.mailmap`.
文件内容示例:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
``` 
关于这个文件格式的 详情 可以 参考 [这里](https://git-scm.com/docs/gitmailmap).

### 如何从 git 导出数据？

#### 供网上浏览
在项目的根目录执行：
```
git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" > log.txt
```
#### 在没有互联网的情况下观看

```
git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" | sed -e 's/\\/\\\\/g' | sed -e 's/`/"/g' | sed -e 's/^/report.push(\`/g' | sed 's/$/\`\);/g' | sed 's/\$/_/g' > log.txt
```
Git会创建一个文件 `log.txt`.
这个文件包含了构建报告的数据。 

字符串格式的区别在于它们具有的包装。无网络格式将会像您只是简单地打开了js文件一样被加载。 `/build/index.html`

### 如何在线查看报告？

- 切换到 [网站](https://assayo.online/)
- 按下按钮 “[示范](https://assayo.online/demo?lang=ru)”
- 拖放文件 `log.txt` 在浏览器窗口中

### 如何在没有网络环境下查看报告？
- 下载这个存储库
- 拖放文件 `log.txt` 到文件夹 `/build`
- 要运行 `/build/index.html`
- 或是拖放文件夹 `/build` 到我的仓库 (它所在的地方 `log.txt`). 可以改变名称。比如，从名称 `/build` 到名称 `/report`

重要的事情是，必须让log.txt这个文件是通过命令创建出来的，这样它就可以在没有网的时候查看了。

### 如何重打包报告文件？
- 下载这个储存库
- 要执行 `npm install`
- 要执行 `npm run build:local`
- 最新的构建将在文件夹 `/build`

### 如何查看微服务组的报告？
- 为每个微服务生成文件 `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt` 等等)
- 参见“如何在有网络环境下查看报告”。在最后一步，将所有文件同时拖入浏览器窗口。
- 参见“如何在没有网络环境下查看报告”。第二步将所有微服务文件拖动到 (`log-1.txt`, `log-2.txt`, `log-3.txt` 等等) 到报表文件夹 (`/build`).

### 如何将界面重新配色为公司专有颜色？
您可以为界面创建自己的主题。可以修改：
- **标题**. 你可以在网址参数中指定它 ```title```. 例如: ```?title=You Company```
- **CSS样式**. 为了做到这一点，你需要准备一个CSS文件并在网址参数中指明其地址 ```theme```. 例如: ```?theme=//company.com/some.css```. 你可以使用类名作为选择器。大多数情况下，他们在新版本发布时不会发生变化。
- **语言**. 你可以把它放在网址的参数中。 ```lang```. 例如: ```?lang=es```

### 如何签署提交？

遵循实践 [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). 例如:
```
JIRA-1234 feat(profile): Added avatar for user 
```
- 任务号 `(JIRA-1234)`
- 工作类别 `(feat, fix, style, refactor, test, doc 等等)`
- 工作领域 `(profile - 地盘组, 网页 或新功能, 一句话)`
- 职位描述 `(Added avatar for user)`
### How to add checking for commit message?
####  Use file `commit-msg`
1. Create file `commit-msg` in folder `.git/hooks/`
2. Add this text in file:
```
#!/usr/bin/env bash
if ! grep -iqE "(JIRA-[0-9]{1,5})(\s)(feat|fix|docs|style|refactor|test|chore)((\([a-z0-9_-]{1,}\)){0,})(:\s)([a-z]{1,})" "$1"; then
   echo "Need commit message like: JIRA-12 fix(profile): some text. Read Semantic Commit Messages" >&2
   exit 1
fi
```
####  Use package [pre-commit](https://www.npmjs.com/package/pre-commit)
1. Add in file `package.json` property `commit-msg`:
```
  ...
  "commit-msg": {
    "regex": "(JIRA-[0-9]{1,5})(\\s)(feat|fix|docs|style|refactor|test|chore)((\\([a-z0-9_-]{1,}\\)){0,})(:\\s)([a-z]{1,})",
    "error-message": "Need commit message like: JIRA-12 fix(profile): some text Read Semantic Commit Messages"
  },
  ...
```
2. Run command `npm install pre-commit`

### 如何自动化数据采集？

#### With backend
- use module [Assayo Crawler](https://github.com/bakhirev/assayo-crawler);

#### 没有后端
- 克隆您的仓库;
- 复制文件夹 `build` 从当前仓库;
- 打开 `build/index.html` 在浏览器中添加书签;
- 添加一个快捷方式 `build/assets/ci-cd.sh` 自动启动文件夹 (Windows);

每次重启计算机，该脚本将更新统计数据，这些数据自动添加到主分支中。

### DevOps (CI/CD)

#### 公共服务器

您可以将数据构建报告文件发布到公共URL，可以使用网站来显示它。 [assayo](https://assayo.online/). 指定数据所在的地址作为URL参数 ```dump```:
```
https://assayo.online/demo/?dump=//you_site.com/some/log.txt
```

#### 专用服务器
- 下载 [docker镜像](https://hub.docker.com/r/bakhirev/assayo);
- 在本地网络中运行它;
- 使用web界面查看报告，并指定数据所在地址作为URL参数 ```dump```:
```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - assayo容器的URL地址，它监听80端口;
you_url    - git日志的容器的URL地址;
```

默认情况下，镜像会被启动在地址 ```http://127.0.0.1:80/```. 如果没有成功，请检查你的80端口是否可用.
#### Docker 图像更新

- 运行命令 ```npm run build:docker```
- 运行命令 ```docker build -t assayo .```
- 检查结果 ```docker run --name assayo -p 80:80 -d assayo```;
- 运行命令 ```docker tag assayo bakhirev/assayo:latest```;
- 提交容器映像到 Docker Hub ```docker push bakhirev/assayo:latest```;

### ️ About application

#### Architecture
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](https://github.com/bakhirev/assayo-showcase) displays a list of available reports. Each report consists of a title, description, and a list of repositories.
2. [Crawler service](https://github.com/bakhirev/assayo-crawler) collects repository logs for the report.
3. [Log visualization UI](https://github.com/bakhirev/assayo) **(you here)** displays report. Needs a log file for work.

#### 释出版本大约每半年一次。接下来发生什么情况：

看 [主要文件](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

#### 如何添加或编辑翻译？

您可以在“翻译”部分添加新翻译或更正当前翻译。 ```ts/translations/```.
[指示手册](https://github.com/firstcontributions/first-contributions)

#### 愿望，建议，意见
- telegramm [@bakhirev](https://t.me/bakhirev) (优先通信方法)
- [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- 网站 [https://assayo.online/](https://assayo.online/?ref=github&lang=zh)

