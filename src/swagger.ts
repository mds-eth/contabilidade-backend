import { PORT } from "constants/env";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";

const swaggerRouter = Router();

const openApiDoc = {
  openapi: "3.0.3",
  info: { title: "API Produtos e Clientes", version: "1.0.0" },
  servers: [{ url: `http://localhost:${PORT}/api/v1` }],
  tags: [
    { name: "Health", description: "Check de saúde da API" },
    { name: "Produtos", description: "Operações relacionadas a produtos" },
    { name: "Clientes", description: "Operações relacionadas a clientes" },
  ],
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Verifica status da API",
        responses: {
          200: {
            description: "API funcionando",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    uptime: { type: "number" },
                    timestamp: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
      },
    },

    "/produtos": {
      get: {
        tags: ["Produtos"],
        summary: "Lista todos os produtos",
        parameters: [
          {
            name: "q",
            in: "query",
            description: "Busca por nome do produto",
            required: false,
            schema: { type: "string" },
          },
          {
            name: "skip",
            in: "query",
            description: "Quantidade de registros a pular (para paginação)",
            required: false,
            schema: { type: "integer", minimum: 0 },
          },
          {
            name: "take",
            in: "query",
            description:
              "Quantidade máxima de registros a retornar (para paginação)",
            required: false,
            schema: { type: "integer", minimum: 1, maximum: 100 },
          },
        ],
        responses: { 200: { description: "Lista de produtos" } },
      },
      post: {
        tags: ["Produtos"],
        summary: "Cria um produto",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: { type: "string" },
                  preco: { type: "number" },
                  estoque: { type: "number" },
                },
                required: ["nome", "preco", "estoque"],
              },
            },
          },
          required: true,
        },
        responses: { 201: { description: "Produto criado" } },
      },
    },
    "/produtos/{id}": {
      get: {
        tags: ["Produtos"],
        summary: "Retorna um produto pelo ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Produto encontrado" },
          404: { description: "Produto não encontrado" },
        },
      },
      put: {
        tags: ["Produtos"],
        summary: "Atualiza um produto pelo ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: { type: "string" },
                  preco: { type: "number" },
                  estoque: { type: "number" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Produto atualizado" } },
      },
      delete: {
        tags: ["Produtos"],
        summary: "Remove um produto pelo ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 204: { description: "Produto removido" } },
      },
    },

    "/clientes": {
      get: {
        tags: ["Clientes"],
        summary: "Lista todos os clientes",
        parameters: [
          {
            name: "q",
            in: "query",
            description: "Filtro de busca por nome ou email",
            required: false,
            schema: { type: "string" },
          },
          {
            name: "page",
            in: "query",
            description: "Número da página (para paginação)",
            required: false,
            schema: { type: "integer", minimum: 1 },
          },
          {
            name: "pageSize",
            in: "query",
            description: "Quantidade de registros por página",
            required: false,
            schema: { type: "integer", minimum: 1 },
          },
        ],
        responses: { 200: { description: "Lista de clientes" } },
      },
      post: {
        tags: ["Clientes"],
        summary: "Cria um cliente",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: { type: "string" },
                  email: { type: "string" },
                },
                required: ["nome", "email"],
              },
            },
          },
          required: true,
        },
        responses: { 201: { description: "Cliente criado" } },
      },
    },
    "/clientes/{id}": {
      get: {
        tags: ["Clientes"],
        summary: "Retorna um cliente pelo ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Cliente encontrado" },
          404: { description: "Cliente não encontrado" },
        },
      },
      put: {
        tags: ["Clientes"],
        summary: "Atualiza um cliente pelo ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: { type: "string" },
                  email: { type: "string" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Cliente atualizado" } },
      },
      delete: {
        tags: ["Clientes"],
        summary: "Remove um cliente pelo ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 204: { description: "Cliente removido" } },
      },
    },
  },
};

swaggerRouter.use("/", swaggerUi.serve, swaggerUi.setup(openApiDoc));

export default swaggerRouter;
