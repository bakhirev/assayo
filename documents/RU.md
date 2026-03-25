
> [English](https://github.com/bakhirev/assayo) | [Español](https://github.com/bakhirev/assayo/blob/main/documents/ES.md) | [Français](https://github.com/bakhirev/assayo/blob/main/documents/FR.md) | [Português](https://github.com/bakhirev/assayo/blob/main/documents/PT.md) | [Deutsch](https://github.com/bakhirev/assayo/blob/main/documents/DE.md) | [中文](https://github.com/bakhirev/assayo/blob/main/documents/ZH.md) | [日本語](https://github.com/bakhirev/assayo/blob/main/documents/JA.md) | [한국어](https://github.com/bakhirev/assayo/blob/main/documents/KO.md) | [العربية](https://github.com/bakhirev/assayo/blob/main/documents/AR.md) | [हिन्दी](https://github.com/bakhirev/assayo/blob/main/documents/HI.md) | __[Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)__

# [Assayo](https://bakhirev.github.io/?ref=github&lang=ru)
Создаёт HTML-отчёт с анализом статистики коммитов:
- текучка кадров и состав команд;
- местоположение разработчиков;
- график релизов и отпусков;
- темп работы и количество переработок;
- зоны ответственности, объем фичей и багов;
- стоимость фичей и проекта в целом;
- стиль работы коллег;
- места для рефакторинга, удалённые файлы и т.п.

**Ссылки:** [demo](https://bakhirev.github.io/demo/?ref=github&dump=./test.txt), [online version](https://bakhirev.github.io/demo/?ref=github), [docker](https://hub.docker.com/r/bakhirev/assayo), [reddit](https://www.reddit.com/r/ITManagers/comments/1e5k291/the_visualization_and_analysis_of_git_commit/), [habr](https://habr.com/ru/articles/852782/)

**Видео:** [english](https://www.youtube.com/watch?v=uMbhrrd25t4), [español](https://www.youtube.com/watch?v=skmctb_2rZ0), [русский](https://www.youtube.com/watch?v=jwCp_-bhrCQ)

<a href="https://bakhirev.github.io/demo/?ref=github&dump=./test.txt" target="_blank"><img src="https://bakhirev.github.io/assets/images/index.gif" width="100%" /></a>

<a name="link-0"></a>
### Содержание
- [ОТЧЁТ ПО СТАТИСТИКЕ КОММИТОВ](#link-1)
  - [Как создать и посмотреть отчёт?](#link-2)
    - [Через публичный сервер](#link-3)
    - [Используя библиотеку NodeJS](#link-4)
    - [Используя библиотеку PHP](#link-5)
    - [Используя библиотеку Python](#link-6)
    - [Используя библиотеку Ruby](#link-7)
    - [Используя библиотеку Go](#link-8)
    - [Без установки библиотек](#link-9)
    - [Через github actions](#link-10)
    - [С помощью приватного сервера](#link-11)
  - [Как объединить авторов коммитов в отчёте?](#link-12)
  - [Как выгрузить данные из git в txt файл?](#link-13)
    - [Для онлайн просмотра](#link-14)
    - [Для офлайн просмотра](#link-15)
    - [Если вы используете PowerShell в Windows](#link-16)
  - [Как посмотреть отчёт по группе микросервисов?](#link-17)


- [ЕЖЕДНЕВНЫЕ ПРАКТИКИ В ПРОЕКТЕ](#link-18)
  - [Как подписывать коммиты?](#link-19)
  - [Как добавить автоматическую проверку подписи коммита?](#link-20)
    - [Используя файл commit-msg](#link-21)
    - [Используя пакет pre-commit](#link-22)


- [ОБ ЭТОМ ПРИЛОЖЕНИИ](#link-23)
  - [Как брендировать отчёт?](#link-24)
  - [Как пересобрать файл отчёта из исходного кода?](#link-25)
  - [Как добавить или отредактировать перевод?](#link-26)
  - [Архитектура](#link-27)
    - [Общая архитектура микросервисов](#link-29)
  - [Пожелания, предложения, замечания](#link-30)

<a name="link-1"></a>
##  ОТЧЁТ ПО СТАТИСТИКЕ КОММИТОВ

<a name="link-2"></a>
### 📈 Как создать и посмотреть отчёт?

<a name="link-3"></a>
#### Через публичный сервер
- перейдите на [сайт](https://bakhirev.github.io/)
- следуйте инструкциям

<a name="link-4"></a>
#### Используя библиотеку NodeJS
- выполнить `npx assayo`
- открыть `./assayo/index.html`

<a name="link-5"></a>
#### Используя библиотеку PHP
- выполнить `composer require bakhirev/assayo`
- выполнить `vendor/bin/assayo`
- открыть `./assayo/index.html`

<a name="link-6"></a>
#### Используя библиотеку Python
- выполнить `pipx install assayo`
- выполнить `assayo`
- открыть `./assayo/index.html`

<a name="link-7"></a>
#### Используя библиотеку Ruby
- выполнить `gem install assayo`
- выполнить `assayo`
- открыть `./assayo/index.html`

<a name="link-8"></a>
#### Используя библиотеку Go
- выполнить `go get github.com/bakhirev/assayo`
- выполнить `go install github.com/bakhirev/assayo`
- выполнить `assayo`
- открыть `./assayo/index.html`

<a name="link-9"></a>
#### Без установки библиотек
- скачать этот репозиторий
- перетащить файл `log.txt` в папку `/build`
- открыть `/build/index.html`
- или перетащить папку `/build` к себе в репозиторий (туда, где лежит `log.txt`). Можно сменить название. Например с `/build` на `/report`

В этом случае важно, чтобы файл `log.txt` был сгенерирован командой для офлайн просмотра.

<a name="link-10"></a>
####  Через github actions
Добавьте [скрипт](https://github.com/bakhirev/assayo/blob/main/documents/ActionExample.yml) в папку `.github/workflows/` или используйте этот [action](https://github.com/marketplace/actions/assayo) из официального магазина. Готовый свежий отчёт по проекту будет лежать в артефактах.

<a name="link-11"></a>
#### С помощью приватного сервера
- скачайте [docker образ](https://hub.docker.com/r/bakhirev/assayo);
- поднимите его в локальной сети;
- для просмотра отчётов используйте веб-интерфейс указывая ему адресс, где лежат данные, в URL-параметре `dump`:

```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - URL адресс контейнера assayo, он слушает 80 порт;
you_url    - URL адресс вашего контейнера с логами git;
```
По умолчанию образ запустится по адресу `http://127.0.0.1:80/` Если не получилось проверьте свободен ли у вас `80` порт.

<a name="link-12"></a>
### ‍🎭 Как объединить авторов коммитов в отчёте?
В корневой директории вашего проекта нужно создать файл `.mailmap`

Пример содержания файла:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
```
Подробнее про формат этого файла можно прочитать [тут](https://git-scm.com/docs/gitmailmap).

<a name="link-13"></a>
### 📤 Как выгрузить данные из git в txt файл?

<a name="link-14"></a>
####  Для онлайн просмотра
В корневой директории вашего проекта выполнить:

<a name="link-15"></a>
####  Для офлайн просмотра
Git создаст файл `log.txt`. Он содержит данные для построения отчёта. Разница между онлайн и офлайн форматом в наличие обёртки для строк. Оффлайн формат будет подтягиваться, как `js` файл если вы просто открыли `/build/index.html`

<a name="link-16"></a>
#### Если вы используете PowerShell в Windows
По умолчанию, поток вывода не совпадает с UTF-8 и итоговый файл становится нечитаемым. Перед сохранением файла с логом вы можете изменить кодировку командой:
```
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```
Или откройте сохраненный файл и вручную измените кодировку на UTF-8.

<a name="link-17"></a>
### 🗃️ Как посмотреть отчёт по группе микросервисов?
- Сгенерировать для каждого микросервиса файл `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt` и т.д.). Вы можете сделать это в ручную, или использовать модуль [Assayo Crawler](https://github.com/bakhirev/assayo-crawler) для автоматического сбора логов;
- См. «Как посмотреть отчёт онлайн?». На последнем шаге перетащить сразу все файлы в окно браузера.
- См. «Как посмотреть отчёт офлайн?». На втором шаге перетащить все файлы микросервисов (`log-1.txt`, `log-2.txt`, `log-3.txt` и т.д.) в папку отчета (`/build`).

<a name="link-18"></a>
## ЕЖЕДНЕВНЫЕ ПРАКТИКИ В ПРОЕКТЕ

<a name="link-19"></a>
### 📝 Как подписывать коммиты?
Следуйте практике [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Например:
```
JIRA-1234 feat(profile): Added avatar for user
```
- номер задачи в таск трекере `(JIRA-1234)`
- тип работы `(feat, fix, style, refactor, test, doc и т.д.)`
- фича `(profile - раздел сайта, страница или новый функционал, одним словом)`
- какую проблему решали `(Added avatar for user)`

<a name="link-20"></a>
### 👮 Как добавить автоматическую проверку подписи коммита?

<a name="link-21"></a>
####  Используя файл commit-msg
1. Создайте файл `commit-msg` в папке `.git/hooks/`
2. Добавьте в файл следующий текст:
```
#!/usr/bin/env bash
if ! grep -iqE "(JIRA-[0-9]{1,5})(s)(feat|fix|docs|style|refactor|test|chore)((([a-z0-9_-]{1,})){0,})(:s)([a-z]{1,})" "$1"; then
   echo "Need commit message like: JIRA-12 fix(profile): some text. Read Semantic Commit Messages" >&2
   exit 1
fi
```

<a name="link-22"></a>
#### Используя пакет [pre-commit](https://www.npmjs.com/package/pre-commit)
1. Добавьте в файл `package.json` блок `commit-msg`:
```
...
"commit-msg": {
  "regex": "(JIRA-[0-9]{1,5})(\s)(feat|fix|docs|style|refactor|test|chore)((\([a-z0-9_-]{1,}\)){0,})(:\s)([a-z]{1,})",
    "error-message": "Need commit message like: JIRA-12 fix(profile): some text Read Semantic Commit Messages"
},
...
```
2. Выполните команду `npm install pre-commit`

<a name="link-23"></a>
##  ОБ ЭТОМ ПРИЛОЖЕНИИ

<a name="link-24"></a>
### 🎨 Как брендировать отчёт?
Вы можете написать свою тему для отчёта. Можно менять:
- **Заголовок**. Вы можете указать его в URL-параметре `title`. Например: `?title=You Company`
- **Визуальную тему**. Для этого нужно подготовить CSS файл с новыми стилями и указать его адрес в URL-параметре `theme`. Например: `?theme=//company.com/some.css`. Вы можете использовать имена классов в качестве селекторов. Большинство из них не меняется в при выходе новой версий.
- **Язык**. Вы можете указать его в URL-параметре `lang`. Например: `?lang=es`

**Например:** [демо](https://bakhirev.github.io/demo/themes/)

<a name="link-25"></a>
### 🛠️ Как пересобрать файл отчёта из исходного кода?
- скачать этот репозиторий `git clone https://github.com/bakhirev/assayo.git`
- выполнить `npm install`
- выполнить `npm run build:local`
- свежая сборка будет в папке `/build`

<a name="link-26"></a>
### 🈯 Как добавить или отредактировать перевод?
Вы можете добавить новый перевод или поправить текущий в разделе `ts/translations/`.
[Инструкция](https://github.com/firstcontributions/first-contributions)

<a name="link-27"></a>
### 📐 Архитектура

<a name="link-29"></a>
#### Общая архитектура микросервисов
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](https://github.com/bakhirev/assayo-showcase) отображение списка отчётов. Каждый отчёт имеет название, описание и список репозиториев.
2. [Crawler service](https://github.com/bakhirev/assayo-crawler) сборка, склейка, обработка логов из репозиториев для отчётов.
3. [Log visualization UI](https://github.com/bakhirev/assayo) **(вы тут)** отображение отчётов. Для работы ему нужен log файл с данными.

<a name="link-30"></a>
### 📧 Пожелания, предложения, замечания
- 📱 [https://t.me/bakhirev](https://t.me/bakhirev) (приоритетный способ связи)
- 📧 [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- 🌐 [https://bakhirev.github.io/](https://bakhirev.github.io/?ref=github&lang=ru)

