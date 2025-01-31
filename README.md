Ecommerce-pp1

Ecommerce-pp1 é um projeto de e-commerce completo desenvolvido com Next.js para o frontend e NestJS para o backend. O sistema inclui funcionalidades como autenticação, gerenciamento de produtos, carrinho de compras, pedidos e checkout. O banco de dados utilizado é MySQL.

Tecnologias Utilizadas

Frontend

Next.js (React Framework)

Tailwind CSS (Estilização)

Axios (Requisições HTTP)

React Hook Form (Gerenciamento de formulários)

Zustand (Gerenciamento de estado)

Backend

NestJS (Framework Node.js)

MySQL (Banco de dados relacional)

TypeORM (ORM para MySQL)

JWT (Autenticação e Autorizacão)

Configuração do Projeto

Requisitos

Node.js 18+

MySQL

Docker (opcional)

Clonando o Repositório

  git clone https://github.com/seu-usuario/ecommerce-pp1.git
  cd ecommerce-pp1

Configuração do Frontend

Instalando Dependências

  cd frontend
  npm install

Executando o Frontend

  npm run dev

Configuração do Backend

Instalando Dependências

  cd backend
  npm install

Configurando o Banco de Dados

Edite o arquivo .env na pasta backend:

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=88795318Da.*
DATABASE_NAME=ecommerce-pp1
JWT_SECRET=seu-segredo

Executando o Backend

  npm run start:dev

API de Produtos

O projeto consome a API Fake Store API para popular a loja com produtos fictícios.

Funcionalidades

Cadastro e login de usuários

Listagem de produtos

Adição de produtos ao carrinho

Checkout e criação de pedidos

Painel do usuário para gerenciar pedidos

Contribuição

Sinta-se à vontade para contribuir enviando pull requests ou relatando problemas.

Licença

Este projeto está sob a licença MIT.
