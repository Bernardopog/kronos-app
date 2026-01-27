# Kronos
> Aplicação Fullstack para gestão de tempo e projetos (ToDo, Kanban, Notes). Construída em Monorepo (TurboRepo).

## 📖 Sobre o Projeto

Kronos é um projeto Web Fullstack Monorepo que serve para gerenciamento de tempo, através de ToDo List, Notas e Kanban.

## 👨‍💻 Tecnologias

### Core

- [![TurboRepo](https://img.shields.io/badge/-TurboRepo-EF4444?logo=turborepo&logoColor=white&style=for-the-badge)](https://turborepo.com/)
- [![TS](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org/)

### Frontend

- [![Next](https://img.shields.io/badge/-NextJS_15-000000?logo=nextdotjs&logoColor=white&style=for-the-badge)](https://nextjs.org/)
- [![TailwindCSS](https://img.shields.io/badge/-TailwindCSS_v4-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://v3.tailwindcss.com/)

### Backend

- [![Nest](https://img.shields.io/badge/-Nest-E0234E?logo=nestjs&logoColor=white&style=for-the-badge)](https://nestjs.com/)
- [![Prisma](https://img.shields.io/badge/-Prisma-002740?logo=prisma&logoColor=white&style=for-the-badge)](https://www.prisma.io/)
- [![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=for-the-badge)](https://www.postgresql.org/)
- [![Supabase](https://img.shields.io/badge/-Supabase-34b27b?logo=supabase&logoColor=white&style=for-the-badge)](https://supabase.com/)

## 💣 Challenges (Desafios)
* **Realtime com WebSockets:** Implementar o Kanban colaborativo exigiu um entendimento profundo de como manter o estado sincronizado para múltiplos usuários e como evitar de sobrecarregar o servidor através de salas.
* **Segurança e Autenticação:** Lidei com a complexidade de configurar Cookies `HttpOnly` em domínios diferentes (Vercel e Render), enfrentando problemas de CORS e `SameSite`. Isso me forçou a entender como o protocolo HTTP funciona por baixo dos panos.

## 📦 Features (Funcionalidades)

* **Sistema de Autenticação e Acesso** Proteção de rotas privadas.
* **Middleware (NextJS) e Guards (NestJS)** Proteção de requisições, respectivamente Front end e Back end.
* **RESTful API** Comunicação entre cliente e servidor para buscas, validação e gerenciamento de dados.
* **Realtime com Websocket** Para criação de requisições em tempo real para a funcionalidade de Kanban.
* **Parser Markdown** Pega texto bruto e transforma em HTML, evitando XSS.
* **Kanban Colaborativo** Com comunicação em tempo real, sistema de Drag and Drop, e sistema de Roles (permissões).
* **To Do List** Com sistema de filtragem e gestão de tarefas simples.
* **Notes** Com parser markdown para criação de notas dinâmicas e customizáveis.

## 📂 Estrutura de Pastas

### Frontend - Estrutura

```txt
src/
├── app/                  # Páginas do projeto (Next.js App Router)
│   └── (pages)/          # Agrupador de Rotas
│       ├──(private)/     # Rotas privadas que requerem autenticação
│       └──(public)/      # Rotas públicas acessíveis sem autenticação
├── classes/              # Classes utilitárias (ex: Fetcher)
├── components/           # Componentes reutilizáveis e compostos
├── ui/                   # Componentes com baixa complexidade e/ou atômicos
├── layout/               # Estruturas de layout específicas
│   ├── MainLayout/       # Layout base (Navbar, Header, etc)
│   └── PageLayout/       # Layouts estruturais de cada página
├── context/              # Contextos globais com React Context API
├── data/                 # Dados estáticos usados como conteúdo auxiliar
├── modules/              # Lógica modular e reutilizável (ex: checkFieldSignIn)
├── shared/               # Estruturas não-visuais reutilizáveis (ex: linkList)
├── mock/                 # Dados falsos para testes e desenvolvimento
└── icons/                # Ícones customizados usados no projeto
```

### Backend - Estrutura

```txt
prisma/                   # Schema do Banco de Dados e Configurações do Prisma
src/
├── auth/                 # Módulo de autenticação
├── constants/            # Constantes globais reutilizáveis (ex: JWTConstant)
├── controllers/          # Controllers HTTP (Rotas)
├── dto/                  # Data Transfer Objects para validação e tipagem
├── gateway/              # WebSocket Gateway com eventos de conexão e mensagens
├── guards/               # Proteções de rotas baseadas em JWT.
├── middleware/           # Middlewares do NestJS
├── modules/              # Módulos de cada Funcionalidade
├── prisma/               # Configuração do Prisma Client
└── services/             # Lógica de Negócio
```

## 🦮 Instruções para rodar localmente

Primeiro faça a instalação das dependências:

```bash
npm install
```

Após a conclusão da instalação das dependências, será necessário gerar o prisma, para isso utilize os seguintes comandos:

```bash
# Gere os arquivos do Prisma
cd apps/backend
npm run generate
cd ../..
```

Após a conclusão dessa etapa você já poderá rodar o projeto, bastando apenas inserir o seguinte código:

```bash
npm run dev
```

Isso irá iniciar o [Frontend](http://localhost:3000) na porta 3000 e o Backend na porta 3030, ambos no modo de desenvolvimento.

Também poderá ser utilizado o comando:

```bash
npm run preview
```

Isso irá executar o projeto em modo de produção.

## 💻 Autor

Feito por Bernardo Poggioni - [LinkedIn](https://www.linkedin.com/in/bernardo-poggioni-3746a42a5/) | [Github](https://github.com/Bernardopog)
