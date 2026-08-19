
> [English](https://github.com/bakhirev/assayo) | [Español](https://github.com/bakhirev/assayo/blob/main/documents/ES.md) | [Français](https://github.com/bakhirev/assayo/blob/main/documents/FR.md) | [Português](https://github.com/bakhirev/assayo/blob/main/documents/PT.md) | [Deutsch](https://github.com/bakhirev/assayo/blob/main/documents/DE.md) | __[中文](https://github.com/bakhirev/assayo/blob/main/documents/ZH.md)__ | [日本語](https://github.com/bakhirev/assayo/blob/main/documents/JA.md) | [한국어](https://github.com/bakhirev/assayo/blob/main/documents/KO.md) | [العربية](https://github.com/bakhirev/assayo/blob/main/documents/AR.md) | [हिन्दी](https://github.com/bakhirev/assayo/blob/main/documents/HI.md) | [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

# [Assayo](https://bakhirev.github.io/?ref=github&lang=zh)
创建HTML报告以分析提交的统计数据：
- 工作节奏和加班时间数量；
- 责任区域、功能数量和错误；
- 同事的工作风格；
- 员工流动率和团队构成；
- 开发人员的位置；
- 发布日程和假期日程；
- 功能和项目整体的成本；
- 需要重构的地方、已删除的文件等。

**链接：** [demo](https://bakhirev.github.io/demo/?ref=github&dump=./test.txt), [online version](https://bakhirev.github.io/demo/?ref=github), [docker](https://hub.docker.com/r/bakhirev/assayo), [reddit](https://www.reddit.com/r/ITManagers/comments/1e5k291/the_visualization_and_analysis_of_git_commit/), [habr](https://habr.com/ru/articles/852782/)

**视频：** [english](https://www.youtube.com/watch?v=uMbhrrd25t4), [español](https://www.youtube.com/watch?v=skmctb_2rZ0), [русский](https://www.youtube.com/watch?v=jwCp_-bhrCQ)

<a href="https://bakhirev.github.io/demo/?ref=github&dump=./test.txt" target="_blank"><img src="https://bakhirev.github.io/assets/images/index.gif" width="100%" /></a>

<a name="link-0"></a>
### 目录
- [提交统计报告](#link-1)
  - [如何创建和查看报告？](#link-2)
    - [使用公共服务器](#link-3)
    - [使用NodeJS库](#link-4)
    - [使用PHP库](#link-5)
    - [使用Python库](#link-6)
    - [使用Ruby库](#link-7)
    - [使用Go库](#link-8)
    - [使用源代码](#link-9)
    - [使用GitHub动作](#link-10)
    - [使用私有服务器](#link-11)
  - [如何连接作者？](#link-12)
  - [如何将Git数据导出到txt文件？](#link-13)
    - [在线查看](#link-14)
    - [离线查看](#link-15)
    - [如果您在Windows上使用PowerShell](#link-16)
  - [如何查看微服务组的报告？](#link-17)


- [项目中的最佳实践](#link-18)
  - [如何签名提交？](#link-19)
  - [如何为提交消息添加检查？](#link-20)
    - [使用文件commit-msg](#link-21)
    - [使用包pre-commit](#link-22)


- [关于此应用程序](#link-23)
  - [如何定制界面？](#link-24)
  - [如何从源代码重新构建HTML报告？](#link-25)
  - [如何添加或编辑翻译？](#link-26)
  - [配置](#link-31)
  - [架构](#link-27)
    - [微服务的总体架构](#link-29)
  - [反馈，评论](#link-30)

<a name="link-1"></a>
##  提交统计报告

<a name="link-2"></a>
### 📈 如何创建和查看报告？

<a name="link-3"></a>
#### 使用公共服务器
- 访问[网站](https://bakhirev.github.io/)
- 按照说明

<a name="link-4"></a>
#### 使用NodeJS库
- 执行`npx assayo`
- 打开`./assayo/index.html`

<a name="link-5"></a>
#### 使用PHP库
- 执行`composer require bakhirev/assayo`
- 执行`vendor/bin/assayo`
- 打开`./assayo/index.html`

<a name="link-6"></a>
#### 使用Python库
- 执行`pipx install assayo`
- 执行`assayo`
- 打开`./assayo/index.html`

<a name="link-7"></a>
#### 使用Ruby库
- 执行`gem install assayo`
- 执行`assayo`
- 打开`./assayo/index.html`

<a name="link-8"></a>
#### 使用Go库
- 执行`go get github.com/bakhirev/assayo`
- 执行`go install github.com/bakhirev/assayo`
- 执行`assayo`
- 打开`./assayo/index.html`

<a name="link-9"></a>
#### 使用源代码
- 下载此存储库
- 将文件`log.txt`放在`/build`中
- 打开`/build/index.html`
- 或将文件夹`/build`放在您的存储库中（`log.txt`所在的位置）。您可以更改名称。例如，从`/build`更改为`/report`。

在这种情况下，重要的是文件`log.txt`通过命令生成以进行离线查看。

<a name="link-10"></a>
####  使用GitHub动作
在文件夹`.github/workflows/`中添加[脚本](https://github.com/bakhirev/assayo/blob/main/documents/ActionExample.yml)或使用市场上的此[动作](https://github.com/marketplace/actions/assayo)。一个准备好的和更新的报告将保存在artifact中。

<a name="link-11"></a>
#### 使用私有服务器
- 下载[docker](https://hub.docker.com/r/bakhirev/assayo)镜像；
- 在本地网络中运行；
- 使用Web界面查看报告，在URL参数中设置数据URL`dump`：

```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - 容器assayo的URL，监听端口80；
you_url    - Git日志的容器URL；
```
默认情况下，镜像将在`http://127.0.0.1:80/`中运行。如果不起作用，请检查端口80是否可用。

<a name="link-12"></a>
### ‍🎭 如何连接作者？
在项目的根目录中，您需要创建一个文件`.mailmap`。

文件内容示例：
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
```
了解有关此文件格式的更多信息[这里](https://git-scm.com/docs/gitmailmap)。

<a name="link-13"></a>
### 📤 如何将Git数据导出到txt文件？

<a name="link-14"></a>
####  在线查看
在项目的根目录中执行：
```
git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" > log.txt
```

<a name="link-15"></a>
####  离线查看
```
git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" | sed -e 's/\\/\\\\/g' | sed -e 's/`/"/g' | sed -e 's/\$/S/g' | sed -e '1s/^/R(f\`/' | sed -e '$s/$/\`\);/' > log.txt
```

Git将创建一个文件`log.txt`。此文件包含显示报告的数据。在线和离线格式之间的区别是字符串的包装。离线格式将作为文件`js`加载，如果您只打开`/build/index.html`

<a name="link-16"></a>
#### 如果您在Windows上使用PowerShell
默认情况下，输出编码可能不符合UTF-8，并且生成的日志文件将无法读取。在保存日志之前，您可以使用命令更改编码。
```
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```
或者打开保存的文件并手动将编码更改为UTF-8。

<a name="link-17"></a>
### 🗃️ 如何查看微服务组的报告？
- 为每个微服务文件`log.txt`（`log-1.txt`, `log-2.txt`, `log-3.txt`等）生成。您可以手动执行，或者使用[Assayo Crawler](https://github.com/bakhirev/assayo-crawler)模块进行自动日志收集；
- 查看“如何查看在线报告？”。在最后一步，将所有文件一次性拖放到浏览器窗口中。
- 查看“如何查看离线报告？”。在第二步，将所有微服务文件（`log-1.txt`, `log-2.txt`, `log-3.txt`等）拖放到报告文件夹(`/build`)中。

<a name="link-18"></a>
## 项目中的最佳实践

<a name="link-19"></a>
### 📝 如何签名提交？
遵循[Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)。示例：
```
JIRA-1234 feat(profile): Added avatar for user
```
- 任务跟踪器中的任务编号`(JIRA-1234)`
- 工作类型`(feat, fix, style, refactor, test, doc等)`
- 功能`(profile - 网站上的新页面或新功能，使用一个（两个）短词或缩写)`
- 解决了什么问题`(Added avatar for user)`

<a name="link-20"></a>
### 👮 如何为提交消息添加检查？

<a name="link-21"></a>
####  使用文件commit-msg
1. 在文件夹.git/hooks/中创建文件`commit-msg`
2. 在文件中添加此文本：
```
#!/usr/bin/env bash
if ! grep -iqE "(JIRA-[0-9]{1,5})(s)(feat|fix|docs|style|refactor|test|chore)((([a-z0-9_-]{1,})){0,})(:s)([a-z]{1,})" "$1"; then
   echo "Need commit message like: JIRA-12 fix(profile): some text. Read Semantic Commit Messages" >&2
   exit 1
fi
```

<a name="link-22"></a>
#### 使用包[pre-commit](https://www.npmjs.com/package/pre-commit)
1. 在文件`package.json`中添加属性`commit-msg`：
```
...
"commit-msg": {
  "regex": "(JIRA-[0-9]{1,5})(\s)(feat|fix|docs|style|refactor|test|chore)((\([a-z0-9_-]{1,}\)){0,})(:\s)([a-z]{1,})",
    "error-message": "Need commit message like: JIRA-12 fix(profile): some text Read Semantic Commit Messages"
},
...
```
2. 运行命令`npm install pre-commit`

<a name="link-23"></a>
##  关于此应用程序

<a name="link-25"></a>
### 🛠️ 如何从源代码重新构建HTML报告？
- 下载此存储库`git clone https://github.com/bakhirev/assayo.git`
- 执行`npm install`
- 执行`npm run build:local`
- 新的HTML构建将在`/build`文件夹中

<a name="link-24"></a>
### 🎨 如何定制界面？
您可以为报告编写自己的主题。**示例：** [demo](https://bakhirev.github.io/demo/themes/)

<a name="link-26"></a>
### 🈯 如何添加或编辑翻译？
您可以在`**/translations/**`文件夹中添加新翻译或更正现有翻译。
[指南](https://github.com/firstcontributions/first-contributions)

<a name="link-31"></a>
### ⚙️ 配置

可以通过配置文件自定义应用程序。您可以在页面 URL 中指定实际使用的配置文件。例如：

```
./assayo/index.html?config=you_custom_config.json
```

#### 参数

| 代码 | 类型 | 默认值 | 说明 |
|-|-|-|-|
| title | string | | 浏览器标签页名称（`document.title`） |
| logo | string | `"./assets/logo.svg"` | 徽标路径 |
| language | string | | 界面语言 |
| languages | object[] | | 可用语言 |
| languages[].id | string | | 语言 ID |
| languages[].currency | string | | 货币 |
| languages[].title | string | | 界面中的语言名称（右上角） |
| urlForCss | string | | 用于覆盖样式的 CSS 文件路径。您可以创建自己的视觉主题。示例：[demo](https://bakhirev.github.io/demo/themes/) |
| urlForGitLog | string | `"./log.txt"` | GIT 日志文件路径 |
| prefixForTask | string | `"https://jira.com/secure/RapidBoard.jspa?task="` | 任务链接前缀 |
| prefixForPR | string | `"https://bitbucket.com/projects/assayo/repos/frontend/pull-requests/"` | Pull Request 链接前缀 |
| middleSalaryInMonth | number | 3000 | 月平均工资（美元） |
| workDays | boolean[] | `[true, true, true, true, true, false, false]` | 哪些天视为“工作日”，其中 0 为星期一，6 为星期日 |
| currency | string | `"RUB"` | 当前货币 |
| exchangeRate | object<string, number> | `{ USD: 1, EUR: 0.9, RUB: 82, CNY: 7, JPY: 160, KRW: 1500, CAD: 1.4, INR: 92, ILS: 3.1, AED: 3.6}` | 汇率，格式为“键: 值”，相对于美元。示例：`{example}` |
| permissions | string[] | [] | 可用权限数组 |
| disabledPermissions | string[] | [] | 不可用权限数组 |
| plugins | string[] | [] | 已启用插件数组 |
| disabledPlugins | string[] | [] | 已禁用插件数组 |

#### URL 参数

有些参数比其他参数更常用。因此可以在 URL 中设置，无需配置文件。

| 代码 | 说明 | 示例 |
|-|-|-|
| title | 浏览器标签页名称（`document.title`） | `?title=Company_Name` |
| lang | 界面语言 | `?lang=es` |
| theme | 用于覆盖样式的 CSS 文件路径。您可以创建自己的视觉主题。示例：[demo](https://bakhirev.github.io/demo/themes/) | `?theme=//company.com/some.css` |

#### 默认配置文件

参见 `src\ts\helpers\ApplicationConfig\getDefaultConfig.ts`

#### 配置文件示例
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
### 📐 架构

<a name="link-29"></a>
#### 微服务的总体架构
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](https://github.com/bakhirev/assayo-showcase)显示可用报告列表。每个报告包括标题、描述和存储库列表。
2. [Crawler service](https://github.com/bakhirev/assayo-crawler)为报告收集存储库日志。
3. [Log visualization UI](https://github.com/bakhirev/assayo)（**您在这里**）显示报告。需要日志文件才能工作。

<a name="link-30"></a>
### 📧 反馈，评论
- 📱 [https://t.me/bakhirev](https://t.me/bakhirev) (优先通信方法)
- 📧 [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- 🌐 [https://bakhirev.github.io/](https://bakhirev.github.io/?ref=github&lang=zh)

