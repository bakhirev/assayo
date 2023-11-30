> The [main documentation](https://github.com/bakhirev/assayo/blob/main/documents/RU.md) is in russian. This is a translation. It may contain errors. If you a native speaker, you can help improve this translation. Thanks!

> - [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)
> - [English](https://github.com/bakhirev/assayo)

# [Assayo](https://assayo.jp/?ref=github&lang=en)

Visualization and analysis of your git repository data ([demo](https://assayo.jp/demo/?ref=github&lang=en&dump=./test.txt)).

##### Employee can evaluate new workplace
- work pace;
- number of extra hours worked;
- areas of responsibility;
- volume of features and bugs;
- working style of colleagues;

##### Manager can evaluate employees
- identify slackers;
- estimate the amount of code;
- learn the work speed;
- notice behavioral anomalies;
- see the dynamics of work by week;

##### Investor can evaluate product
- product cost;
- cost of features;
- development time;
- forecast of rework time;
- forecast cost;

### How to quickly view the number of commits?

In the root directory of your project, run:
```
git shortlog -s -n -e
```
### How to concat authors?
In the root directory of your project, you need to create a `.mailmap` file.
Example of the contents of the file:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
``` 
Read more about the format of this file you can [here](https://git-scm.com/docs/gitmailmap).

### How to export data from git?

#### For online viewing
In the root directory of your project run:
```
git --no-pager log --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%cN>%cE>%s" > log.txt
```
#### For offline viewing

```
git --no-pager log --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%cN>%cE>%s" | sed -e 's/\\/\\\\/g' | sed -e 's/`/"/g' | sed -e 's/^/report.push(\`/g' | sed 's/$/\`\);/g' | sed 's/\$/_/g' > log.txt
```
Git will create a file `log.txt`.
This file contains data for show a report.

The difference between the online and offline format is the presence of a wrapper for strings. The offline format will be pulled up like a `js` file if you just opened `/build/index.html `

### How to view the report online?

- Go to the [website](https://assayo.jp/)
- Click the “[Demo](https://assayo.jp/demo)” button.
- Drag the `log.txt` file into the browser window.

### How to view the report offline?
- Download this repository.
- Drag the `log.txt` file to the `/build` folder.
- Run `/build/index.html`
- Or drag the `/build` folder to your repository (where the `log.txt` is located). You can change the name. For example, from `/build` to `/report`.

В этом случае важно, чтобы файл `log.txt` был сгенерирован командой для офлайн просмотра.

### How to rebuild the report build?
- Download this repository
- Run `npm install`
- Run `npm run build`
- The new build will be in the `/build` folder

### How to view a report on a group of microservices?
- Generate for each microservice `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt` и т.д.)
- See “How to view an online report?”. At the last step, drag all the files at once into the browser window.
- See “How to see a report offline?”. At the second step, drag all microservice files (`log-1.txt`, `log-2.txt`, `log-3.txt` and etc.) to the report folder (`/build`).

### How to brand the interface?
Вы можете написать свою тему для интерфейса. Можно менять:
- **Заголовок**. Вы можете указать его в URL-параметре ```title```. Например: ```?title=You Company```
- **Визуальную тему**. Для этого нужно подготовить CSS файл с новыми стилями и указать его адрес в URL-параметре ```theme```. Например: ```?theme=//company.com/some.css```. Вы можете использовать имена классов в качестве селекторов. Большинство из них не меняется в при выходе новой версий.
- **Язык**. Вы можете указать его в URL-параметре ```lang```. Например: ```?lang=es```

### Как добавить или отредактировать перевод?

Вы можете добавить новый перевод или поправить текущий в разделе ```ts/translations/``` и создать Pull Request.

### Как подписывать коммиты?

Следуйте практике [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Например:
```
JIRA-1234 feat(profile): Added avatar for user 
```
- номер задачи в таск трекере `(JIRA-1234)`
- тип работы `(feat, fix, style, refactor, test, doc и т.д.)`
- фича `(profile - раздел сайта, страница или новый функционал, одним словом)`
- какую проблему решали `(Added avatar for user)`

### Как автоматизировать сбор данных?

#### Без бекенда
- создайте клон нужного вам репозитория;
- скопируйте в корень папку `build`;
- откройте `build/index.html` в браузере и добавьте в закладки;
- добавьте ярлык на `build/assets/ci-cd.sh` в папку автозагрузки (Windows);

Каждый раз, при перезагрузке компьютера, скрипт будет обновлять статистику по всем данным, которые автоматически влились в основную ветку.

### DevOps (CI/CD)

#### Публичный сервер

Вы можете выкладывать файл с данными для построения отчёта на публичный URL. А для его визуализации использовать веб-интерфейс сайта [assayo](https://assayo.jp/). Просто укажите адресс, где лежат данные, в URL-параметре ```dump```:
```
https://assayo.jp/demo/?dump=//you_site.com/some/log.txt
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

### Пожелания, предложения, замечания
- telegramm [@bakhirev](https://t.me/bakhirev) (приоритетный способ связи)
- [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- сайт [https://assayo.jp/](https://assayo.jp/)

