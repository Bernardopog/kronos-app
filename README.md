# Kronos

## 📖 Sobre o Projeto

Kronos é um projeto Web Fullstack que serve para gerenciamento de tempo, através de ToDo List, Notas e Kanban.

## 👨‍💻 Tecnologias

### Core

- [![TurboRepo](https://img.shields.io/badge/-TurboRepo-EF4444?logo=turborepo&logoColor=white&style=for-the-badge)](https://turborepo.com/)
- [![TS](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org/)

### Frontend

- [![Next](https://img.shields.io/badge/-NextJS_15-000000?logo=nextdotjs&logoColor=white&style=for-the-badge)](https://nextjs.org/)
- [![TailwindCSS](https://img.shields.io/badge/-TailwindCSS_v3.4-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://v3.tailwindcss.com/)

### Backend

- [![Nest](https://img.shields.io/badge/-Nest-E0234E?logo=nestjs&logoColor=white&style=for-the-badge)](https://nestjs.com/)
- [![Prisma](https://img.shields.io/badge/-Prisma-002740?logo=prisma&logoColor=white&style=for-the-badge)](https://www.prisma.io/)
- [![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=for-the-badge)](https://www.postgresql.org/)

## 📦 Featues

- Sistema de Autenticação e Acesso
- Middleware (**Next**) e Guards (**Nest**)
- RESTful API
- Criação de Notas com markdown
- Responsibilidade

## 📂 Estrutura de Pastas

```txt
src/
├── app/         # Páginas do projeto (Next.js App Router)
├── classes/     # Classes utilitárias (ex: Fetcher)
├── components/  # Componentes reutilizáveis
├── context/     # Contextos globais com React Context API
├── data/        # Dados estáticos utilizados como ajuda para o usuário
├── icons/       # Ícones personalizáveis usados pelo usuário
├── mock/        # Dados falsos para testes e desenvolvimento
├── mod/         # Módulos de lógica reutilizável (ex: checkFieldSignIn)
├── shared/      # Estruturas não-visuais reutilizáveis (ex: linkList)
├── ui/          # Componentes não reutilizáveis
├── utils/       # Funções auxiliares (ex: idGenerator, já obsoleto)
```

## 🦮 Instruções para rodar localmente

Primeiro faça a instalação das dependências:

```bash
npm install
```

Após a conclusão da instalação das dependências, será necessário gerar o prisma, para isso utilize os seguinte comando:

```bash
cd apps/backend
npm run generate
cd ../..
```

Após a conclusão dessa etapa você já poderá rodar o projeto, bastando apenas inserir o seguitne código:

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

Feito por Bernardo Poggioni - [LinkedIn](https://www.linkedin.com/in/bernardo-poggioni-3746a42a5/)
