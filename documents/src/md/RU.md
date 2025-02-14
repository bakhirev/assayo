Визуализация и анализ данных вашего git-репозитория ([демо](https://bakhirev.github.io/demo/?dump=./test.txt), [установка](https://bakhirev.github.io/demo/?ref=github)).

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
git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" > log.txt
```
<a name="link-5"></a>
#### Для офлайн просмотра

```
git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" | sed -e 's/\\/\\\\/g' | sed -e 's/`/"/g' | sed -e 's/^/report.push(\`/g' | sed 's/$/\`\);/g' | sed 's/\$/_/g' > log.txt
```
Git создаст файл `log.txt`.
Он содержит данные для построения отчёта. 

Разница между онлайн и офлайн форматом в наличие обёртки для строк. Оффлайн формат будет подтягиваться, как `js` файл если вы просто открыли `/build/index.html`

### Как посмотреть отчёт? 
#### Онлайн

- Перейти на [сайт](https://bakhirev.github.io/)
- Нажать кнопку «[Демо](https://bakhirev.github.io/demo)»
- Перетащить файл `log.txt` в окно браузера

#### Офлайн
- Скачать этот репозиторий
- Перетащить файл `log.txt` в папку `/build`
- Запустить `/build/index.html`
- Или перетащить папку `/build` к себе в репозиторий (туда, где лежит `log.txt`). Можно сменить название. Например с `/build` на `/report`

В этом случае важно, чтобы файл `log.txt` был сгенерирован командой для офлайн просмотра.

### Как пересобрать файл отчёта из исходного кода?
- Скачать этот репозиторий
- Выполнить `npm install`
- Выполнить `npm run build:local`
- Свежая сборка будет в папке `/build`

### Как посмотреть отчёт по группе микросервисов?
- Сгенерировать для каждого микросервиса файл `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt` и т.д.). Вы можете сделать это в ручную, или использовать модуль [Assayo Crawler](https://github.com/bakhirev/assayo-crawler) для автоматического сбора логов;
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

Вы можете выкладывать файл с данными для построения отчёта на публичный URL. А для его визуализации использовать веб-интерфейс сайта [assayo](https://bakhirev.github.io/). Просто укажите адресс, где лежат данные, в URL-параметре ```dump```:
```
https://bakhirev.github.io/demo/?dump=//you_site.com/some/log.txt
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

- собрать билд ```npm run build:docker```
- собрать образ ```docker build -t assayo .```
- визуально проверить образ ```docker run --name assayo -p 80:80 -d assayo```;
- поставить тег ```docker tag assayo bakhirev/assayo:latest```;
- запушить образ в Docker Hub ```docker push bakhirev/assayo:latest```;

### ️ О приложении

#### Архитектура
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](https://github.com/bakhirev/assayo-showcase) отображение списка отчётов. Каждый отчёт имеет название, описание и список репозиториев.
2. [Crawler service](https://github.com/bakhirev/assayo-crawler) сборка, склейка, обработка логов из репозиториев для отчётов.
3. [Log visualization UI](https://github.com/bakhirev/assayo) **(вы тут)** отображение отчётов. Для работы ему нужен log файл с данными.

#### Релизы, примерно, раз в полгода. Что дальше:

- больше советов и достижений;
- итоги года / месяца, печать отчётов;
- локализация и интернационализация;
- анализ файлов;
- разные роли для статистики (скрытие финансов);
- разработка бекенда, интеграции с другими системами;

#### Как добавить или отредактировать перевод?

Вы можете добавить новый перевод или поправить текущий в разделе ```ts/translations/```.
[Инструкция](https://github.com/firstcontributions/first-contributions)

#### Пожелания, предложения, замечания
- telegramm [@bakhirev](https://t.me/bakhirev) (приоритетный способ связи)
- [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- сайт [https://bakhirev.github.io/](https://bakhirev.github.io/?ref=github&lang=ru)

