
> [English](https://github.com/bakhirev/assayo) | [Español](https://github.com/bakhirev/assayo/blob/main/documents/ES.md) | [Français](https://github.com/bakhirev/assayo/blob/main/documents/FR.md) | [Português](https://github.com/bakhirev/assayo/blob/main/documents/PT.md) | [Deutsch](https://github.com/bakhirev/assayo/blob/main/documents/DE.md) | [中文](https://github.com/bakhirev/assayo/blob/main/documents/ZH.md) | [日本語](https://github.com/bakhirev/assayo/blob/main/documents/JA.md) | __[한국어](https://github.com/bakhirev/assayo/blob/main/documents/KO.md)__ | [العربية](https://github.com/bakhirev/assayo/blob/main/documents/AR.md) | [हिन्दी](https://github.com/bakhirev/assayo/blob/main/documents/HI.md) | [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

# [Assayo](https://bakhirev.github.io/?ref=github&lang=ko)
커밋 통계 보고서. 이 보고서는 다음에 대한 분석을 포함합니다:
- 작업 속도와 초과 근무 시간 수;
- 책임 영역, 기능 및 버그 수;
- 동료들의 업무 스타일;
- 직원 이직률과 팀 구성;
- 개발자 위치;
- 릴리스 일정 및 휴가 캘린더;
- 기능 및 프로젝트 전체 비용;
- 리팩터링이 필요한 위치, 삭제된 파일 등.

**링크:** [demo](https://bakhirev.github.io/demo/?ref=github&dump=./test.txt), [online version](https://bakhirev.github.io/demo/?ref=github), [docker](https://hub.docker.com/r/bakhirev/assayo), [reddit](https://www.reddit.com/r/ITManagers/comments/1e5k291/the_visualization_and_analysis_of_git_commit/), [habr](https://habr.com/ru/articles/852782/)

**비디오:** [english](https://www.youtube.com/watch?v=uMbhrrd25t4), [español](https://www.youtube.com/watch?v=skmctb_2rZ0), [русский](https://www.youtube.com/watch?v=jwCp_-bhrCQ)

<a href="https://bakhirev.github.io/demo/?ref=github&dump=./test.txt" target="_blank"><img src="https://bakhirev.github.io/assets/images/index.gif" width="100%" /></a>

<a name="link-0"></a>
### 목차
- [커밋 통계 보고서](#link-1)
  - [보고서를 생성하고 보는 방법은?](#link-2)
    - [공용 서버 사용](#link-3)
    - [NodeJS 라이브러리 사용](#link-4)
    - [PHP 라이브러리 사용](#link-5)
    - [Python 라이브러리 사용](#link-6)
    - [Ruby 라이브러리 사용](#link-7)
    - [Go 라이브러리 사용](#link-8)
    - [소스 코드 사용](#link-9)
    - [GitHub Actions 사용](#link-10)
    - [개인 서버 사용](#link-11)
  - [작성자를 병합하는 방법은?](#link-12)
  - [git에서 txt 파일로 데이터를 내보내는 방법은?](#link-13)
    - [온라인 보기용](#link-14)
    - [오프라인 보기용](#link-15)
    - [Windows에서 PowerShell을 사용하는 경우](#link-16)
  - [마이크로서비스 그룹에 대한 보고서를 보는 방법은?](#link-17)


- [프로젝트의 모범 사례](#link-18)
  - [커밋에 서명하는 방법은?](#link-19)
  - [커밋 메시지 검사 추가 방법은?](#link-20)
    - [파일 commit-msg 사용](#link-21)
    - [패키지 pre-commit 사용](#link-22)


- [이 앱에 대하여](#link-23)
  - [인터페이스 브랜딩 방법은?](#link-24)
  - [소스 코드에서 HTML 보고서를 다시 빌드하는 방법은?](#link-25)
  - [번역을 추가하거나 편집하는 방법은?](#link-26)
  - [아키텍처](#link-27)
    - [마이크로서비스의 일반 아키텍처](#link-29)
  - [피드백, 의견](#link-30)

<a name="link-1"></a>
##  커밋 통계 보고서

<a name="link-2"></a>
### 📈 보고서를 생성하고 보는 방법은?

<a name="link-3"></a>
#### 공용 서버 사용
- [웹사이트](https://bakhirev.github.io/)로 이동
- 안내를 따르세요

<a name="link-4"></a>
#### NodeJS 라이브러리 사용
- `npx assayo` 실행
- `./assayo/index.html` 열기

<a name="link-5"></a>
#### PHP 라이브러리 사용
- `composer require bakhirev/assayo` 실행
- `vendor/bin/assayo` 실행
- `./assayo/index.html` 열기

<a name="link-6"></a>
#### Python 라이브러리 사용
- `pipx install assayo` 실행
- `assayo` 실행
- `./assayo/index.html` 열기

<a name="link-7"></a>
#### Ruby 라이브러리 사용
- `gem install assayo` 실행
- `assayo` 실행
- `./assayo/index.html` 열기

<a name="link-8"></a>
#### Go 라이브러리 사용
- `go get github.com/bakhirev/assayo` 실행
- `go install github.com/bakhirev/assayo` 실행
- `assayo` 실행
- `./assayo/index.html` 열기

<a name="link-9"></a>
#### 소스 코드 사용
- 이 저장소 다운로드
- `log.txt` 파일을 `/build` 폴더에 넣기
- `/build/index.html` 열기
- 또는 `/build` 폴더를 `log.txt`이 있는 저장소에 넣기. 이름을 변경할 수 있습니다. 예: `/build` → `/report`.

이 경우 오프라인 보기를 위한 명령으로 `log.txt` 파일이 생성되는 것이 중요합니다.

<a name="link-10"></a>
####  GitHub Actions 사용
`.github/workflows/` 폴더에 [script](https://github.com/bakhirev/assayo/blob/main/documents/ActionExample.yml) 추가 또는 마켓플레이스의 이 [action](https://github.com/marketplace/actions/assayo) 사용. 최신 보고서는 아티팩트에 저장됩니다.

<a name="link-11"></a>
#### 개인 서버 사용
- [docker 이미지](https://hub.docker.com/r/bakhirev/assayo) 다운로드;
- 로컬 네트워크에서 실행;
- 웹 인터페이스를 사용해 보고서를 보고 URL 매개변수 `dump`에 데이터 URL 설정:

```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - assayo 컨테이너의 URL, 포트 80에서 수신;
you_url    - git 로그가 있는 컨테이너의 URL;
```
기본적으로 이미지는 `http://127.0.0.1:80/`에서 실행됩니다. 작동하지 않으면 포트 `80`가 사용 중인지 확인하세요.

<a name="link-12"></a>
### ‍🎭 작성자를 병합하는 방법은?
프로젝트 루트 디렉터리에 `.mailmap` 파일을 생성해야 합니다.

파일 내용 예:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
```
이 파일 형식에 대한 자세한 내용은 [여기](https://git-scm.com/docs/gitmailmap)에서 확인할 수 있습니다.

<a name="link-13"></a>
### 📤 git에서 txt 파일로 데이터를 내보내는 방법은?

<a name="link-14"></a>
####  온라인 보기용
프로젝트 루트 디렉터리에서 실행:

<a name="link-15"></a>
####  오프라인 보기용
Git은 `log.txt` 파일을 생성합니다. 이 파일에는 보고서를 표시하기 위한 데이터가 포함됩니다. 온라인 형식과 오프라인 형식의 차이점은 문자열 래퍼의 존재 여부입니다. 오프라인 형식은 `/build/index.html`를 열면 `js` 파일처럼 로드됩니다.

<a name="link-16"></a>
#### Windows에서 PowerShell을 사용하는 경우
기본 출력 인코딩이 UTF-8과 일치하지 않아 로그 파일을 읽을 수 없을 수 있습니다. 로그를 저장하기 전에 명령으로 인코딩을 변경할 수 있습니다.
```
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```
또는 저장된 파일을 열어 수동으로 UTF-8로 인코딩을 변경하세요.

<a name="link-17"></a>
### 🗃️ 마이크로서비스 그룹에 대한 보고서를 보는 방법은?
- 각 마이크로서비스에 대해 `log.txt` 파일 (`log-1.txt`, `log-2.txt`, `log-3.txt` 등)을 생성하세요. 수동으로 할 수도 있고, 자동 로그 수집을 위한 [Assayo Crawler](https://github.com/bakhirev/assayo-crawler) 모듈을 사용할 수도 있습니다;
- “온라인 보고서 보기”를 참조하세요. 마지막 단계에서 모든 파일을 한 번에 브라우저 창으로 드래그하세요.
- “오프라인 보고서 보기”를 참조하세요. 두 번째 단계에서 모든 마이크로서비스 파일 (`log-1.txt`, `log-2.txt`, `log-3.txt` 등)을 보고서 폴더 (`/build`)로 드래그하세요.

<a name="link-18"></a>
## 프로젝트의 모범 사례

<a name="link-19"></a>
### 📝 커밋에 서명하는 방법은?
[Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)을 따르세요. 예:
```
JIRA-1234 feat(profile): Added avatar for user
```
- 작업 추적기의 작업 번호 `(JIRA-1234)`
- 작업 유형 `(feat, fix, style, refactor, test, doc 등)`
- 기능 `(profile - 사이트의 새 페이지 또는 새 기능, 한두 단어 또는 약어 사용)`
- 해결된 문제 `(Added avatar for user)`

<a name="link-20"></a>
### 👮 커밋 메시지 검사 추가 방법은?

<a name="link-21"></a>
####  파일 commit-msg 사용
1. `.git/hooks/` 폴더에 `commit-msg` 파일 생성
2. 파일에 다음 텍스트 추가:
```
#!/usr/bin/env bash
if ! grep -iqE "(JIRA-[0-9]{1,5})(s)(feat|fix|docs|style|refactor|test|chore)((([a-z0-9_-]{1,})){0,})(:s)([a-z]{1,})" "$1"; then
   echo "Need commit message like: JIRA-12 fix(profile): some text. Read Semantic Commit Messages" >&2
   exit 1
fi
```

<a name="link-22"></a>
#### 패키지 [pre-commit](https://www.npmjs.com/package/pre-commit) 사용
1. `package.json` 파일에 `commit-msg` 속성 추가:
```
...
"commit-msg": {
  "regex": "(JIRA-[0-9]{1,5})(\s)(feat|fix|docs|style|refactor|test|chore)((\([a-z0-9_-]{1,}\)){0,})(:\s)([a-z]{1,})",
    "error-message": "Need commit message like: JIRA-12 fix(profile): some text Read Semantic Commit Messages"
},
...
```
2. `npm install pre-commit` 명령 실행

<a name="link-23"></a>
##  이 앱에 대하여

<a name="link-24"></a>
### 🎨 인터페이스 브랜딩 방법은?
자신만의 인터페이스 테마를 만들 수 있습니다. 옵션:
- **제목**. URL 매개변수 `title`에서 기본 문서 제목을 설정할 수 있습니다. 예: `?title=You Company`
- **시각적 테마**. 새 스타일이 있는 CSS 파일을 준비하고 `theme` 매개변수에 URL을 지정해야 합니다. 예: `?theme=//company.com/some.css`. 대부분의 클래스 이름은 새 버전에서도 변경되지 않습니다.
- **언어**. URL 매개변수 `lang`에서 언어를 설정할 수 있습니다. 예: `?lang=es`

**예:** [데모](https://bakhirev.github.io/demo/themes/)

<a name="link-25"></a>
### 🛠️ 소스 코드에서 HTML 보고서를 다시 빌드하는 방법은?
- 이 저장소 `git clone https://github.com/bakhirev/assayo.git` 다운로드
- `npm install` 실행
- `npm run build:local` 실행
- 새 HTML 빌드는 `/build` 폴더에 생성됩니다.

<a name="link-26"></a>
### 🈯 번역을 추가하거나 편집하는 방법은?
`ts/translations/` 폴더에서 새 번역을 추가하거나 기존 번역을 수정할 수 있습니다.
[안내](https://github.com/firstcontributions/first-contributions)

<a name="link-27"></a>
### 📐 아키텍처

<a name="link-29"></a>
#### 마이크로서비스의 일반 아키텍처
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](https://github.com/bakhirev/assayo-showcase)는 사용 가능한 보고서 목록을 표시합니다. 각 보고서는 제목, 설명 및 저장소 목록으로 구성됩니다.
2. [Crawler service](https://github.com/bakhirev/assayo-crawler)는 보고서를 위한 저장소 로그를 수집합니다.
3. [Log visualization UI](https://github.com/bakhirev/assayo) **(현재 위치)** 는 보고서를 표시합니다. 작동하려면 로그 파일이 필요합니다.

<a name="link-30"></a>
### 📧 피드백, 의견
- 📱 [https://t.me/bakhirev](https://t.me/bakhirev) (우선적인 커뮤니케이션 방법)
- 📧 [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- 🌐 [https://bakhirev.github.io/](https://bakhirev.github.io/?ref=github&lang=ko)

