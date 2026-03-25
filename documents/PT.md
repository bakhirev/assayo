
> [English](https://github.com/bakhirev/assayo) | [Español](https://github.com/bakhirev/assayo/blob/main/documents/ES.md) | [Français](https://github.com/bakhirev/assayo/blob/main/documents/FR.md) | __[Português](https://github.com/bakhirev/assayo/blob/main/documents/PT.md)__ | [Deutsch](https://github.com/bakhirev/assayo/blob/main/documents/DE.md) | [中文](https://github.com/bakhirev/assayo/blob/main/documents/ZH.md) | [日本語](https://github.com/bakhirev/assayo/blob/main/documents/JA.md) | [한국어](https://github.com/bakhirev/assayo/blob/main/documents/KO.md) | [العربية](https://github.com/bakhirev/assayo/blob/main/documents/AR.md) | [हिन्दी](https://github.com/bakhirev/assayo/blob/main/documents/HI.md) | [Русский](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

# [Assayo](https://bakhirev.github.io/?ref=github&lang=pt)
Cria um relatório HTML com análise da estatística de commits:
- o ritmo de trabalho e o número de horas extras;
- zonas de responsabilidade, número de funcionalidades e bugs;
- estilo de trabalho dos colegas;
- a taxa de rotatividade de funcionários e a composição da equipe;
- localização dos desenvolvedores;
- calendário de lançamentos e calendário de férias;
- custo das funcionalidades e do projeto como um todo;
- lugares para refatoração, arquivos apagados, etc.

**Links:** [demo](https://bakhirev.github.io/demo/?ref=github&dump=./test.txt), [online version](https://bakhirev.github.io/demo/?ref=github), [docker](https://hub.docker.com/r/bakhirev/assayo), [reddit](https://www.reddit.com/r/ITManagers/comments/1e5k291/the_visualization_and_analysis_of_git_commit/), [habr](https://habr.com/ru/articles/852782/)

**Vídeo:** [english](https://www.youtube.com/watch?v=uMbhrrd25t4), [español](https://www.youtube.com/watch?v=skmctb_2rZ0), [русский](https://www.youtube.com/watch?v=jwCp_-bhrCQ)

<a href="https://bakhirev.github.io/demo/?ref=github&dump=./test.txt" target="_blank"><img src="https://bakhirev.github.io/assets/images/index.gif" width="100%" /></a>

<a name="link-0"></a>
### Sumário
- [RELATÓRIO DE ESTATÍSTICAS DE COMMIT](#link-1)
  - [Como criar e visualizar o relatório?](#link-2)
    - [Usando servidor público](#link-3)
    - [Use a biblioteca NodeJS](#link-4)
    - [Use a biblioteca PHP](#link-5)
    - [Use a biblioteca Python](#link-6)
    - [Use a biblioteca Ruby](#link-7)
    - [Use a biblioteca Go](#link-8)
    - [Use o código fonte](#link-9)
    - [Use ações do github](#link-10)
    - [Use servidor privado](#link-11)
  - [Como concatenar autores?](#link-12)
  - [Como exportar dados do git para arquivo txt?](#link-13)
    - [Para visualização online](#link-14)
    - [Para visualização offline](#link-15)
    - [Se você usar PowerShell no Windows](#link-16)
  - [Como visualizar um relatório sobre um grupo de microserviços?](#link-17)


- [AS MELHORES PRÁTICAS NO PROJETO](#link-18)
  - [Como assinar commits?](#link-19)
  - [Como adicionar verificação para a mensagem de commit?](#link-20)
    - [Use arquivo commit-msg](#link-21)
    - [Use pacote pre-commit](#link-22)


- [SOBRE ESTE APLICATIVO](#link-23)
  - [Como personalizar a interface?](#link-24)
  - [Como reconstruir o relatório HTML a partir do código fonte?](#link-25)
  - [Como adicionar ou editar uma tradução?](#link-26)
  - [Arquitetura](#link-27)
    - [Arquitetura geral de microserviços](#link-29)
  - [Feedback, comentários](#link-30)

<a name="link-1"></a>
##  RELATÓRIO DE ESTATÍSTICAS DE COMMIT

<a name="link-2"></a>
### 📈 Como criar e visualizar o relatório?

<a name="link-3"></a>
#### Usando servidor público
- acesse o [website](https://bakhirev.github.io/)
- siga as instruções

<a name="link-4"></a>
#### Use a biblioteca NodeJS
- execute `npx assayo`
- abra `./assayo/index.html`

<a name="link-5"></a>
#### Use a biblioteca PHP
- execute `composer require bakhirev/assayo`
- execute `vendor/bin/assayo`
- abra `./assayo/index.html`

<a name="link-6"></a>
#### Use a biblioteca Python
- execute `pipx install assayo`
- execute `assayo`
- abra `./assayo/index.html`

<a name="link-7"></a>
#### Use a biblioteca Ruby
- execute `gem install assayo`
- execute `assayo`
- abra `./assayo/index.html`

<a name="link-8"></a>
#### Use a biblioteca Go
- execute `go get github.com/bakhirev/assayo`
- execute `go install github.com/bakhirev/assayo`
- execute `assayo`
- abra `./assayo/index.html`

<a name="link-9"></a>
#### Use o código fonte
- baixe este repositório
- coloque o arquivo `log.txt` no `/build`
- abra `/build/index.html`
- ou coloque a pasta `/build` no seu repositório (onde o `log.txt` está localizado). Você pode mudar o nome. Por exemplo, de `/build` para `/report`.

Neste caso, é importante que o arquivo `log.txt` seja gerado pelo comando para visualização offline.

<a name="link-10"></a>
####  Use ações do github
Adicione [script](https://github.com/bakhirev/assayo/blob/main/documents/ActionExample.yml) na pasta `.github/workflows/` ou use esta [ação](https://github.com/marketplace/actions/assayo) do marketplace. Um relatório pronto e atualizado será salvo nos artefatos.

<a name="link-11"></a>
#### Use servidor privado
- baixe a imagem [docker](https://hub.docker.com/r/bakhirev/assayo);
- execute-o na sua rede local;
- use a interface web para visualizar os relatórios, defina a URL dos dados no parâmetro URL `dump`:

```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - URL do contêiner assayo, ele escuta na porta 80;
you_url    - URL do seu contêiner com logs git;
```
Por padrão, a imagem será executada em `http://127.0.0.1:80/`. Se não funcionar, verifique se a porta 80 está livre.

<a name="link-12"></a>
### ‍🎭 Como concatenar autores?
No diretório raiz do seu projeto, você precisa criar um arquivo `.mailmap`.

Exemplo do conteúdo do arquivo:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
```
Leia mais sobre o formato deste arquivo [aqui](https://git-scm.com/docs/gitmailmap).

<a name="link-13"></a>
### 📤 Como exportar dados do git para arquivo txt?

<a name="link-14"></a>
####  Para visualização online
No diretório raiz do seu projeto execute:

<a name="link-15"></a>
####  Para visualização offline
O Git criará um arquivo `log.txt`. Este arquivo contém dados para exibir um relatório. A diferença entre o formato online e offline é a presença de uma envoltória para as strings. O formato offline será carregado como um arquivo `js` se você apenas abriu `/build/index.html`

<a name="link-16"></a>
#### Se você usar PowerShell no Windows
Por padrão, a codificação de saída pode não corresponder a UTF-8 e o arquivo de log resultante será ilegível. Antes de salvar o log, você pode mudar a codificação com o comando.
```
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```
Ou abra um arquivo salvo e mude manualmente a codificação para UTF-8.

<a name="link-17"></a>
### 🗃️ Como visualizar um relatório sobre um grupo de microserviços?
- Gere para cada arquivo de microserviço `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt`, etc.) Você pode fazer isso manualmente ou usar o módulo [Assayo Crawler](https://github.com/bakhirev/assayo-crawler) para coleta automática de logs;
- Veja "Como visualizar um relatório online?". Na última etapa, arraste todos os arquivos de uma vez para a janela do navegador.
- Veja "Como visualizar um relatório offline?". Na segunda etapa, arraste todos os arquivos de microserviço (`log-1.txt`, `log-2.txt`, `log-3.txt`, etc.) para a pasta do relatório (`/build`).

<a name="link-18"></a>
## AS MELHORES PRÁTICAS NO PROJETO

<a name="link-19"></a>
### 📝 Como assinar commits?
Siga o [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Exemplo:
```
JIRA-1234 feat(profile): Added avatar for user
```
- número da tarefa no rastreador de tarefas `(JIRA-1234)`
- tipo de trabalho `(feat, fix, style, refactor, test, doc, etc.)`
- funcionalidade `(profile - nova página no site ou nova função, use uma (duas) palavra(s) curta(s) ou uma abreviatura)`
- qual problema foi resolvido `(Added avatar for user)`

<a name="link-20"></a>
### 👮 Como adicionar verificação para a mensagem de commit?

<a name="link-21"></a>
####  Use arquivo commit-msg
1. Crie arquivo `commit-msg` na pasta `.git/hooks/`
2. Adicione este texto no arquivo:
```
#!/usr/bin/env bash
if ! grep -iqE "(JIRA-[0-9]{1,5})(s)(feat|fix|docs|style|refactor|test|chore)((([a-z0-9_-]{1,})){0,})(:s)([a-z]{1,})" "$1"; then
   echo "Need commit message like: JIRA-12 fix(profile): some text. Read Semantic Commit Messages" >&2
   exit 1
fi
```

<a name="link-22"></a>
#### Use pacote [pre-commit](https://www.npmjs.com/package/pre-commit)
1. Adicione no arquivo `package.json` propriedade `commit-msg`:
```
...
"commit-msg": {
  "regex": "(JIRA-[0-9]{1,5})(\s)(feat|fix|docs|style|refactor|test|chore)((\([a-z0-9_-]{1,}\)){0,})(:\s)([a-z]{1,})",
    "error-message": "Need commit message like: JIRA-12 fix(profile): some text Read Semantic Commit Messages"
},
...
```
2. Execute comando `npm install pre-commit`

<a name="link-23"></a>
##  SOBRE ESTE APLICATIVO

<a name="link-24"></a>
### 🎨 Como personalizar a interface?
Você pode criar sua própria temática de interface. Opções:
- **Título**. Você pode definir título de documento padrão no parâmetro de URL `title`. Exemplo: `?title=You Company`
- **Tema visual**. Para isso, você precisa preparar um arquivo CSS com novos estilos e especificar sua URL no parâmetro `theme`. Exemplo: `?theme=//company.com/some.css`. Você pode usar nomes de classe como selectores. A maioria deles não muda nas novas versões.
- **Língua**. Você pode definir língua no parâmetro de URL `lang`. Exemplo: `?lang=es`

**Exemplo:** [demo](https://bakhirev.github.io/demo/themes/)

<a name="link-25"></a>
### 🛠️ Como reconstruir o relatório HTML a partir do código fonte?
- baixe este repositório `git clone https://github.com/bakhirev/assayo.git`
- execute `npm install`
- execute `npm run build:local`
- a nova construção HTML estará na pasta `/build`

<a name="link-26"></a>
### 🈯 Como adicionar ou editar uma tradução?
Você pode adicionar uma nova tradução ou corrigir uma existente na pasta `ts/translations/`.
[Instrução](https://github.com/firstcontributions/first-contributions)

<a name="link-27"></a>
### 📐 Arquitetura

<a name="link-29"></a>
#### Arquitetura geral de microserviços
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](https://github.com/bakhirev/assayo-showcase) exibe uma lista de relatórios disponíveis. Cada relatório consiste em um título, descrição e uma lista de repositórios.
2. [Crawler service](https://github.com/bakhirev/assayo-crawler) coleta logs do repositório para o relatório.
3. [Log visualization UI](https://github.com/bakhirev/assayo) **(você está aqui)** exibe relatório. Precisa de um arquivo de log para funcionar.

<a name="link-30"></a>
### 📧 Feedback, comentários
- 📱 [https://t.me/bakhirev](https://t.me/bakhirev) (método prioritário de comunicação)
- 📧 [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- 🌐 [https://bakhirev.github.io/](https://bakhirev.github.io/?ref=github&lang=pt)

