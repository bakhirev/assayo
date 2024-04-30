> [Documentação básica](https://github.com/bakhirev/assayo/blob/main/documents/RU.md) em russo. É uma tradução. Pode conter erros. Se você é um falante nativo, você pode ajudar a melhorar esta tradução. Obrigado!

Visualização e análise de dados do seu repositório git ([demonstração](https://assayo.online/demo/?dump=./test.txt)).

##### Funcionario de avaliar o novo local de trabalho
- ritmo de trabalho;
- número de horas extras;
- áreas de responsabilidade;
- volume de novo funcionalidade e bugs;
- estilo de trabalho dos colegas;

##### O chefe pode avaliar os funcionários
- identificar os ociosos;
- estimar o volume do código;;
- descobrir a velocidade de trabalho;
- notar anomalias no comportamento;
- ver a dinâmica do trabalho por semanas;

##### O investidor pode avaliar o produto:
- o valor do produto;
- o custo do novo funcionalismo;
- tempo de desenvolvimento;
- Forecasting the time for improvements;
- previsão de custos;

### Table of contents

### Como é rápido ver o número de commits?

No diretório raiz do seu projeto, execute o comando:
```
git shortlog -s -n -e
```
### Como combinar os autores?
É necessário criar um arquivo no diretório principal do seu projeto `.mailmap`.
Exemplo de conteúdo de arquivo:
```
Alex B <alex@mail.uk>
Alex B <alex@mail.uk> <alex@gov.tk>
Alex B <alex@mail.uk> <bakhirev@ya.kz>
Alex B <alex@mail.uk> <man64@yahoo.com>
``` 
Pode ler mais sobre o formato deste arquivo em [aqui](https://git-scm.com/docs/gitmailmap).

### Como exportar dados do git? 

#### Para visualização online
No diretório raiz do seu projeto executar:
```
git --no-pager log --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%cN>%cE>%s" > log.txt
```
#### Para ver sem internet

```
git --no-pager log --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%cN>%cE>%s" | sed -e 's/\\/\\\\/g' | sed -e 's/`/"/g' | sed -e 's/^/report.push(\`/g' | sed 's/$/\`\);/g' | sed 's/\$/_/g' > log.txt
```
Git criar um ficheiro `log.txt`.
Esse arquivo contém dados para construção de relatórios. 

A diferença entre os formatos está na existência de uma envoltória para as linhas. O formato sem internet será puxado como `js` o arquivo se você o abriu simplesmente `/build/index.html`

### Como ver o relatório?
#### Online
- Ir para [site](https://assayo.online/)
- Pressione o botão “[Demonstração](https://assayo.online/demo?lang=ru)”
- Arrastar e largar `log.txt` na janela do navegador
#### Offline
- Baixar este repositório
- Arraste o arquivo `log.txt` para a pasta `/build`
- Lançar `/build/index.html`
- Ou arraste a pasta `/build` ir para o repositório (o lugar onde se encontra `log.txt`). Você pode mudar o nome. Por exemplo, do nome `/build` no título `/report`

É importante que o arquivo `log.txt` foi criado por uma equipe para navegar sem internet.

### Como recompilar o arquivo do relatório?
- Baixar este repositório
- Executar `npm install`
- Executar `npm run build`
- A compilação mais recente estará na pasta `/build`

### Como visualizar o relatório do grupo de microserviços?
- Gerar um arquivo para cada microserviço `log.txt` (`log-1.txt`, `log-2.txt`, `log-3.txt` etc.)
- Veja “Como visualizar o relatório com a internet?”. No último passo, arraste todos os arquivos para a janela do navegador.
- Veja “Como visualizar o relatório sem a internet?”. No segundo passo, arraste todos os microserviços (`log-1.txt`, `log-2.txt`, `log-3.txt` etc.) na pasta relatório (`/build`).

### Como alterar as cores da interface para as cores da sua marca?
Você pode escrever seu próprio tema de interface. Pode mudar:
- **Cabeçalho**. Você pode especificar em um parâmetro da URL ```title```. Por exemplo: ```?title=You Company```
- **CSS стили**. Para fazer isso, você precisa preparar um arquivo CSS e especificar o seu endereço no parâmetro da URL ```theme```. Por exemplo: ```?theme=//company.com/some.css```. Você pode usar os nomes das classes como seletores. A maioria deles não muda na saída de uma nova versão.
- **Idioma**. Você pode incluir em um parâmetro de URL. ```lang```. Por exemplo: ```?lang=es```

### Como faço para assinar commits?

Siga a prática [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Por exemplo:
```
JIRA-1234 feat(profile): Added avatar for user 
```
- número da tarefa `(JIRA-1234)`
- tipo de trabalho `(feat, fix, style, refactor, test, doc etc.)`
- área de trabalho `(profile - Página)`
- descrição do trabalho `(Added avatar for user)`
### How to add checking for commit message?
####  Use file `commit-msg`
1. Create file `commit-msg` in folder `.git/hooks/`
2. Add this text in file:
```
#!/usr/bin/env bash
if ! grep -iqE "(JIRA-[0-9]{1,5})(\s)(feat|fix|docs|style|refactor|test|chore)((\([a-z0-9_-]{1,}\)){0,})(:\s)([a-z]{1,})" "$1"; then
   echo "Need commit message like: JIRA-12 fix(profile): some text. Read Semantic Commit Messages" >&2
   exit 1
fi
```
####  Use package [pre-commit](https://www.npmjs.com/package/pre-commit)
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

### Como automatizar a coleta de dados?

#### With backend
- use module [Assayo Crawler](https://github.com/bakhirev/assayo-crawler);

#### Sem backend
- criar um clone do seu repositório;
- copie a pasta `build` do repositório atual;
- abrir `build/index.html` no navegador e adicionar aos favoritos;
- adicionar um shortcut na `build/assets/ci-cd.sh` na pasta de inicialização (Windows);

A cada reinício do computador, o script atualiza a estatística com todos os dados que sejam automaticamente incorporados na branch principal.

### DevOps (CI/CD)

#### Servidor Público

Você pode disponibilizar o arquivo com os dados para construção do relatório em um URL público. Para visualizá-lo, você pode usar um site [assayo](https://assayo.online/). Especifique o endereço onde os dados estão localizados no parâmetro de URL ```dump```:
```
https://assayo.online/demo/?dump=//you_site.com/some/log.txt
```

#### Servidor Privado
- baixar [docker imagem](https://hub.docker.com/r/bakhirev/assayo);
- execute-o na rede local;
- Para visualizar os relatórios, utilize a interface web, indicando-lhe o endereço em que os dados se encontram localizados através do parâmetro URL ```dump```:
```
http://assayo_url/?dump=//you_url/some/log.txt
assayo_url - O URL do endereço do container Assay, ele está escutando na porta 80;
you_url    - O URL do seu container com os logs do git;
```

Por padrão, a imagem será iniciada no endereço ```http://127.0.0.1:80/```. Se você não conseguiu, verifique se a porta 80 está disponível no seu computador.
#### Atualizar a imagem Docker

- executar um comando ```npm run build```
- executar um comando ```docker build -t assayo .```
- verificar o resultado ```docker run --name assayo -p 80:80 -d assayo```;
- executar um comando ```docker tag assayo bakhirev/assayo:latest```;
- enviar a imagem do container para o Docker Hub ```docker push bakhirev/assayo:latest```;

### ️ About application

#### Architecture
<img src="https://raw.githubusercontent.com/bakhirev/assayo-crawler/12af4410fc93384cafb108a4429e43f9a874dbaa/schema.svg" width="70%" />

1. [Reports showcase UI](###) displays a list of available reports. Each report consists of a title, description, and a list of repositories.
2. [Crawler service](https://github.com/bakhirev/assayo-crawler) collects repository logs for the report.
3. [Log visualization UI](https://github.com/bakhirev/assayo) **(you here)** displays report. Needs a log file for work.

#### Liberações, aproximadamente, uma vez por semestre. O que vem a seguir:

Vide [documentação básica](https://github.com/bakhirev/assayo/blob/main/documents/RU.md)

#### Como adicionar ou editar uma tradução?

Você pode adicionar uma nova tradução ou corrigir uma existente na seção ```ts/translations/```.
[Instrução](https://github.com/firstcontributions/first-contributions)

#### Sugestões, sugestões, comentários
- telegramm [@bakhirev](https://t.me/bakhirev) (método de comunicação prioritário)
- [alexey-bakhirev@yandex.ru](mailto:alexey-bakhirev@yandex.ru)
- site [https://assayo.online/](https://assayo.online/?ref=github&lang=pt)

