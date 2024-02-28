> [Documentación básica](https://github.com/bakhirev/assayo/blob/main/documents/RU.md) en ruso. Es una traducción. Puede contener errores. Si usted es un hablante nativo, puede ayudar a mejorar esta traducción. ¡Gracias!
 
> - [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)
> - [English](https://github.com/bakhirev/assayo)
> - [中文](https://github.com/bakhirev/assayo/blob/main/documents/ZH.md)
> - [Español](https://github.com/bakhirev/assayo/blob/main/documents/ES.md)
> - [Français](https://github.com/bakhirev/assayo/blob/main/documents/FR.md)
> - [Português](https://github.com/bakhirev/assayo/blob/main/documents/PT.md)
> - [Deutsch](https://github.com/bakhirev/assayo/blob/main/documents/DE.md)
> - [日本語](https://github.com/bakhirev/assayo/blob/main/documents/JA.md)

# [Assayo](https://assayo.online/?ref=github&lang=ru)

Visualización y análisis de los datos de su repositorio git. ([демо](https://assayo.online/demo/?dump=./test.txt)).

##### El empleado puede evaluar el nuevo lugar de trabajo
- El ritmo de trabajo;
- El número de horas extras;
- Las áreas de responsabilidad;
- El volumen de características y errores;
- El estilo de trabajo de los colegas;

##### El jefe puede evaluar a los empleados
- Identificar a los ociosos;
- Calcular el volumen de código;
- Conocer la velocidad de trabajo;
- Se han notado anomalías de comportamiento;
- Ver el ritmo de trabajo por semanas;

##### El inversor puede evaluar el producto
- El costo del producto;
- El coste de las peculiaridades;
- El tiempo de desarrollo;
- La predicción del tiempo de mejoras;
- La predicción del costo;

### Cómo puedo rápidamente ver el número de commits?

En la carpeta raíz de su proyecto, ejecute:
```
git shortlog -s -n -e
```
### Cómo combinar a los autores?
En la carpeta raíz de su proyecto debe crear un archivo `.mailmap`.
Un ejemplo del contenido del archivo:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
``` 
Más información sobre el formato de este archivo se puede leer en [aquí](https://git-scm.com/docs/gitmailmap).

### Cómo descargar los datos desde git?

#### Para la visualización en línea
En el directorio raíz de su proyecto ejecutar:
```
git --no-pager log --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%cN>%cE>%s" > log.txt
```
#### Para ver sin conexión

```
git --no-pager log --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%cN>%cE>%s" | sed -e 's/\\/\\\\/g' | sed -e 's/`/"/g' | sed -e 's/^/report.push(\`/g' | sed 's/$/\`\);/g' | sed 's/\$/_/g' > log.txt
```
Git creará un archivo `log.txt`.
contiene los datos para construir el informe. 

La diferencia entre los formatos en línea y fuera de línea está en la existencia de una envoltura para las cadenas. El formato fuera de línea se cargará como un archivo`js` si usted simplemente lo abrió. `/build/index.html`

### ¿Cómo ver el informe en línea? 

- Ir a [sitio web](https://assayo.online/)
- Pulse el botón [Demo](https://assayo.online/demo)»
- Arrastrar y soltar archivo `log.txt` en la ventana del navegador

### ¿Cómo ver el informe sin conexión?
- Descargar este repositorio
- Arrastrar y soltar archivo `log.txt` en la carpeta `/build`
- Lanzar `/build/index.html`
- O arrastrar una carpeta `/build` a su repositorio (donde se encuentra ' log.txt`). Puede cambiar el nombre. Por ejemplo `/build` contra `/report`

En este caso, es importante que el archivo ' log.txt ' fue generado por el equipo para ver sin conexión.

### Como recompilar el build de un informe?
- Descargar este repositorio
- Ejecutar `npm install`
- Ejecutar `npm run build`
- La nueva compilación estará en el directorio `/build`

### Como mirar el reporte de un grupo de microservicios?
- Generar para cada microservicio el archivo `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt` etc.)
- Ver “Cómo ver el informe en línea?”. En el último paso, arrastrar todos los archivos al navegador.
- Ver “Cómo ver informe fuera de línea?”. En el segundo paso, arrastrar los archivos de todos los microservicios al navegador (`log-1.txt`, `log-2.txt`, `log-3.txt` etc.) la carpeta informe (`/build`).

### ¿Cómo puedo personalizar la interfaz de usuario?
Puedes crear tu propio tema para la interfaz. Puedes cambiar:
- **El título**. Puedes especificarlo en el parámetro de la URL ```title```. Por ejemplo: ```?title=You Company```
- **El tema visual**. Para esto, debes preparar un archivo CSS con los nuevos estilos y especificar su dirección en el parámetro de URL ```theme```. Por ejemplo: ```?theme=//company.com/some.css```. Puedes usar los nombres de clases como selectores. La mayoría de ellos no cambia con el lanzamiento de nuevas versiones.
- **La lengua**. Puedes especificarla en el parámetro de la URL ```lang```. Por ejemplo: ```?lang=es```

### ¿Cómo firmar los commits?

Siga la práctica [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Por ejemplo:
```
JIRA-1234 feat(profile): Added avatar for user 
```
- El número de la tarea en el gestor de tareas es `(JIRA-1234)`
- tipo de trabajo `(feat, fix, style, refactor, test, doc etc.)`
- ficha `(profile - La sección del sitio, la página o la nueva funcionalidad, en una palabra)`
- ¿qué problema resolvieron? `(Added avatar for user)`

### ¿Cómo automatizar el recolección de datos?

#### Sin backend
- clone del repositorio que desea;
- copiar a la carpeta raíz `build`;
- abridlo `build/index.html` añadir a favoritos;
- agregue un icono de `build/assets/ci-cd.sh` a su carpeta de inicio automático
 (Windows);

Cada vez que reinicie su computadora, el script actualizará la estadística de todos los datos que se hayan incorporado automáticamente a la rama principal.

### DevOps (CI/CD)

#### Servidor público

Puede publicar el archivo con los datos para generar el informe en una URL pública. Para visualizarlo, puede usar la interfaz web del sitio [assayo](https://assayo.online/). Simplemente indique la dirección donde están los datos en el parámetro URL ```dump```:
```
https://assayo.online/demo/?dump=//you_site.com/some/log.txt
```

#### Servidor privado
- descargar [docker образ](https://hub.docker.com/r/bakhirev/assayo);
- recogerlo en la red local;
- Para ver los informes, use la interfaz web indicándole la dirección de los datos en el parámetro URL ```dump```:
```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - URL dirección del contenedor assayo, Él está escuchando el puerto 80;
you_url    - URL la dirección de su contenedor con registros git;
```

Por defecto, la imagen se ejecutará en la siguiente dirección ```http://127.0.0.1:80/```. Si no funciona, compruebe si tiene el puerto 80 disponible
#### Actualización de la imagen Docker

- eliminar métricas, alertas, compilaciones antiguas;
- construir ```npm run build```
- montar la imagen ```docker build -t assayo .```
- comprobar visualmente la imagen ```docker run --name assayo -p 80:80 -d assayo```;
- poner la etiqueta ```docker tag IMAGE_ID bakhirev/assayo:latest```;
- poner la imagen en Docker Hub

### Los lanzamientos son aproximadamente una vez cada seis meses. Lo siguiente será:

- más consejos y logros;
- resultados del año / mes, impresión de informes;
- localización e internacionalización;
- análisis de archivos;
- diferentes roles para estadísticas (ocultación de finanzas);
- desarrollo de la parte de atrás, integraciones con otros sistemas;

### ¿Cómo añadir o editar una traducción?

Puede agregar una nueva traducción o corregir la actual en la sección ```ts/translations/```.
[Instrucciones](https://docs.github.com/ru/get-started/exploring-projects-on-github/contributing-to-a-project)

### Deseos, sugerencias, comentarios
- telegramm [@bakhirev](https://t.me/bakhirev) (La forma preferencial de contacto)
- [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- sitio web [https://assayo.online/](https://assayo.online/)

