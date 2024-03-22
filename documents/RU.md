> - [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)
> - [English](https://github.com/bakhirev/assayo)
> - [中文](https://github.com/bakhirev/assayo/blob/main/documents/ZH.md)
> - [Español](https://github.com/bakhirev/assayo/blob/main/documents/ES.md)
> - [Français](https://github.com/bakhirev/assayo/blob/main/documents/FR.md)
> - [Português](https://github.com/bakhirev/assayo/blob/main/documents/PT.md)
> - [Deutsch](https://github.com/bakhirev/assayo/blob/main/documents/DE.md)
> - [日本語](https://github.com/bakhirev/assayo/blob/main/documents/JA.md)

# [Assayo](https://assayo.online/?ref=github&lang=ru)

Визуализация и анализ данных вашего git-репозитория ([демо](https://assayo.online/demo/?dump=./test.txt)).

##### Сотрудник может оценить новое место работы
- темп работы;
- количество переработок;
- зоны ответственности;
- объем фичей и багов;
- стиль работы коллег;

##### Руководитель может оценить сотрудников
- выявить бездельников;
- прикинуть объём кода;
- узнать скорость работы;
- заметить аномалии поведения;
- посмотреть динамику работы по неделям;

##### Инвестор может оценить продукт
- стоимость продукта;
- стоимость фичей;
- время на разработку;
- прогноз времени доработок;
- прогноз стоимости;

### Содержание

- [Как быстро посмотреть количество коммитов?](#link-1)
- [Как объединить авторов?](#link-2)
- [Как выгрузить данные из git?](#link-3)
  - [Для онлайн просмотра](#link-4)
  - [Для офлайн просмотра](#link-5)
- [Как посмотреть отчёт?](#link-6)
  - [Онлайн](#headers)
  - [Офлайн](#headers)
- [Как пересобрать билд отчёта?](#headers)
- [Как посмотреть отчёт по группе микросервисов?](#headers)
- [Как брендировать интерфейс?](#headers)
- [Как подписывать коммиты?](#headers)
- [Как добавить проверку текста коммита?](#headers)
  - [Используя файл commit-msg](#headers)
  - [Используя пакет pre-commit](#headers)
- [Как автоматизировать сбор данных?](#headers)
  - [С бекендом](#headers)
  - [Без бекенда](#headers)
- [DevOps (CI/CD)](#headers)
  - [Публичный сервер](#headers)
  - [Приватный сервер](#headers)
  - [Обновление Docker-образа](#headers)
- [Как добавить или отредактировать перевод?](#headers)
- [Дорожная карта](#headers)
- [Пожелания, предложения, замечания](#headers)

<a name="link-1"></a>
### Как быстро посмотреть количество коммитов?

В корневой директории вашего проекта выполнить:
```
git shortlog -s -n -e
```
<a name="link-2"></a>
### Как объединить авторов?
В корневой директории вашего проекта нужно создать файл `.mailmap`.
Пример содержания файла:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
``` 
Подробнее про формат этого файла можно прочитать [тут](https://git-scm.com/docs/gitmailmap).

<a name="link-3"></a>
### Как выгрузить данные из git?

<a name="link-4"></a>
#### Для онлайн просмотра
В корневой директории вашего проекта выполнить:
```
git --no-pager log --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%cN>%cE>%s" > log.txt
```
<a name="link-5"></a>
#### Для офлайн просмотра

```
git --no-pager log --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%cN>%cE>%s" | sed -e 's/\\/\\\\/g' | sed -e 's/`/"/g' | sed -e 's/^/report.push(\`/g' | sed 's/$/\`\);/g' | sed 's/\$/_/g' > log.txt
```
Git создаст файл `log.txt`.
Он содержит данные для построения отчёта. 

Разница между онлайн и офлайн форматом в наличие обёртки для строк. Оффлайн формат будет подтягиваться, как `js` файл если вы просто открыли `/build/index.html`

### Как посмотреть отчёт? 
#### Онлайн

- Перейти на [сайт](https://assayo.online/)
- Нажать кнопку «[Демо](https://assayo.online/demo)»
- Перетащить файл `log.txt` в окно браузера

#### Офлайн
- Скачать этот репозиторий
- Перетащить файл `log.txt` в папку `/build`
- Запустить `/build/index.html`
- Или перетащить папку `/build` к себе в репозиторий (туда, где лежит `log.txt`). Можно сменить название. Например с `/build` на `/report`

В этом случае важно, чтобы файл `log.txt` был сгенерирован командой для офлайн просмотра.

### Как пересобрать билд отчёта?
- Скачать этот репозиторий
- Выполнить `npm install`
- Выполнить `npm run build`
- Свежая сборка будет в папке `/build`

### Как посмотреть отчёт по группе микросервисов?
- Сгенерировать для каждого микросервиса файл `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt` и т.д.)
- См. «Как посмотреть отчёт онлайн?». На последнем шаге перетащить сразу все файлы в окно браузера.
- См. «Как посмотреть отчёт офлайн?». На втором шаге перетащить все файлы микросервисов (`log-1.txt`, `log-2.txt`, `log-3.txt` и т.д.) в папку отчета (`/build`).

### Как брендировать интерфейс?
Вы можете написать свою тему для интерфейса. Можно менять:
- **Заголовок**. Вы можете указать его в URL-параметре ```title```. Например: ```?title=You Company```
- **Визуальную тему**. Для этого нужно подготовить CSS файл с новыми стилями и указать его адрес в URL-параметре ```theme```. Например: ```?theme=//company.com/some.css```. Вы можете использовать имена классов в качестве селекторов. Большинство из них не меняется в при выходе новой версий.
- **Язык**. Вы можете указать его в URL-параметре ```lang```. Например: ```?lang=es```

### Как подписывать коммиты?

Следуйте практике [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Например:
```
JIRA-1234 feat(profile): Added avatar for user 
```
- номер задачи в таск трекере `(JIRA-1234)`
- тип работы `(feat, fix, style, refactor, test, doc и т.д.)`
- фича `(profile - раздел сайта, страница или новый функционал, одним словом)`
- какую проблему решали `(Added avatar for user)`

### Как добавить проверку текста коммита?

#### Используя файл `commit-msg`

1. Создайте файл `commit-msg` в папке `.git/hooks/`
2. Добавьте в файл следующий текст:
```
#!/usr/bin/env bash

if ! grep -iqE "(JIRA-[0-9]{1,5})(\s)(feat|fix|docs|style|refactor|test|chore)((\([a-z0-9_-]{1,}\)){0,})(:\s)([a-z]{1,})" "$1"; then
   echo "Need commit message like: JIRA-12 fix(profile): some text. Read Semantic Commit Messages" >&2
   exit 1
fi
```
#### Используя пакет [pre-commit](https://www.npmjs.com/package/pre-commit)

1. Добавьте в файл `package.json` блок `commit-msg`:
```
  ...
  "commit-msg": {
    "regex": "(JIRA-[0-9]{1,5})(\\s)(feat|fix|docs|style|refactor|test|chore)((\\([a-z0-9_-]{1,}\\)){0,})(:\\s)([a-z]{1,})",
    "error-message": "Need commit message like: JIRA-12 fix(profile): some text Read Semantic Commit Messages"
  },
  ...
```
2. Выполните команду `npm install pre-commit`

### Как автоматизировать сбор данных?

#### С бекендом

- используйте модуль [Assayo Crawler](https://github.com/bakhirev/assayo-crawler);

#### Без бекенда
- создайте клон нужного вам репозитория;
- скопируйте в корень папку `build`;
- откройте `build/index.html` в браузере и добавьте в закладки;
- добавьте ярлык на `build/assets/ci-cd.sh` в папку автозагрузки (Windows);

Каждый раз, при перезагрузке компьютера, скрипт будет обновлять статистику по всем данным, которые автоматически влились в основную ветку.

### DevOps (CI/CD)

#### Публичный сервер

Вы можете выкладывать файл с данными для построения отчёта на публичный URL. А для его визуализации использовать веб-интерфейс сайта [assayo](https://assayo.online/). Просто укажите адресс, где лежат данные, в URL-параметре ```dump```:
```
https://assayo.online/demo/?dump=//you_site.com/some/log.txt
```

#### Приватный сервер
- скачайте [docker образ](https://hub.docker.com/r/bakhirev/assayo);
- поднимите его в локальной сети;
- для просмотра отчётов используйте веб-интерфейс указывая ему адресс, где лежат данные, в URL-параметре ```dump```:
```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - URL адресс контейнера assayo, он слушает 80 порт;
you_url    - URL адресс вашего контейнера с логами git;
```

По умолчанию образ запустится по адресу ```http://127.0.0.1:80/```. Если не получилось проверьте свободен ли у вас 80 порт.
#### Обновление Docker-образа

- удилить метрику, аллерты, старые билды;
- собрать билд ```npm run build```
- собрать образ ```docker build -t assayo .```
- визуально проверить образ ```docker run --name assayo -p 80:80 -d assayo```;
- поставить тег ```docker tag IMAGE_ID bakhirev/assayo:latest```;
- запушить образ в Docker Hub

### Релизы, примерно, раз в полгода. Что дальше:

- больше советов и достижений;
- итоги года / месяца, печать отчётов;
- локализация и интернационализация;
- анализ файлов;
- разные роли для статистики (скрытие финансов);
- разработка бекенда, интеграции с другими системами;

### Как добавить или отредактировать перевод?

Вы можете добавить новый перевод или поправить текущий в разделе ```ts/translations/```.
[Инструкция](https://docs.github.com/ru/get-started/exploring-projects-on-github/contributing-to-a-project)

### Пожелания, предложения, замечания
- telegramm [@bakhirev](https://t.me/bakhirev) (приоритетный способ связи)
- [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- сайт [https://assayo.online/](https://assayo.online/)

