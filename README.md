# Core API Node JS

## Content

Sobre o projeto, se trata de uma API REST feita utilizando apenas os core module (módulos nativos do NodeJS).
A algum tempo atrás eu tinha desenvolvido uma api parecida com essa, porém essa tem conteúdos mais profundos, Utilização das features mais modernas do Node e algumas funcionalidades que desenvolvi especialmente para esse projeto.

*OBS.* Nesse projeto estou usando NodeJS na versão v16.16.0. 

### ***Core modules***
- **HTTP2** (Servidor http);
- **CRYPTO** (Estou usando para criar UUID);
- **OS** (Permite ler algumas informações do hardware);
- **FS/PROMISES** (Sistema de arquivos de forma assíncrona);
- **CLUSTER** (Cria processos filhos para masterizar desempenho);
- **PATH** (Uso para determinar caminhos de arquivo de forma mais segura);

## How it Works ?

```
git clone https://github.com/JoaoFelixx/server-core-api-better.git
```
```
yarn install | npm install
```
```
yarn dev (dev) yarn start (prod) 
npm dev (dev) npm start (prod)
```

## Routes 

| HTTP   | ROUTE      | BODY                                              | HEADER | DESCRIÇÃO                          |
| ------ | ---------- | ------------------------------------------------- | ------ | ---------------------------------- |
| GET    | /users     |                                                   |        | Rota retorna usuários cadastrados. |
| GET    | /leagues   |                                                   |        | Retorna ligas de futebol           |
| POST   | /users     | JSON {name: string, preferenceColorTheme: string} |        | Rota para criar usuários.          |
| PUT    | /users/:id | JSON {name: string, preferenceColorTheme: string} |        | Rota atualiza usuários.            |
| DELETE | /users/:id |                                                   |        | Rota deleta usuários por ID.       |

## Features Added

### ***MyRedis***
> Essa "ideia" seria uma **simulação** de um exemplo real utilizando `Redis` (Doc Redis)[https://redis.io/)]
> Essa ideia eu tive por conta de um estudo sobre o próprio que estou fazendo (Em breve faço 
> uma aplicação mostrando como utilizar).

### ***JDB (JSON Database or João Database 😂😂😂)***
> Oque seria ? É uma imitação do `mongoose` (Doc Mongoose)[https://mongoosejs.com/] (eu queria criar essa ideia a algum tempo já kkkkkk) 
> ***Como usar ?***
> Para começar você cria um json na pasta `database` EX. Soccer.json, cria um 'model' na pasta JDB só para esse arquivo, cria um caminho do arquivo até a pasta cria um referencia EX:

```js
const Soccer = {
  league: {
    type: 'string'
  },
  division: {
    type: 'number',
    default: [1,2,3]
  }
}
```
>Adiciona ao models: 
```js
const models = {
  user: User,
  soccer: Soccer,
}
```
> E pronto. Já pode fazer requisições de consulta, criação, edição e remoção de dados.