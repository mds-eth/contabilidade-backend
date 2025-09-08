import { Logger } from "../../utils/Logger";
import { ProductFormData } from "../schemas/ProductSchema";
import BaseRepository from "./BaseRepository";

export class ProductRepository extends BaseRepository {
  async create(data: Omit<ProductFormData, "id">) {
    try {
      const result = await this.prisma.produtos.create({ data });
      Logger.info("Produto criado com sucesso", result);
      return result;
    } catch (err: any) {
      Logger.error("Falha ao criar produto", err);
      throw err;
    }
  }

  async update(
    id: string,
    data: Partial<Omit<ProductFormData, "id" | "data_criacao">>
  ) {
    try {
      const result = await this.prisma.produtos.update({ where: { id }, data });
      Logger.info("Produto atualizado com sucesso", result);
      return result;
    } catch (err: any) {
      Logger.error(`Falha ao atualizar produto ${id}`, err);
      throw err;
    }
  }

  async delete(id: string) {
    try {
      const result = await this.prisma.produtos.delete({ where: { id } });
      Logger.info(`Produto deletado com sucesso: ${id}`, result);
      return result;
    } catch (err: any) {
      Logger.error(`Falha ao deletar produto ${id}`, err);
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const result = await this.prisma.produtos.findUnique({ where: { id } });
      Logger.info(`Produto buscado com sucesso: ${id}`, result);
      return result;
    } catch (err: any) {
      Logger.error(`Falha ao buscar produto ${id}`, err);
      throw err;
    }
  }

  async list(params?: {
    q?: string;
    minPrice?: number;
    maxPrice?: number;
    skip?: number;
    take?: number;
  }) {
    try {
      const where = {
        AND: [
          params?.q ? { nome: { contains: params.q } } : {},
          params?.minPrice !== undefined
            ? { preco: { gte: params.minPrice } }
            : {},
          params?.maxPrice !== undefined
            ? { preco: { lte: params.maxPrice } }
            : {},
        ],
      };

      const result = await this.prisma.produtos.findMany({
        where,
        orderBy: { data_criacao: "desc" },
        skip: params?.skip,
        take: params?.take ?? 50,
      });

      Logger.info("Lista de produtos obtida com sucesso", {
        filtros: params,
        quantidade: result.length,
      });

      return result;
    } catch (err: any) {
      Logger.error("Falha ao listar produtos", err);
      throw err;
    }
  }
}
