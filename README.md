# Basketball Backend API

API backend desenvolvida com NestJS para gerenciamento de times e jogadores de basquete.

## Tecnologias utilizadas

- NestJS
- TypeORM
- SQLite
- Swagger
- TypeScript

## Funcionalidades

### Teams
- Criar time
- Listar times
- Buscar time por ID
- Atualizar time
- Remover time

### Players
- Criar jogador
- Listar jogadores
- Buscar jogador por ID
- Atualizar jogador
- Remover jogador
- Buscar jogadores por time
- Estatística de média de idade

## Arquitetura

O projeto utiliza arquitetura em camadas:
- Controllers
- Services
- DTOs
- Entities

## Banco de Dados

O banco utilizado é SQLite.

Arquivo:
```bash
database.sqlite
```

## Documentação Swagger

Acesse:
```bash
http://localhost:3000/api
```

## Como executar o projeto

### Instalar dependências

```bash
npm install
```

### Rodar aplicação

```bash
npm run start:dev
```

## Autor

Matheus Gante
