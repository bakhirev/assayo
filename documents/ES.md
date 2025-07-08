> [English](https://github.com/bakhirev/assayo) | __[Español](https://github.com/bakhirev/assayo/blob/main/documents/ES.md)__ | [中文](https://github.com/bakhirev/assayo/blob/main/documents/ZH.md) | [Français](https://github.com/bakhirev/assayo/blob/main/documents/FR.md) | [Deutsch](https://github.com/bakhirev/assayo/blob/main/documents/DE.md) | [Português](https://github.com/bakhirev/assayo/blob/main/documents/PT.md) | [日本語](https://github.com/bakhirev/assayo/blob/main/documents/JA.md) | [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

# [Assayo](https://bakhirev.github.io/?ref=github&lang=es)
Visualización y análisis de los datos de su repositorio git:
- el ritmo de trabajo y el número de horas extras;
- las zonas de responsabilidad, el número de funciones y errores;
- el estilo de trabajo de tus compañeros;
- la tasa de rotación del personal y la composición del equipo;
- la ubicación de los desarrolladores;
- el cronograma de lanzamientos y el calendario de vacaciones;
- el costo de las características y del proyecto en su conjunto;
- lugares para refactorización, archivos eliminados, etc.


**Links:** [demo](https://bakhirev.github.io/demo/?ref=github&dump=./test.txt), [online version](https://bakhirev.github.io/demo/?ref=github), [docker](https://hub.docker.com/r/bakhirev/assayo), [reddit](https://www.reddit.com/r/ITManagers/comments/1e5k291/the_visualization_and_analysis_of_git_commit/), [habr](https://habr.com/ru/articles/852782/).

**Video:** [english](https://www.youtube.com/watch?v=uMbhrrd25t4), [español](https://www.youtube.com/watch?v=skmctb_2rZ0), [русский](https://www.youtube.com/watch?v=jwCp_-bhrCQ).

<a href="https://bakhirev.github.io/demo/?ref=github&dump=./test.txt" target="_blank"><img src="https://bakhirev.github.io/assets/images/index.gif" width="100%" /></a>

<a name="link-0"></a>
###  Table of contents


- [COMMIT STATISTICS REPORT](#link-1)
  - [¿Cómo ver el informe?](#link-2)
    - [Using website](#link-3)
    - [Use the library NodeJS](#link-4)
    - [Use the library PHP](#link-5)
    - [Use the library Python](#link-6)
    - [Use the library Ruby](#link-7)
    - [Use the library Go](#link-8)
    - [Use source code](#link-9)
    - [Use github actions](#link-10)
    - [Servidor privado](#link-11)
  - [Cómo combinar a los autores?](#link-12)
  - [Cómo descargar los datos desde git?](#link-13)
    - [Para la visualización en línea](#link-14)
    - [Para ver sin conexión](#link-15)
    - [If you use PowerShell in Windows](#link-16)
  - [Como mirar el reporte de un grupo de microservicios?](#link-17)


- [THE BEST PRACTICES IN THE PROJECT](#link-18)
  - [¿Cómo firmar los commits?](#link-19)
  - [How to add checking for commit message?](#link-20)
    - [ Use file commit-msg](#link-21)
    - [ Use package pre-commit](#link-22)


- [ABOUT THIS APP](#link-23)
  - [¿Cómo puedo personalizar la interfaz de usuario?](#link-24)
  - [Como recompilar el build de un informe?](#link-25)
  - [¿Cómo añadir o editar una traducción?](#link-26)
  - [️Architecture](#link-27)
    - [The structure of this module](#link-28)
    - [General architecture of microservices](#link-29)
  - [Deseos, comentarios](#link-30)
<a name="link-1"></a>
##  COMMIT STATISTICS REPORT
<a name="link-2"></a>
### 📈 ¿Cómo ver el informe?
<a name="link-3"></a>
####  Using website
- ir a [sitio web](https://bakhirev.github.io/demo/)
- follow the instructions

<a name="link-4"></a>
####  Use the library NodeJS
- run `npx assayo`
- open `./assayo/index.html`

<a name="link-5"></a>
####  Use the library PHP
- run `composer require bakhirev/assayo`
- run `vendor/bin/assayo`
- open `./assayo/index.html`

<a name="link-6"></a>
####  Use the library Python
- run `pipx install assayo`
- run `assayo`
- open `./assayo/index.html`

<a name="link-7"></a>
####  Use the library Ruby
- run `gem install assayo`
- run `assayo`
- open `./assayo/index.html`

<a name="link-8"></a>
####  Use the library Go
- run `go get github.com/bakhirev/assayo`
- run `go install github.com/bakhirev/assayo`
- run `assayo`
- open `./assayo/index.html`

<a name="link-9"></a>
####  Use source code
- descargar este repositorio
- arrastrar y soltar archivo `log.txt` en la carpeta `/build`
- lanzar `/build/index.html`
- o arrastrar una carpeta `/build` a su repositorio (donde se encuentra ' log.txt`). Puede cambiar el nombre. Por ejemplo `/build` contra `/report`

En este caso, es importante que el archivo ' log.txt ' fue generado por el equipo para ver sin conexión.
<a name="link-10"></a>
####  Use github actions
Add [script](https://github.com/bakhirev/assayo/blob/main/documents/ActionExample.yml) in folder `.github/workflows/` or use this [action](https://github.com/marketplace/actions/assayo) from the marketplace.
<a name="link-11"></a>
####  Servidor privado
- descargar [docker образ](https://hub.docker.com/r/bakhirev/assayo);
- recogerlo en la red local;
- Para ver los informes, use la interfaz web indicándole la dirección de los datos en el parámetro URL ```dump```:

```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - URL dirección del contenedor assayo, Él está escuchando el puerto 80;
you_url    - URL la dirección de su contenedor con registros git;
```
Por defecto, la imagen se ejecutará en la siguiente dirección ```http://127.0.0.1:80/```. Si no funciona, compruebe si tiene el puerto 80 disponible
<a name="link-12"></a>
### ‍🎭 Cómo combinar a los autores?
En la carpeta raíz de su proyecto debe crear un archivo `.mailmap`.
Un ejemplo del contenido del archivo:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
```
Más información sobre el formato de este archivo se puede leer en [aquí](https://git-scm.com/docs/gitmailmap).
<a name="link-13"></a>
### 📤 Cómo descargar los datos desde git?
<a name="link-14"></a>
####  Para la visualización en línea
En el directorio raíz de su proyecto ejecutar:
```
git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" > log.txt
```
<a name="link-15"></a>
####  Para ver sin conexión
```
git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" | sed -e 's/\\/\\\\/g' | sed -e 's/`/"/g' | sed -e 's/\$/S/g' | sed -e '1s/^/R(f\`/' | sed -e '$s/$/\`\);/' > log.txt
```
Git creará un archivo `log.txt`. contiene los datos para construir el informe. La diferencia entre los formatos en línea y fuera de línea está en la existencia de una envoltura para las cadenas. El formato fuera de línea se cargará como un archivo`js` si usted simplemente lo abrió. `/build/index.html`
<a name="link-16"></a>
####  If you use PowerShell in Windows
By default, the output encoding may not match UTF-8 and the resulting log file will be unreadable. Before saving the log, you can change the encoding with the command.
```
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```
Or open a saved file and manually change the encoding to UTF-8.
<a name="link-17"></a>
### 🗃️ Como mirar el reporte de un grupo de microservicios?
- Generar para cada microservicio el archivo `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt` etc.). You can do this manually, or use the [Assayo Crawler](https://github.com/bakhirev/assayo-crawler) module for automatic log collection.
- Ver “Cómo ver el informe en línea?”. En el último paso, arrastrar todos los archivos al navegador.
- Ver “Cómo ver informe fuera de línea?”. En el segundo paso, arrastrar los archivos de todos los microservicios al navegador (`log-1.txt`, `log-2.txt`, `log-3.txt` etc.) la carpeta informe (`/build`).

<a name="link-18"></a>
##  THE BEST PRACTICES IN THE PROJECT
<a name="link-19"></a>
### 📝 ¿Cómo firmar los commits?
Siga la práctica [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Por ejemplo:
```
JIRA-1234 feat(profile): Added avatar for user 
```
- El número de la tarea en el gestor de tareas es `(JIRA-1234)`
- tipo de trabajo `(feat, fix, style, refactor, test, doc etc.)`
- ficha `(profile - La sección del sitio, la página o la nueva funcionalidad, en una palabra)`
- ¿qué problema resolvieron? `(Added avatar for user)`

<a name="link-20"></a>
### 👮 How to add checking for commit message?
<a name="link-21"></a>
####   Use file `commit-msg`
1. Create file `commit-msg` in folder `.git/hooks/`
2. Add this text in file:
```
#!/usr/bin/env bash
if ! grep -iqE "(JIRA-[0-9]{1,5})(\s)(feat|fix|docs|style|refactor|test|chore)((\([a-z0-9_-]{1,}\)){0,})(:\s)([a-z]{1,})" "$1"; then
   echo "Need commit message like: JIRA-12 fix(profile): some text. Read Semantic Commit Messages" >&2
   exit 1
fi
```
<a name="link-22"></a>
####   Use package [pre-commit](https://www.npmjs.com/package/pre-commit)
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
<a name="link-23"></a>
##  ABOUT THIS APP
<a name="link-24"></a>
### 🎨 ¿Cómo puedo personalizar la interfaz de usuario?
Puedes crear tu propio tema para la interfaz. Puedes cambiar:
- **El título**. Puedes especificarlo en el parámetro de la URL ```title```. Por ejemplo: ```?title=You Company```
- **El tema visual**. Para esto, debes preparar un archivo CSS con los nuevos estilos y especificar su dirección en el parámetro de URL ```theme```. Por ejemplo: ```?theme=//company.com/some.css```. Puedes usar los nombres de clases como selectores. La mayoría de ellos no cambia con el lanzamiento de nuevas versiones.
- **La lengua**. Puedes especificarla en el parámetro de la URL ```lang```. Por ejemplo: ```?lang=es```


**Example:** [demo](https://bakhirev.github.io/demo/themes/)
<a name="link-25"></a>
### 🛠️ Como recompilar el build de un informe?
- Descargar este repositorio
- Ejecutar `npm install`
- Ejecutar `npm run build:local`
- La nueva compilación estará en el directorio `/build`

<a name="link-26"></a>
### 🈯 ¿Cómo añadir o editar una traducción?
Puede agregar una nueva traducción o corregir la actual en la sección ```ts/translations/```.
[Instrucciones](https://github.com/firstcontributions/first-contributions)
<a name="link-27"></a>
### 📐 ️Architecture
<a name="link-28"></a>
####  The structure of this module
```
src
 |- pages
    |- Person // all personal dashboards
    |- Team   // all dashboards about team
 |
 |- helpers
    |- Parser          // parse text from git log to JS objects
    |- DataGrip        // data grouping and counting values
    |- achievement     // the logic that gives out personal achievements
    |- Recommendations // the logic that gives out common recommendations
 |
 |- translations // translations into other languages
```
<a name="link-29"></a>
####  General architecture of microservices
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](https://github.com/bakhirev/assayo-showcase) displays a list of available reports. Each report consists of a title, description, and a list of repositories.
2. [Crawler service](https://github.com/bakhirev/assayo-crawler) collects repository logs for the report.
3. [Log visualization UI](https://github.com/bakhirev/assayo) **(you here)** displays report. Needs a log file for work.
<a name="link-30"></a>
### 📧 Deseos, comentarios
- telegramm [@bakhirev](https://t.me/bakhirev) (La forma preferencial de contacto)
- [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- sitio web [https://bakhirev.github.io/](https://bakhirev.github.io/?ref=github&lang=es)


