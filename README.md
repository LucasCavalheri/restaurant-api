# 🍽️ API de Restaurante - Sistema de Pedidos

Um sistema de gerenciamento de pedidos para restaurantes, desenvolvido com Node.js, Express e SQLite. Esta API permite gerenciar mesas, produtos e pedidos em um ambiente de restaurante.

## 🚀 Tecnologias

- **Node.js** - Ambiente de execução JavaScript
- **TypeScript** - Adiciona tipagem estática ao JavaScript
- **Express** - Framework web para Node.js
- **Knex.js** - Query Builder para SQL
- **SQLite** - Banco de dados relacional
- **Zod** - Validação de dados

## 🏗️ Estrutura do Projeto

```
src/
├── controllers/     # Lógica dos controladores
├── database/        # Configurações e migrações do banco de dados
├── middlewares/     # Middlewares da aplicação
├── routes/         # Definição das rotas da API
├── utils/          # Utilitários e helpers
└── server.ts       # Ponto de entrada da aplicação
```

## 📋 Modelo de Dados

### Tabelas

1. **products**
   - `id` - Identificador único
   - `name` - Nome do produto
   - `price` - Preço do produto
   - `created_at` - Data de criação
   - `updated_at` - Data de atualização

2. **tables**
   - `id` - Identificador único
   - `number` - Número da mesa
   - `created_at` - Data de criação
   - `updated_at` - Data de atualização

3. **tables_sessions**
   - `id` - Identificador único
   - `table_id` - ID da mesa
   - `status` - Status da sessão (open/closed)
   - `created_at` - Data de abertura
   - `updated_at` - Data de atualização

4. **orders**
   - `id` - Identificador único
   - `table_session_id` - ID da sessão da mesa
   - `product_id` - ID do produto
   - `quantity` - Quantidade do item
   - `status` - Status do pedido (pending/completed/canceled)
   - `created_at` - Data de criação
   - `updated_at` - Data de atualização

## 🛣️ Rotas da API

### 📦 Produtos
- `GET /products` - Lista todos os produtos
- `GET /products/:id` - Obtém um produto específico
- `POST /products` - Cria um novo produto
- `PUT /products/:id` - Atualiza um produto existente
- `DELETE /products/:id` - Remove um produto

### 🪑 Mesas
- `GET /tables` - Lista todas as mesas
- `POST /tables` - Cria uma nova mesa

### 🏷️ Sessões de Mesa
- `POST /tables/:tableId/sessions` - Abre uma nova sessão para uma mesa
- `DELETE /tables/:tableId/sessions` - Encerra a sessão de uma mesa
- `GET /tables/sessions/:sessionId` - Obtém os detalhes de uma sessão

### 🍽️ Pedidos
- `GET /orders` - Lista todos os pedidos
- `GET /orders/:id` - Obtém um pedido específico
- `POST /orders` - Cria um novo pedido
- `PUT /orders/:id` - Atualiza um pedido existente
- `DELETE /orders/:id` - Remove um pedido

## 🚀 Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/LucasCavalheri/restaurant-api.git
   cd restaurant-api
   ```

2. Instale as dependências:
   ```bash
   yarn install
   # ou
   npm install
   ```

3. Execute as migrações do banco de dados:
   ```bash
   yarn knex migrate:latest
   # ou
   npx knex migrate:latest
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   yarn dev
   # ou
   npm run dev
   ```

5. A API estará disponível em `http://localhost:3333`

## 🔄 Fluxo de Uso

1. **Cadastrar Produtos** - Adicione os itens do cardápio
2. **Cadastrar Mesas** - Crie as mesas do restaurante
3. **Abrir Sessão** - Quando clientes ocuparem uma mesa
4. **Fazer Pedidos** - Registrar os itens consumidos
5. **Fechar Sessão** - Quando os clientes forem pagar a conta

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ por [Lucas Cavalheri](https://github.com/LucasCavalheri)
