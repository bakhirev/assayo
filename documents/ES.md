
> [English](https://github.com/bakhirev/assayo) | __[Español](https://github.com/bakhirev/assayo/blob/main/documents/ES.md)__ | [Français](https://github.com/bakhirev/assayo/blob/main/documents/FR.md) | [Português](https://github.com/bakhirev/assayo/blob/main/documents/PT.md) | [Deutsch](https://github.com/bakhirev/assayo/blob/main/documents/DE.md) | [中文](https://github.com/bakhirev/assayo/blob/main/documents/ZH.md) | [日本語](https://github.com/bakhirev/assayo/blob/main/documents/JA.md) | [한국어](https://github.com/bakhirev/assayo/blob/main/documents/KO.md) | [العربية](https://github.com/bakhirev/assayo/blob/main/documents/AR.md) | [हिन्दी](https://github.com/bakhirev/assayo/blob/main/documents/HI.md) | [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

# [Assayo](https://bakhirev.github.io/?ref=github&lang=es)
Crea un informe HTML con un análisis de la estadística de commit:
- el ritmo de trabajo y la cantidad de horas extras;
- zonas de responsabilidad, número de características y errores;
- estilo de trabajo de los colegas;
- la tasa de rotación de empleados y la composición del equipo;
- ubicación de los desarrolladores;
- calendario de lanzamientos y calendario de vacaciones;
- costo de las características y del proyecto en su conjunto;
- lugares para refactorizar, archivos eliminados, etc.

**Enlaces:** [demo](https://bakhirev.github.io/demo/?ref=github&dump=./test.txt), [online version](https://bakhirev.github.io/demo/?ref=github), [docker](https://hub.docker.com/r/bakhirev/assayo), [reddit](https://www.reddit.com/r/ITManagers/comments/1e5k291/the_visualization_and_analysis_of_git_commit/), [habr](https://habr.com/ru/articles/852782/)

**Video:** [english](https://www.youtube.com/watch?v=uMbhrrd25t4), [español](https://www.youtube.com/watch?v=skmctb_2rZ0), [русский](https://www.youtube.com/watch?v=jwCp_-bhrCQ)

<a href="https://bakhirev.github.io/demo/?ref=github&dump=./test.txt" target="_blank"><img src="https://bakhirev.github.io/assets/images/index.gif" width="100%" /></a>

<a name="link-0"></a>
### Índice
- [REPORTE DE ESTADÍSTICAS DE COMMIT](#link-1)
  - [¿Cómo crear y ver el informe?](#link-2)
    - [Usando servidor público](#link-3)
    - [Usar la biblioteca NodeJS](#link-4)
    - [Usar la biblioteca PHP](#link-5)
    - [Usar la biblioteca Python](#link-6)
    - [Usar la biblioteca Ruby](#link-7)
    - [Usar la biblioteca Go](#link-8)
    - [Usar el código fuente](#link-9)
    - [Usar github actions](#link-10)
    - [Usar servidor privado](#link-11)
  - [¿Cómo concatenar autores?](#link-12)
  - [¿Cómo exportar datos de git a un archivo txt?](#link-13)
    - [Para la visualización en línea](#link-14)
    - [Para la visualización ofline](#link-15)
    - [Si usa PowerShell en Windows](#link-16)
  - [¿Cómo ver un informe sobre un grupo de microservicios?](#link-17)


- [LAS MEJORES PRÁCTICAS EN EL PROYECTO](#link-18)
  - [¿Cómo firmar los commits?](#link-19)
  - [Cómo agregar comprobación para el mensaje de commit?](#link-20)
    - [Usar archivo commit-msg](#link-21)
    - [Usar paquete pre-commit](#link-22)


- [SOBRE ESTA APLICACIÓN](#link-23)
  - [¿Cómo personalizar la interfaz?](#link-24)
  - [¿Cómo reconstruir el informe HTML desde el código fuente?](#link-25)
  - [¿Cómo agregar o editar una traducción?](#link-26)
  - [Arquitectura](#link-27)
    - [Arquitectura general de microservicios](#link-29)
  - [Retroalimentación, comentarios](#link-30)

<a name="link-1"></a>
##  REPORTE DE ESTADÍSTICAS DE COMMIT

<a name="link-2"></a>
### 📈 ¿Cómo crear y ver el informe?

<a name="link-3"></a>
#### Usando servidor público
- vaya al [sitio web](https://bakhirev.github.io/)
- siga las instrucciones

<a name="link-4"></a>
#### Usar la biblioteca NodeJS
- ejecute `npx assayo`
- abre `./assayo/index.html`

<a name="link-5"></a>
#### Usar la biblioteca PHP
- ejecute `composer require bakhirev/assayo`
- ejecute `vendor/bin/assayo`
- abre `./assayo/index.html`

<a name="link-6"></a>
#### Usar la biblioteca Python
- ejecute `pipx install assayo`
- ejecute `assayo`
- abre `./assayo/index.html`

<a name="link-7"></a>
#### Usar la biblioteca Ruby
- ejecute `gem install assayo`
- ejecute `assayo`
- abre `./assayo/index.html`

<a name="link-8"></a>
#### Usar la biblioteca Go
- ejecute `go get github.com/bakhirev/assayo`
- ejecute `go install github.com/bakhirev/assayo`
- ejecute `assayo`
- abre `./assayo/index.html`

<a name="link-9"></a>
#### Usar el código fuente
- descargue este repositorio
- coloque el archivo `log.txt` en `/build`
- abre `/build/index.html`
- o coloque la carpeta `/build` en su repositorio (donde se encuentra `log.txt`). Puede cambiar el nombre. Por ejemplo, de `/build` a `/report`.

En este caso, es importante que el archivo `log.txt` se genere mediante un comando para la visualización en línea.

<a name="link-10"></a>
####  Usar github actions
Agregue [script](https://github.com/bakhirev/assayo/blob/main/documents/ActionExample.yml) en la carpeta `.github/workflows/` o use esta [acción](https://github.com/marketplace/actions/assayo) del mercado. Un informe listo y actualizado se guardará en los artefactos.

<a name="link-11"></a>
#### Usar servidor privado
- descargue la imagen [docker](https://hub.docker.com/r/bakhirev/assayo);
- ejecútelo en su red local;
- use la interfaz web para ver los informes, establezca la URL de los datos en el parámetro URL `dump`:

```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - URL del contenedor assayo, escucha en el puerto 80;
you_url    - URL de su contenedor con registros git;
```
Por defecto, la imagen se ejecutará en `http://127.0.0.1:80/`. Si no funciona, verifique si el puerto 80 está libre.

<a name="link-12"></a>
### ‍🎭 ¿Cómo concatenar autores?
En el directorio raíz de su proyecto, necesita crear un archivo `.mailmap`.

Ejemplo del contenido del archivo:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
```
Lea más sobre el formato de este archivo [aquí](https://git-scm.com/docs/gitmailmap).

<a name="link-13"></a>
### 📤 ¿Cómo exportar datos de git a un archivo txt?

<a name="link-14"></a>
####  Para la visualización en línea
En el directorio raíz de su proyecto ejecute:

<a name="link-15"></a>
####  Para la visualización ofline
Git creará un archivo `log.txt`. Este archivo contiene datos para mostrar un informe. La diferencia entre el formato en línea y ofline es la presencia de una envoltura para las cadenas. El formato ofline se arrastrará como un archivo `js` si solo abrió `/build/index.html`

<a name="link-16"></a>
#### Si usa PowerShell en Windows
Por defecto, la codificación de salida puede no coincidir con UTF-8 y el archivo de registro resultante será ilegible. Antes de guardar el registro, puede cambiar la codificación con el comando.
```
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```
O abra un archivo guardado y cambie manualmente la codificación a UTF-8.

<a name="link-17"></a>
### 🗃️ ¿Cómo ver un informe sobre un grupo de microservicios?
- Generar para cada archivo de microservicio `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt`, etc.) Puede hacerlo manualmente o usar el módulo [Assayo Crawler](https://github.com/bakhirev/assayo-crawler) para la recopilación automática de registros;
- Ver «Cómo ver un informe en línea?». En el último paso, arrastre todos los archivos a la vez a la ventana del navegador.
- Ver «Cómo ver un informe en offline?». En el segundo paso, arrastre todos los archivos de microservicio (`log-1.txt`, `log-2.txt`, `log-3.txt`, etc.) a la carpeta del informe (`/build`).

<a name="link-18"></a>
## LAS MEJORES PRÁCTICAS EN EL PROYECTO

<a name="link-19"></a>
### 📝 ¿Cómo firmar los commits?
Siga el [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Ejemplo:
```
JIRA-1234 feat(profile): Added avatar for user
```
- número de tarea en el seguimiento de tareas `(JIRA-1234)`
- tipo de trabajo `(feat, fix, style, refactor, test, doc, etc.)`
- característica `(profile - nueva página en el sitio o nueva función, use una (dos) palabra(s) corta(s) o una abreviatura)`
- qué problema se resolvió `(Added avatar for user)`

<a name="link-20"></a>
### 👮 Cómo agregar comprobación para el mensaje de commit?

<a name="link-21"></a>
####  Usar archivo commit-msg
1. Crear archivo `commit-msg` en carpeta `.git/hooks/`
2. Agregar este texto en archivo:
```
#!/usr/bin/env bash
if ! grep -iqE "(JIRA-[0-9]{1,5})(s)(feat|fix|docs|style|refactor|test|chore)((([a-z0-9_-]{1,})){0,})(:s)([a-z]{1,})" "$1"; then
   echo "Need commit message like: JIRA-12 fix(profile): some text. Read Semantic Commit Messages" >&2
   exit 1
fi
```

<a name="link-22"></a>
#### Usar paquete [pre-commit](https://www.npmjs.com/package/pre-commit)
1. Agregar en archivo `package.json` propiedad `commit-msg`:
```
...
"commit-msg": {
  "regex": "(JIRA-[0-9]{1,5})(\s)(feat|fix|docs|style|refactor|test|chore)((\([a-z0-9_-]{1,}\)){0,})(:\s)([a-z]{1,})",
    "error-message": "Need commit message like: JIRA-12 fix(profile): some text Read Semantic Commit Messages"
},
...
```
2. Ejecutar comando `npm install pre-commit`

<a name="link-23"></a>
##  SOBRE ESTA APLICACIÓN

<a name="link-24"></a>
### 🎨 ¿Cómo personalizar la interfaz?
Puede crear su propia temática de interfaz. Opciones:
- **Título**. Puede establecer el título de documento predeterminado en el parámetro de URL `title`. Ejemplo: `?title=You Company`
- **Tema visual**. Para ello, necesita preparar un archivo CSS con nuevos estilos y especificar su URL en el parámetro `theme`. Ejemplo: `?theme=//company.com/some.css`. Puede usar nombres de clase como selectores. La mayoría de ellos no cambian en nuevas versiones.
- **Idioma**. Puede establecer el idioma en el parámetro de URL `lang`. Ejemplo: `?lang=es`

**Ejemplo:** [demo](https://bakhirev.github.io/demo/themes/)

<a name="link-25"></a>
### 🛠️ ¿Cómo reconstruir el informe HTML desde el código fuente?
- descargar este repositorio `git clone https://github.com/bakhirev/assayo.git`
- ejecute `npm install`
- ejecute `npm run build:local`
- la nueva construcción HTML estará en la carpeta `/build`

<a name="link-26"></a>
### 🈯 ¿Cómo agregar o editar una traducción?
Puede agregar una nueva traducción o corregir una existente en la carpeta `ts/translations/`.
[Instrucción](https://github.com/firstcontributions/first-contributions)

<a name="link-27"></a>
### 📐 Arquitectura

<a name="link-29"></a>
#### Arquitectura general de microservicios
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](https://github.com/bakhirev/assayo-showcase) muestra una lista de informes disponibles. Cada informe consta de un título, descripción y una lista de repositorios.
2. [Crawler service](https://github.com/bakhirev/assayo-crawler) recopila registros de repositorio para el informe.
3. [Log visualization UI](https://github.com/bakhirev/assayo) **(estás aquí)** muestra el informe. Necesita un archivo de registro para funcionar.

<a name="link-30"></a>
### 📧 Retroalimentación, comentarios
- 📱 [https://t.me/bakhirev](https://t.me/bakhirev) (método prioritario de comunicación)
- 📧 [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- 🌐 [https://bakhirev.github.io/](https://bakhirev.github.io/?ref=github&lang=es)

