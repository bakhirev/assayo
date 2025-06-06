> - [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)
> - [English](https://github.com/bakhirev/assayo)
> - [Spanish](https://github.com/bakhirev/assayo/blob/main/documents/ES.md)
> - [French](https://github.com/bakhirev/assayo/blob/main/documents/FR.md)

# [Assayo](https://bakhirev.github.io/?ref=github&lang=ru)

Визуализация и анализ данных вашего git-репозитория ([демонстрация](https://bakhirev.github.io/demo/?dump=./test.txt), [online version](https://bakhirev.github.io/demo/?ref=github), [docker](https://hub.docker.com/r/bakhirev/assayo)).

##### Сотрудник может оценить новое место работы
- темп работы;
- количество переработок;
- зоны ответственности;
- объем нового функционала и багов;
- стиль работы коллег;

##### Руководитель может оценить сотрудников
- выявить бездельников;
- прикинуть объём кода;
- узнать скорость работы;
- заметить аномалии поведения;
- посмотреть динамику работы по неделям;

##### Инвестор может оценить продукт
- стоимость продукта;
- стоимость нового функционала;
- время на разработку;
- прогноз времени доработок;
- прогноз стоимости;

### Как быстро посмотреть количество коммитов?

В корневой директории вашего проекта выполнить команду:
```
git shortlog -s -n -e
```
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

### Как выгрузить данные из git?

#### Для онлайн просмотра
В корневой директории вашего проекта выполнить:
```
git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" > log.txt
```
#### Для просмотра без интернета

```
git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" | sed -e 's/\\/\\\\/g' | sed -e 's/`/"/g' | sed -e 's/^/report.push(\`/g' | sed 's/$/\`\);/g' | sed 's/\$/_/g' > log.txt
```
Git создаст файл `log.txt`.
Этот файл содержит данные для построения отчёта. 

Разница между форматами в наличие обёртки для строк. Формат без интернета будет подтягиваться, как `js` файл если вы просто открыли `/build/index.html`

### Как посмотреть отчёт с интеретом? 

- Перейти на [сайт](https://bakhirev.github.io/)
- Нажать кнопку “[Демонстрация](https://bakhirev.github.io/demo?lang=ru)”
- Перетащить файл `log.txt` в окно браузера

### Как посмотреть отчёт без интернета?
- Скачать этот репозиторий
- Перетащить файл `log.txt` в папку `/build`
- Запустить `/build/index.html`
- Или перетащить папку `/build` к себе в репозиторий (место, где лежит `log.txt`). Можно изменить название. Например с названия `/build` на название `/report`

Важно, чтобы файл `log.txt` был создан командой для просмотра без интернета.

### Как пересобрать файл отчёта?
- Скачать этот репозиторий
- Выполнить `npm install`
- Выполнить `npm run build:local`
- Свежая сборка будет в папке `/build`

### Как посмотреть отчёт по группе микросервисов?
- Сгенерировать для каждого микросервиса файл `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt` и т.д.)
- См. “Как посмотреть отчёт с интернетом?”. На последнем шаге перетащить сразу все файлы в окно браузера.
- См. “Как посмотреть отчёт без интернета?”. На втором шаге перетащить все файлы микросервисов (`log-1.txt`, `log-2.txt`, `log-3.txt` и т.д.) в папку отчета (`/build`).

### Как перекрасить интерфейс в свои фирменные цвета?
Вы можете написать свою тему оформления для интерфейса. Можно менять:
- **Заголовок**. Вы можете указать его в URL-параметре ```title```. Например: ```?title=You Company```
- **CSS стили**. Для этого нужно подготовить CSS файл и указать его адрес в URL-параметре ```theme```. Например: ```?theme=//company.com/some.css```. Вы можете использовать имена классов в качестве селекторов. Большинство из них не меняется в при выходе новой версий.
- **Язык**. Вы можете указать его в URL-параметре ```lang```. Например: ```?lang=es```

### Как подписывать коммиты?

Следуйте практике [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Например:
```
JIRA-1234 feat(profile): Added avatar for user 
```
- номер задачи `(JIRA-1234)`
- тип работы `(feat, fix, style, refactor, test, doc и т.д.)`
- область работы `(profile - раздел сайта, страница или новый функционал, одним словом)`
- описание работы `(Added avatar for user)`

### Как автоматизировать сбор данных?

#### Без бекенда
- создайте клон вашего репозитория;
- скопируйте папку `build` из текущего репозитория;
- откройте `build/index.html` в браузере и добавьте в закладки;
- добавьте ярлык на `build/assets/ci-cd.sh` в папку автозагрузки (Windows);

Каждый раз, при перезагрузке компьютера, скрипт будет обновлять статистику по всем данным, которые автоматически влились в основную ветку.

### DevOps (CI/CD)

#### Публичный сервер

Вы можете выкладывать файл с данными для построения отчёта на публичный URL. Для его визуализации можно использовать сайт [assayo](https://bakhirev.github.io/). Указывайте адресс, где лежат данные, в URL-параметре ```dump```:
```
https://bakhirev.github.io/demo/?dump=//you_site.com/some/log.txt
```

#### Приватный сервер
- скачайте [docker образ](https://hub.docker.com/r/bakhirev/assayo);
- запустите его в локальной сети;
- для просмотра отчётов используйте веб-интерфейс, указывая ему адресс, где лежат данные, в URL-параметре ```dump```:
```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - URL адресс контейнера assayo, он слушает 80 порт;
you_url    - URL адресс вашего контейнера с логами git;
```

По умолчанию образ запустится по адресу ```http://127.0.0.1:80/```. Если не получилось проверьте свободен ли у вас 80 порт.
#### Обновление Docker-образа

- выполнить команду ```npm run build:docker```
- выполнить команду ```docker build -t assayo .```
- проверить результат ```docker run --name assayo -p 80:80 -d assayo```;
- выполнить команду ```docker tag assayo bakhirev/assayo:latest```;
- отправить образ контейнера в Docker Hub

### Релизы, примерно, раз в полгода. Что дальше:

Смотри [главную документацию](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

### Как добавить или отредактировать перевод?

Вы можете добавить новый перевод или поправить текущий в разделе ```ts/translations/```.
[Инструкция](https://github.com/firstcontributions/first-contributions)

### Пожелания, предложения, замечания
- telegramm [@bakhirev](https://t.me/bakhirev) (приоритетный способ связи)
- [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- сайт [https://bakhirev.github.io/](https://bakhirev.github.io/)

